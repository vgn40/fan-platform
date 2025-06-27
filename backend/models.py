"""models.py – SQLModel-tabeller og Pydantic-schemas i ét."""
from typing import Optional

from sqlmodel import Field, SQLModel


class Match(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    home: str
    away: str
    veo_id: Optional[str] = None
