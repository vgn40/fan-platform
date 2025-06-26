from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware   # ← CORS-importen
from pydantic import BaseModel



# --------------------------------------------------
# Opret API-appen
# --------------------------------------------------
app = FastAPI(title="Fan-API")

# --------------------------------------------------
# CORS – giv frontenden (localhost:5173) lov til at kalde API’et
# --------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Datamodel
# --------------------------------------------------
class Match(BaseModel):
    id: int
    home: str
    away: str
    veo_id: str | None = None  # kan være None hvis ingen video endnu

# --------------------------------------------------
# Dummy-data
# --------------------------------------------------
DUMMY = [
    Match(
        id=1,
        home="Aabybro IF",
        away="B52 Aalborg",
        # ← erstat “rigtigt-veo-id” med det, du kopierer fra VEO-embed-linket
        veo_id="rigtigt-veo-id"
    )
]

# --------------------------------------------------
# Routes / endpoints
# --------------------------------------------------
@app.get("/matches", response_model=list[Match])
async def get_matches():
    """Returnér en liste af fiktive kampe (MVP-demo)."""
    return DUMMY
@app.get("/matches/{match_id}", response_model=Match)
async def get_match(match_id: int):
    """Returnér én kamp baseret på id."""
    for m in DUMMY:
        if m.id == match_id:
            return m
    raise HTTPException(status_code=404, detail="Match not found")