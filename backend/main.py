"""main.py – FastAPI-app med fuld CRUD på /matches via SQLite."""
from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel, select

from db import engine, get_session
from models import Match

app = FastAPI(title="Fan Platform API")

# Opret tabeller ved opstart
SQLModel.metadata.create_all(engine)

# CORS (tillad dit frontend-localhost eller * for nu)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # <- skift til f.eks. ["http://localhost:5173"] når du vil stramme op
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
def read_root():
    return {"message": "Fan Platform API – running 🚀"}


# ----------  CRUD-routes  ----------------- #
@app.get("/matches", response_model=List[Match], tags=["matches"])
def read_matches(session: Session = Depends(get_session)):
    return session.exec(select(Match)).all()


@app.post("/matches", response_model=Match, status_code=status.HTTP_201_CREATED, tags=["matches"])
def create_match(match: Match, session: Session = Depends(get_session)):
    session.add(match)
    session.commit()
    session.refresh(match)
    return match


@app.get("/matches/{match_id}", response_model=Match, tags=["matches"])
def read_match(match_id: int, session: Session = Depends(get_session)):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match


@app.put("/matches/{match_id}", response_model=Match, tags=["matches"])
def update_match(
    match_id: int,
    match_update: Match,
    session: Session = Depends(get_session),
):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    update_data = match_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(match, field, value)

    session.add(match)
    session.commit()
    session.refresh(match)
    return match


@app.delete("/matches/{match_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["matches"])
def delete_match(match_id: int, session: Session = Depends(get_session)):
    match = session.get(Match, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    session.delete(match)
    session.commit()
    return None
