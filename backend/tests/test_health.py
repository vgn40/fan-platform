# backend/tests/test_health.py
import pytest
from fastapi.testclient import TestClient
from backend.main import app    # <–– her

@pytest.fixture
def client():
    return TestClient(app)

def test_health_endpoint(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}
