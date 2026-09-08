import os
from pathlib import Path
import psycopg2
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "bis_database")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")

def setup_database():
    print(f"Connecting to PostgreSQL at {DB_HOST}:{DB_PORT} as user '{DB_USER}'...")
    try:
        # Connect to default postgres DB first to create bis_database if missing
        conn_init = psycopg2.connect(
            host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname="postgres"
        )
        conn_init.autocommit = True
        cur_init = conn_init.cursor()
        
        cur_init.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{DB_NAME}'")
        if not cur_init.fetchone():
            print(f"Creating database '{DB_NAME}'...")
            cur_init.execute(f"CREATE DATABASE {DB_NAME}")
        else:
            print(f"Database '{DB_NAME}' already exists.")
        cur_init.close()
        conn_init.close()

        # Connect to bis_database to apply schema and seeds
        conn = psycopg2.connect(
            host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD, dbname=DB_NAME
        )
        cur = conn.cursor()

        print("Executing schema.sql...")
        with open("schema.sql", "r", encoding="utf-8") as f:
            cur.execute(f.read())
        print("Schema tables created successfully.")

        print("Executing seed_data.sql...")
        with open("seed_data.sql", "r", encoding="utf-8") as f:
            cur.execute(f.read())
        print("BIS Seed Data inserted successfully.")

        conn.commit()
        cur.close()
        conn.close()
        print("\nAll tables created & seeded in PostgreSQL successfully!")

    except Exception as e:
        print(f"Database setup error: {e}")

if __name__ == "__main__":
    setup_database()