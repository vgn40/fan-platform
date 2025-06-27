<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import NewMatchPage from "./pages/NewMatchPage";
import MatchDetailPage from "./pages/MatchDetailPage";
=======
// src/App.tsx
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import MatchPage from "./pages/MatchPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import NewMatchPage from "./pages/NewMatchPage";
import EditMatchPage from "./pages/EditMatchPage";
>>>>>>> Stashed changes

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
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
=======
      <nav className="p-4 bg-slate-800 text-white flex gap-4">
        <Link to="/matches" className="hover:underline">
          Kampe
        </Link>
        <Link to="/matches/new" className="hover:underline">
          + Ny kamp
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/matches" replace />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/new" element={<NewMatchPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        <Route path="/matches/:id/edit" element={<EditMatchPage />} />
        {/* fallback */}
        <Route path="*" element={<p className="p-6">404 – siden findes ikke</p>} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}
