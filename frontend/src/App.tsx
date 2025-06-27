import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import NewMatchPage from "./pages/NewMatchPage";
import MatchDetailPage from "./pages/MatchDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* simpel top-nav */}
      <nav className="p-4 bg-neutral-900 border-b border-neutral-800 text-sm">
        <div className="max-w-3xl mx-auto flex gap-6">
          <Link to="/matches" className="hover:underline">
            Kampe
          </Link>
          <Link to="/matches/new" className="hover:underline">
            Opret kamp
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/matches" />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/new" element={<NewMatchPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        {/* fallback */}
        <Route
          path="*"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">404 – Siden findes ikke</h1>
              <Link to="/" className="text-blue-500 hover:underline">
                Til forsiden
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
