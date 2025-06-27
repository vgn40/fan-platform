# backend/main.py  – øverste ~20 linjer
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, select

from db import engine, get_session
from models import Match, MatchCreate, MatchUpdate

app = FastAPI()

# CORS – så frontend på :5173 må kalde API’et
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- REST endpoints kommer herunder ----------


# — kør migrering (kun SQLite) —
@app.on_event("startup")
def on_startup() -> None:
    SQLModel.metadata.create_all(engine)


# ---------------------------------------------------------------------------
#                               MATCH-ENDPOINTS
# ---------------------------------------------------------------------------

@app.get("/matches", response_model=list[Match])
def list_matches(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    session: Session = Depends(get_session),
):
    stmt = select(Match).order_by(Match.id.desc()).offset(skip).limit(limit)
    return session.exec(stmt).all()

@app.post("/matches", response_model=Match, status_code=201)
def create_match(match: MatchCreate, session: Session = Depends(get_session)):
    db_match = Match.model_validate(match)
    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


@app.get("/matches/{match_id}", response_model=Match)
def get_match(match_id: int, session: Session = Depends(get_session)):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(404, "Match not found")
    return match


@app.put("/matches/{match_id}", response_model=Match)
def replace_match(
    match_id: int,
    new_match: MatchCreate,
    session: Session = Depends(get_session),
):
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(404, "Match not found")

    for field, value in new_match.model_dump().items():
        setattr(db_match, field, value)

    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


# ------------- NYT!  PATCH  (delvis opdatering) -----------------
@app.patch("/matches/{match_id}", response_model=Match)
def patch_match(
    match_id: int,
    updates: MatchUpdate,                 # alle felter optional
    session: Session = Depends(get_session),
):
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(404, "Match not found")

    # kun de felter der er sendt (exclude_unset=True)
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_match, field, value)

    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


@app.delete("/matches/{match_id}", status_code=204)
def delete_match(match_id: int, session: Session = Depends(get_session)):
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(404, "Match not found")
    session.delete(db_match)
    session.commit()
