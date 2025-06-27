# backend/models.py
from typing import Optional

from sqlmodel import SQLModel, Field


class MatchBase(SQLModel):
    home: str
    away: str
    veo_id: Optional[str] = None


class Match(MatchBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class MatchCreate(MatchBase):
    pass


class MatchUpdate(SQLModel):
    #  ➜ alle felter valgfrie ⇒ perfekt til PATCH
    home: Optional[str] = None
    away: Optional[str] = None
    veo_id: Optional[str] = None
