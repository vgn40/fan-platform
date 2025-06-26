from fastapi import FastAPI
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
    Match(id=1, home="Aabybro IF", away="B52 Aalborg", veo_id="123abc")
]

# --------------------------------------------------
# Routes / endpoints
# --------------------------------------------------
@app.get("/matches", response_model=list[Match])
async def get_matches():
    """Returnér en liste af fiktive kampe (MVP-demo)."""
    return DUMMY
