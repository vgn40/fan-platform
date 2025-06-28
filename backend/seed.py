"""
backend/seed.py
———————————————
Fylder SQLite-databasen med et sæt tilfældige dummy-kampe,
så du kan teste infinite-scroll i frontenden.

Brug:

    $ source .venv/bin/activate
    $ python backend/seed.py
"""

import random
from typing import List

from sqlmodel import Session
from db import engine           # ← genbrug samme engine som resten af app’en
from models import Match        # din SQLModel-tabel

# ── justér tal/navne hvis du har lyst ───────────────────────────────────────
NUM_MATCHES = 50
TEAM_NAMES  = [
    "Aabybro IF", "B52 Aalborg", "BK Skjold", "Vigerslev BK", "Deflottefyre",
    "FC Sunshine", "IF Stjernerne", "Galactic FC", "AC Pandas", "Hørsholm 79ers",
]
# ────────────────────────────────────────────────────────────────────────────


def random_matches(n: int) -> List[Match]:
    """Returnerer n Match-objekter (endnu ikke gemt i DB)."""
    matches: list[Match] = []
    for _ in range(n):
        home, away = random.sample(TEAM_NAMES, 2)
        veo_id     = random.choice([None, "string", str(random.randint(10_000, 99_999))])
        matches.append(Match(home=home, away=away, veo_id=veo_id))
    return matches


if __name__ == "__main__":
    with Session(engine) as session:
        session.add_all(random_matches(NUM_MATCHES))
        session.commit()
    print(f"🥳  Tilføjede {NUM_MATCHES} dummy-kampe til databasen.")
