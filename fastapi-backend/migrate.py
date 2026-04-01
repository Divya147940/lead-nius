from database import engine
from sqlalchemy import text

def run_migration():
    with engine.begin() as conn:
        try:
            conn.execute(text("ALTER TABLE registrations ADD COLUMN email VARCHAR;"))
            print("Added email column")
        except Exception as e:
            print("email column might already exist:", str(e))
        
        try:
            conn.execute(text("ALTER TABLE registrations ADD COLUMN password VARCHAR;"))
            print("Added password column")
        except Exception as e:
            print("password column might already exist:", str(e))

if __name__ == "__main__":
    run_migration()
