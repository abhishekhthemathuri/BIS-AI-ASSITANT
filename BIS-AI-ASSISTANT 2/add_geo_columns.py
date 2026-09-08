import os
from pathlib import Path
import psycopg2
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

def add_geo_coordinates():
    print("Adding Geolocation columns & coordinates to testing_laboratories in PostgreSQL...")
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "bis_database"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "admin123")
    )
    conn.autocommit = True
    cur = conn.cursor()

    cur.execute("""
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
    """)

    # Coordinates for real BIS and Referral Labs across India
    coords = [
        ('BIS-CL-01', 28.6757, 77.3489),    # Ghaziabad / Delhi NCR
        ('BIS-NROL-01', 30.7333, 76.7794),  # Chandigarh
        ('NABL-DEL-01', 28.6942, 77.2155),  # Delhi (Maurice Nagar)
        ('NABL-DEL-02', 28.6692, 77.4538),  # Ghaziabad
        ('BIS-BO-JAI', 26.9124, 75.7873),   # Jaipur
        ('BIS-WROL-01', 19.1197, 72.8719),  # Mumbai (Andheri East)
        ('NABL-MUM-01', 19.1136, 72.8697),  # Mumbai (Marol)
        ('NABL-PUN-01', 18.5204, 73.8567),  # Pune (ARAI)
        ('BIS-BO-AHM', 23.0225, 72.5714),   # Ahmedabad
        ('BIS-SROL-01', 12.9863, 80.2432),  # Chennai (Taramani)
        ('BIS-BLR-01', 13.0285, 77.5186),   # Bengaluru (Peenya)
        ('NABL-HYD-01', 17.4399, 78.5828),  # Hyderabad (Cherlapally)
        ('BIS-KOCHI-01', 9.9816, 76.2999),  # Kochi
        ('BIS-EROL-01', 22.5726, 88.3639),  # Kolkata (VIP Road)
        ('NABL-KOL-01', 22.5310, 88.3300),  # Kolkata (Alipore)
        ('BIS-BO-PAT', 25.5941, 85.1376),   # Patna
        ('BIS-BO-GUW', 26.1445, 91.7362)    # Guwahati
    ]

    for lab_id, lat, lon in coords:
        cur.execute("UPDATE testing_laboratories SET latitude = %s, longitude = %s WHERE lab_id = %s;", (lat, lon, lab_id))

    cur.close()
    conn.close()
    print("Geolocation coordinates updated for all testing laboratories successfully!")

if __name__ == "__main__":
    add_geo_coordinates()
