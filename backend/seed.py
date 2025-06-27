# backend/seed.py
import random
from typing import List
from sqlmodel import SQLModel, Session, create_engine

# ----- konfig-variabler -----
DB_FILE      = "sqlite:///./fan.db"      # sti skal matche din prod.db hvis du bruger en anden!
NUM_MATCHES  = 50                        # hvor mange tilfældige kampe vil du lave?
TEAM_NAMES   = [
    "Aabybro IF", "B52 Aalborg", "BK Skjold", "Vigerslev BK", "Deflottefyre",
    "FC Sunshine", "IF Stjernerne", "Galactic FC", "AC Pandas", "Hørsholm 79ers",
]

# ---------------------------------------------------------------
from models import Match  # <- din eksisterende SQLModel‐klasse

engine = create_engine(DB_FILE, echo=False)
SQLModel.metadata.create_all(engine)     # sikkerhed: opret tabeller hvis de ikke findes

def random_matches(n: int) -> List[Match]:
    matches = []
    for _ in range(n):
        home, away = random.sample(TEAM_NAMES, 2)
        veo_id     = random.choice([None, "string", str(random.randint(10000, 99999))])
        matches.append(Match(home=home, away=away, veo_id=veo_id))
    return matches

if __name__ == "__main__":
    with Session(engine) as session:
        session.add_all(random_matches(NUM_MATCHES))
        session.commit()
    print(f"🥳  Tilføjede {NUM_MATCHES} dummy-kampe til databasen.")
