import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import { useMatches } from "./hooks/useMatches";
import NewMatchPage from "./pages/NewMatchPage";

export default function App() {
  const matches = useMatches();

  return (
    <BrowserRouter>
    
      <Routes>
        {/* Forsiden med kamp-listen */}
        <Route
          path="/"
          element={
            <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
              <h1>Kampe</h1>

              {matches.length === 0 ? (
                <p>Henter kampe …</p>
              ) : (
                matches.map(m => (
                  <p key={m.id}>
                    <Link to={`/match/${m.id}`}>
                      {m.home} vs {m.away}
                    </Link>
                  </p>
                ))
              )}
            </main>
          }
        />   {/* ← det var denne "/>" der manglede */}

        {/* Detaljeside for én kamp */}
        <Route path="match/:id" element={<MatchPage />} />

        <Route
  path="/"
  element={
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kampe</h1>

      <p>
        <Link to="/new">➕ Ny kamp</Link>
      </p>

      {matches.length === 0 ? (
        <p>Henter kampe …</p>
      ) : (
        matches.map(m => (
          <p key={m.id}>
            <Link to={`/match/${m.id}`}>{m.home} vs {m.away}</Link>
          </p>
        ))
      )}
    </main>
  }
/>

<Route path="new" element={<NewMatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
