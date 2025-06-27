"""db.py – central database-opsætning og sessions-helper."""
from pathlib import Path
import os

from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

# Hent DATABASE_URL fra .env (eller brug fan.db som fallback)
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///fan.db")

# Sørg for at SQLite-filen eksisterer (opret mappen hvis den mangler)
if DATABASE_URL.startswith("sqlite:///"):
    db_file = Path(DATABASE_URL.replace("sqlite:///", "", 1))
    db_file.parent.mkdir(parents=True, exist_ok=True)

engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})


def get_session() -> Session:
    """FastAPI-dependency der leverer en SQLModel-Session."""
    with Session(engine) as session:
        yield session
