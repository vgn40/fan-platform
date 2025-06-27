# backend/seed.py
from sqlmodel import Session, select
from db import engine, init_db
from models import Match

init_db()                      # sørg for at tabellen findes

with Session(engine) as s:
    if not s.exec(select(Match)).first():
        s.add_all(
            [
                Match(home="Aabybro IF", away="B52 Aalborg"),
                Match(home="bingbong", away="desmartedrenge", veo_id="5421232113"),
            ]
        )
        s.commit()
        print("SQLite seeded with 2 matches")
    else:
        print("Database already has data – nothing inserted")
