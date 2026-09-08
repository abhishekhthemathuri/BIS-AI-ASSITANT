import os
from pathlib import Path
import psycopg2
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "bis_database")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "admin123")

def upgrade_labs():
    print("Upgrading BIS Laboratory Network in PostgreSQL...")
    conn = psycopg2.connect(
        host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME
    )
    conn.autocommit = True
    cur = conn.cursor()

    # 1. Ensure all columns exist in testing_laboratories
    cur.execute("""
        CREATE TABLE IF NOT EXISTS testing_laboratories (
            lab_id VARCHAR(50) PRIMARY KEY,
            lab_name VARCHAR(250) NOT NULL,
            lab_type VARCHAR(50),
            address TEXT NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            contact_email VARCHAR(150)
        );

        -- Add missing columns if they were not present in previous schema
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(100);
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS operating_hours VARCHAR(100) DEFAULT '09:00 AM - 05:30 PM (Mon-Fri)';
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS consumer_sample_accepted BOOLEAN DEFAULT TRUE;
        ALTER TABLE testing_laboratories ADD COLUMN IF NOT EXISTS disciplines_covered TEXT;

        CREATE TABLE IF NOT EXISTS lab_testing_scope (
            scope_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            lab_id VARCHAR(50) REFERENCES testing_laboratories(lab_id) ON DELETE CASCADE,
            standard_id VARCHAR(50),
            product_category VARCHAR(150),
            specific_tests TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_labs_city ON testing_laboratories(city);
        CREATE INDEX IF NOT EXISTS idx_labs_state ON testing_laboratories(state);
    """)

    # 2. Insert Real Pan-India BIS Laboratories & Recognized Centers
    labs_sql = """
    INSERT INTO testing_laboratories 
    (lab_id, lab_name, lab_type, address, city, state, pincode, contact_phone, contact_email, disciplines_covered, consumer_sample_accepted)
    VALUES
    -- Delhi NCR & North India
    ('BIS-CL-01', 'BIS Central Laboratory (National HQ Lab)', 'BIS_CENTRAL', 'Plot 20/9, Site IV, Sahibabad Industrial Area', 'Ghaziabad', 'Uttar Pradesh', '201010', '0120-2770030 / 0120-2770032', 'cl@bis.gov.in', 'Chemical, Microbiological, Mechanical, Electrical, Electronics, Gold Assaying', TRUE),
    ('BIS-NROL-01', 'BIS Northern Regional Office Laboratory (NROL)', 'BIS_REGIONAL', 'Plot No. 4-A, Sector 27-B, Madhya Marg', 'Chandigarh', 'Chandigarh', '160019', '0172-2650290', 'nrol@bis.gov.in', 'Food, Water, Cement, Steel, Electrical Cables, Mechanical testing', TRUE),
    ('NABL-DEL-01', 'Shriram Institute for Industrial Research', 'NABL_RECOGNIZED_PRIVATE', '19, University Road, Block A, Maurice Nagar', 'Delhi', 'Delhi', '110007', '011-27667267 / 011-27667623', 'sridlhi@shriraminstitute.org', 'Packaged Drinking Water (IS 14543), Drinking Water (IS 10500), Food, Plastics, Toys (IS 9873)', TRUE),
    ('NABL-DEL-02', 'National Test House (Northern Region)', 'GOVT_REFERRAL', 'Kamla Nehru Nagar, Hapur Road', 'Ghaziabad', 'Uttar Pradesh', '201002', '0120-2789901', 'nthnr-ca@nic.in', 'TMT Steel (IS 1786), Cement, Pressure Cookers, Helmets, Chemical Testing', TRUE),
    ('BIS-BO-JAI', 'BIS Branch Office Testing Cell Jaipur', 'BIS_BRANCH', 'Prithviraj Road, C-Scheme', 'Jaipur', 'Rajasthan', '302005', '0141-2223284', 'jpbo@bis.gov.in', 'Gold Hallmarking Verification, Water, Transformers', TRUE),

    -- Mumbai & Western India
    ('BIS-WROL-01', 'BIS Western Regional Office Laboratory (WROL)', 'BIS_REGIONAL', 'Plot No. E-9, Road No. 8, MIDC, Andheri (East)', 'Mumbai', 'Maharashtra', '400093', '022-28329295 / 022-28327892', 'wrol@bis.gov.in', 'Electrical appliances, IT Hardware (IS 13252), Water, Chemical, Metals, Helmets (IS 4151)', TRUE),
    ('NABL-MUM-01', 'National Test House (Western Region)', 'GOVT_REFERRAL', 'Plot F-10, MIDC, Marol, Andheri East', 'Mumbai', 'Maharashtra', '400093', '022-28325771', 'nthwr-mum@nic.in', 'Helmets (IS 4151), Steel (IS 1786), Electronics Safety, Civil Materials', TRUE),
    ('NABL-PUN-01', 'Automotive Research Association of India (ARAI)', 'NABL_RECOGNIZED_PRIVATE', 'Survey No. 102, Vetal Hill, Off Paud Road, Kothrud', 'Pune', 'Maharashtra', '411038', '020-30231111 / 020-67621111', 'director@araiindia.com', 'Two-Wheeler Helmets (IS 4151), Automotive Components, EV Lithium Batteries (IS 16046)', TRUE),
    ('BIS-BO-AHM', 'BIS Branch Office Laboratory Ahmedabad', 'BIS_BRANCH', 'Pushpak, 3rd Floor, Nurmohamed Shaikh Marg, Khanpur', 'Ahmedabad', 'Gujarat', '380001', '079-25601299', 'ahbo@bis.gov.in', 'Pumps, Motors, Chemicals, Packaged Drinking Water', TRUE),

    -- Bengaluru, Chennai & South India
    ('BIS-SROL-01', 'BIS Southern Regional Office Laboratory (SROL)', 'BIS_REGIONAL', 'CIT Campus, IV Cross Road, Taramani', 'Chennai', 'Tamil Nadu', '600113', '044-22541442 / 044-22542519', 'srol@bis.gov.in', 'Electronics Safety, IT Products, Lithium Batteries, Water, Steel, Leather', TRUE),
    ('BIS-BLR-01', 'BIS Branch Testing & Coordination Center Bengaluru', 'BIS_BRANCH', 'Peenya Industrial Area, 1st Stage, Tumkur Road', 'Bengaluru', 'Karnataka', '560058', '080-28394955', 'bnbo@bis.gov.in', 'IT Hardware, Solar Inverters, Domestic Appliances, Gold Verification', TRUE),
    ('NABL-HYD-01', 'National Test House (Southern Region Hyderabad)', 'GOVT_REFERRAL', 'F-97/A, IDA Phase-II, Cherlapally', 'Hyderabad', 'Telangana', '500051', '040-27260517', 'nth-hyd@nic.in', 'Chemical, Water, Soil, Steel, PVC Pipes, Electrical Cables', TRUE),
    ('BIS-KOCHI-01', 'BIS Branch Office Testing Cell Kochi', 'BIS_BRANCH', '2nd Floor, Puttu Road, Kaloor', 'Kochi', 'Kerala', '682017', '0484-2335221', 'kcbo@bis.gov.in', 'Rubber, Coir, Packaged Water, Gold Hallmarking', TRUE),

    -- Kolkata & Eastern / North-Eastern India
    ('BIS-EROL-01', 'BIS Eastern Regional Office Laboratory (EROL)', 'BIS_REGIONAL', '1/14 C.I.T. Scheme VII M, VIP Road', 'Kolkata', 'West Bengal', '700054', '033-23553243 / 033-23555837', 'erol@bis.gov.in', 'TMT Steel Bars (IS 1786), Cast Iron, Cement, Chemical, Microbiological Water Testing', TRUE),
    ('NABL-KOL-01', 'National Test House (Eastern Region HQ)', 'GOVT_REFERRAL', '11/1 Judges Court Road, Alipore', 'Kolkata', 'West Bengal', '700027', '033-24791580', 'nthhq-wb@nic.in', 'Complete physical, chemical, mechanical, metallurgical & NDT testing for BIS ISI mark', TRUE),
    ('BIS-BO-PAT', 'BIS Branch Office Patna', 'BIS_BRANCH', 'B-Block, 3rd Floor, Maurya Lok Complex, Dak Bungalow Road', 'Patna', 'Bihar', '800001', '0612-2223971', 'ptbo@bis.gov.in', 'Pumps, Water Testing, Construction Materials, Gold Verification', TRUE),
    ('BIS-BO-GUW', 'BIS Branch Office Guwahati', 'BIS_BRANCH', '5th Floor, CIT Complex, G.S. Road, Christian Basti', 'Guwahati', 'Assam', '781005', '0361-2340019', 'ghbo@bis.gov.in', 'Galvanized Sheets, Tea processing equipment, Drinking Water', TRUE)
    ON CONFLICT (lab_id) DO UPDATE SET
        lab_name = EXCLUDED.lab_name,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        pincode = EXCLUDED.pincode,
        contact_phone = EXCLUDED.contact_phone,
        contact_email = EXCLUDED.contact_email,
        disciplines_covered = EXCLUDED.disciplines_covered;
    """
    cur.execute(labs_sql)

    # 3. Clear existing scopes and re-insert fresh scopes
    cur.execute("DELETE FROM lab_testing_scope;")

    scopes_sql = """
    INSERT INTO lab_testing_scope (lab_id, standard_id, product_category, specific_tests) VALUES
    -- Water Testing (IS 10500 / IS 14543)
    ('BIS-CL-01', 'IS 10500:2012', 'Drinking Water', 'Full physical, chemical, pesticide residues, bacteriological and toxic heavy metals'),
    ('BIS-WROL-01', 'IS 10500:2012', 'Drinking Water', 'Complete potability test, TDS, Hardness, E. coli, Heavy Metals'),
    ('BIS-SROL-01', 'IS 10500:2012', 'Drinking Water', 'Full chemical & microbiological tests'),
    ('BIS-EROL-01', 'IS 10500:2012', 'Drinking Water', 'TDS, Fluoride, Arsenic, Iron, Coliform & toxic elements'),
    ('NABL-DEL-01', 'IS 10500:2012', 'Drinking Water & Packaged Water', 'NABL accredited consumer sample testing for potability & mineral content'),
    ('NABL-HYD-01', 'IS 10500:2012', 'Drinking Water', 'Water quality & chemical contamination verification'),

    -- Two-Wheeler Helmets (IS 4151:2020)
    ('BIS-WROL-01', 'IS 4151:2020', 'Protective Helmets', 'Impact absorption test, retention system dynamic test, chin strap strength, penetration test'),
    ('BIS-NROL-01', 'IS 4151:2020', 'Protective Helmets', 'Full mechanical drop tower crash tests & peripheral vision assessment'),
    ('NABL-PUN-01', 'IS 4151:2020', 'Protective Helmets', 'Drop impact test, visor optical properties, flame resistance test (ARAI Pune)'),
    ('NABL-DEL-02', 'IS 4151:2020', 'Protective Helmets', 'Dynamic retention test & shock absorption tests (NTH Ghaziabad)'),

    -- Gold Hallmarking & Assaying (IS 1417:2016)
    ('BIS-CL-01', 'IS 1417:2016', 'Gold & Silver Jewellery', 'Referral Fire Assay (IS 1418), XRF Spectrometry, HUID authenticity checks'),
    ('BIS-BO-JAI', 'IS 1417:2016', 'Gold Jewellery', 'Consumer Gold Purity verification center & Assaying supervision'),
    ('BIS-BLR-01', 'IS 1417:2016', 'Gold Jewellery', 'Referral testing for 22K/18K/14K hallmarking disputes'),

    -- Electronics & IT Hardware (IS 13252 / IS 16046)
    ('BIS-WROL-01', 'IS 13252 (Part 1):2010', 'IT & Telecom Equipment', 'Safety against electrical shock, insulation resistance, abnormal heat'),
    ('BIS-SROL-01', 'IS 16046 (Part 2):2018', 'Lithium Cells and Batteries', 'Overcharge, short-circuit, mechanical shock, vibration, thermal test'),
    ('BIS-CL-01', 'IS 13252 (Part 1):2010', 'IT Hardware', 'CRS Scheme II full conformity certification tests'),

    -- Steel & Construction (IS 1786:2008)
    ('BIS-EROL-01', 'IS 1786:2008', 'TMT Steel Rebars', '0.2% Proof Stress, Tensile strength, Bend & Rebend tests, Carbon equivalent'),
    ('NABL-KOL-01', 'IS 1786:2008', 'TMT Rebars & Structural Steel', 'Full NABL mechanical & spectroscopic chemical analysis'),
    ('NABL-DEL-02', 'IS 1786:2008', 'TMT Steel Bars', 'Tensile yield strength and elongation tests');
    """
    cur.execute(scopes_sql)

    cur.close()
    conn.close()
    print("Success! BIS Laboratory Network updated in PostgreSQL with full location & consumer contact columns!")

if __name__ == "__main__":
    upgrade_labs()
