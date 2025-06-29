# backend/models.py
from typing    import Optional
from datetime  import datetime
from sqlmodel  import SQLModel, Field

class MatchBase(SQLModel):
    home:       str
    away:       str
    date:       datetime = Field(
                  nullable=False,
                  description="Dato og tidspunkt for kampen i ISO-format"
                )
    veo_id:     Optional[str] = None
    logo_home:  Optional[str] = None
    logo_away:  Optional[str] = None

class Match(MatchBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class MatchCreate(MatchBase):
    """POST /matches – alle felter skal sendes."""

class MatchUpdate(SQLModel):
    """PATCH/PUT – alle felter valgfrie."""
    home:      Optional[str]     = None
    away:      Optional[str]     = None
    date:      Optional[datetime] = None
    veo_id:    Optional[str]     = None
    logo_home: Optional[str]     = None
    logo_away: Optional[str]     = None
