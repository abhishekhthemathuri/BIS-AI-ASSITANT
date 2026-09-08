import os
import math
from pathlib import Path
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

def haversine_km(lat1, lon1, lat2, lon2):
    """Calculates great-circle distance in kilometers between two GPS points."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 1)

def get_db_connection():
    try:
        return psycopg2.connect(
            host=os.getenv("DB_HOST", "127.0.0.1"),
            port=os.getenv("DB_PORT", "5432"),
            dbname=os.getenv("DB_NAME", "bis_database"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "admin123"),
            cursor_factory=RealDictCursor
        )
    except Exception as e:
        print(f"PostgreSQL connection error: {e}")
        return None

def query_bis_postgres(user_query: str, user_location: dict = None) -> str:
    """Queries PostgreSQL with spatial distance calculation and standards knowledge."""
    conn = get_db_connection()
    if not conn:
        return ""

    try:
        cur = conn.cursor()
        query_lower = user_query.lower()
        search_term = f"%{user_query}%"
        output_blocks = []

        # 1. LAB SEARCH WITH USER GPS / CITY / STATE
        is_lab_query = any(w in query_lower for w in ["lab", "laboratory", "testing", "near me", "where to test", "center", "centre", "address", "test my"])
        
        user_lat = user_location.get("latitude") if user_location else None
        user_lon = user_location.get("longitude") if user_location else None
        user_city = user_location.get("city", "").strip() if user_location else ""
        user_state = user_location.get("state", "").strip() if user_location else ""

        if is_lab_query or user_lat or user_city:
            cur.execute("""
                SELECT l.lab_id, l.lab_name, l.lab_type, l.address, l.city, l.state, 
                       l.contact_phone, l.contact_email, l.disciplines_covered, l.latitude, l.longitude,
                       s.product_category, s.specific_tests
                FROM testing_laboratories l
                LEFT JOIN lab_testing_scope s ON l.lab_id = s.lab_id;
            """)
            all_labs = cur.fetchall()

            # Filter or sort by product relevance first
            product_filtered = []
            for lab in all_labs:
                disc = (lab.get("disciplines_covered") or "").lower()
                prod = (lab.get("product_category") or "").lower()
                
                # Check for product match
                if any(w in query_lower for w in ["water", "10500", "14543"]):
                    if "water" in prod or "water" in disc or "chemical" in disc:
                        product_filtered.append(lab)
                elif any(w in query_lower for w in ["helmet", "4151"]):
                    if "helmet" in prod or "mechanical" in disc:
                        product_filtered.append(lab)
                elif any(w in query_lower for w in ["gold", "hallmark", "1417"]):
                    if "gold" in prod or "assaying" in disc:
                        product_filtered.append(lab)
                elif any(w in query_lower for w in ["battery", "cells", "16046"]):
                    if "batter" in prod or "electrical" in disc:
                        product_filtered.append(lab)
                elif any(w in query_lower for w in ["steel", "tmt", "1786"]):
                    if "steel" in prod or "mechanical" in disc:
                        product_filtered.append(lab)
                else:
                    product_filtered.append(lab)

            candidate_labs = product_filtered if product_filtered else all_labs

            # Compute distance if user GPS coordinates are provided
            ranked_labs = []
            seen_ids = set()
            for lab in candidate_labs:
                if lab["lab_id"] in seen_ids:
                    continue
                seen_ids.add(lab["lab_id"])

                distance = None
                if user_lat and user_lon and lab["latitude"] and lab["longitude"]:
                    distance = haversine_km(user_lat, user_lon, lab["latitude"], lab["longitude"])
                elif user_city and user_city.lower() in lab["city"].lower():
                    distance = 5.0 # nearby city match bonus
                elif user_state and user_state.lower() in lab["state"].lower():
                    distance = 50.0

                ranked_labs.append((distance if distance is not None else 9999.0, lab))

            ranked_labs.sort(key=lambda x: x[0])
            top_labs = ranked_labs[:4]

            if top_labs:
                header = "### OFFICIAL BIS TESTING LABORATORIES (NEAREST TO USER LOCATION):"
                if user_city or user_state:
                    header += f" [User Detected Location: {user_city}, {user_state}]"

                lab_lines = [header]
                for dist, lab in top_labs:
                    dist_str = f" **({dist} km away)**" if dist < 9000 else ""
                    category_info = f" | Scope: {lab.get('product_category')}" if lab.get('product_category') else ""
                    lab_lines.append(
                        f"• **{lab['lab_name']}**{dist_str} ({lab['lab_type']}){category_info}\n"
                        f"  - **Address**: {lab['address']}, {lab['city']}, {lab['state']}\n"
                        f"  - **Phone**: {lab['contact_phone']} | **Email**: {lab['contact_email']}\n"
                        f"  - **Disciplines Tested**: {lab['disciplines_covered']}\n"
                    )
                output_blocks.append("\n".join(lab_lines))

        # 2. STANDARDS SEARCH
        cur.execute("""
            SELECT s.standard_id, s.title, s.dept_code, q.qco_title
            FROM standards_catalog s
            LEFT JOIN quality_control_orders q ON s.standard_id = q.standard_id
            WHERE s.title ILIKE %s OR s.standard_id ILIKE %s
            LIMIT 3;
        """, (search_term, search_term))
        standards = cur.fetchall()

        if standards:
            std_lines = ["### OFFICIAL STANDARDS CATALOG:"]
            for s in standards:
                qco = f" [Mandatory QCO: {s['qco_title']}]" if s['qco_title'] else ""
                std_lines.append(f"- **{s['standard_id']}**: {s['title']}{qco}")
            output_blocks.append("\n".join(std_lines))

        # 3. CLAUSES & LIMITS SEARCH
        cur.execute("""
            SELECT standard_id, clause_number, parameter_name, acceptable_limit, permissible_limit_relaxation
            FROM standard_test_clauses
            WHERE parameter_name ILIKE %s OR standard_id ILIKE %s
            LIMIT 4;
        """, (search_term, search_term))
        clauses = cur.fetchall()

        if clauses:
            clause_lines = ["### OFFICIAL CLAUSE LIMITS:"]
            for c in clauses:
                clause_lines.append(f"- **{c['standard_id']} {c['clause_number']}** [{c['parameter_name']}]: Acceptable: {c['acceptable_limit']} | Permissible: {c['permissible_limit_relaxation']}")
            output_blocks.append("\n".join(clause_lines))

        cur.close()
        conn.close()

        return "\n\n".join(output_blocks)
    except Exception as e:
        print(f"Error querying PostgreSQL: {e}")
        return ""
