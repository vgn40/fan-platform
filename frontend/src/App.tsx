import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MatchPage from "./pages/MatchesPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import NewMatchPage from "./pages/NewMatchPage";
import EditMatchPage from "./pages/EditMatchPage";

/**
 * Top-level router.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect fra roden */}
        <Route path="/" element={<Navigate to="/matches" replace />} />

        {/* CRUD-ruter */}
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/new" element={<NewMatchPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        <Route path="/matches/:id/edit" element={<EditMatchPage />} />

        {/* fallback */}
        <Route path="*" element={<p className="p-4">404 – siden findes ikke</p>} />
      </Routes>
    </BrowserRouter>
  );
}
