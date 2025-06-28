"""
backend/models.py
──────────────────
SQLModel-tabellen (Match) + de to Pydantic-schemas der bruges til
opret (MatchCreate) og patch/update (MatchUpdate).
"""

from typing import Optional

from sqlmodel import SQLModel, Field


class MatchBase(SQLModel):
    home: str
    away: str
    veo_id: Optional[str] = None


class Match(MatchBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class MatchCreate(MatchBase):
    """Request-body når der POST’es /matches (alle felter krævet)."""
    pass


class MatchUpdate(SQLModel):
    """PATCH/PUT – alle felter valgfrie ⇒ send kun det du vil ændre."""
    home: Optional[str] = None
    away: Optional[str] = None
    veo_id: Optional[str] = None
