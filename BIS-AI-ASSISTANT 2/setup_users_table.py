import os
from pathlib import Path
import psycopg2
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

def setup_users_table():
    print("Setting up 'users' table in PostgreSQL...")
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
        CREATE TABLE IF NOT EXISTS users (
            user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            full_name VARCHAR(150) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            user_role VARCHAR(50) DEFAULT 'Citizen / Consumer', -- 'Manufacturer', 'Citizen / Consumer', 'Jeweller / AHC', 'Lab Quality Manager'
            organization_name VARCHAR(200),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    """)

    cur.close()
    conn.close()
    print("Users table created successfully in 'bis_database'!")

if __name__ == "__main__":
    setup_users_table()
