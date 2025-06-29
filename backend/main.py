# backend/main.py

from typing               import List, Optional
from datetime             import datetime
from fastapi              import FastAPI, HTTPException, status, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel             import SQLModel, Session, select

from .db     import engine, get_session
from .models import Match, MatchCreate, MatchUpdate
app = FastAPI()

# ── Ensure SQLite tables exist on startup ────────────────────────────
@app.on_event("startup")
def on_startup() -> None:
    SQLModel.metadata.create_all(engine)

# ── Global CORS: allow everything ────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # <== any origin
    allow_methods=["*"],        # <== all HTTP methods
    allow_headers=["*"],        # <== all headers
    allow_credentials=True,
)

# ─────────────────────────────────────────────────────────────────────
#                                MATCH API
# ─────────────────────────────────────────────────────────────────────

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.get("/matches", response_model=List[Match])
def list_matches(
    *,
    skip:   int               = Query(0, ge=0),
    limit:  int               = Query(20, ge=1, le=100),
    after:  Optional[datetime] = Query(None, description="Only matches after this timestamp"),
    before: Optional[datetime] = Query(None, description="Only matches before this timestamp"),
    session: Session          = Depends(get_session),
):
    """
    List matches with offset/limit paging.
    Optionally filter by match.date > after and/or match.date < before.
    """
    stmt = select(Match)

    if after:
        stmt = stmt.where(Match.date > after)
    if before:
        stmt = stmt.where(Match.date < before)

    stmt = stmt.order_by(Match.date.desc()).offset(skip).limit(limit)
    return session.exec(stmt).all()


@app.post(
    "/matches",
    response_model=Match,
    status_code=status.HTTP_201_CREATED,
)
def create_match(
    *,
    match:   MatchCreate,
    session: Session = Depends(get_session),
):
    """
    Create a new match. All fields in MatchCreate are required.
    """
    db_match = Match(**match.dict())
    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


@app.get("/matches/{match_id}", response_model=Match)
def get_match(
    *,
    match_id: int,
    session:  Session = Depends(get_session),
):
    """
    Fetch a single match by its ID.
    """
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Match not found")
    return db_match


@app.put("/matches/{match_id}", response_model=Match)
def replace_match(
    *,
    match_id:  int,
    new_match: MatchCreate,
    session:   Session = Depends(get_session),
):
    """
    Replace every field of an existing match (PUT).
    """
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Match not found")

    for field, val in new_match.model_dump().items():
        setattr(db_match, field, val)

    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


@app.patch("/matches/{match_id}", response_model=Match)
def patch_match(
    *,
    match_id: int,
    updates:  MatchUpdate,
    session:  Session = Depends(get_session),
):
    """
    Update only provided fields on a match (PATCH).
    """
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Match not found")

    for field, val in updates.model_dump(exclude_unset=True).items():
        setattr(db_match, field, val)

    session.add(db_match)
    session.commit()
    session.refresh(db_match)
    return db_match


@app.delete("/matches/{match_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_match(
    *,
    match_id: int,
    session:  Session = Depends(get_session),
):
    """
    Delete a match by ID.
    """
    db_match = session.get(Match, match_id)
    if not db_match:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Match not found")

    session.delete(db_match)
    session.commit()
