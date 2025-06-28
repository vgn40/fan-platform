import { Routes, Route, Navigate } from "react-router-dom"
import MatchesPage      from "./pages/MatchesPage"
import MatchDetailPage  from "./pages/MatchDetailPage"
import NewMatchPage     from "./pages/NewMatchPage"
import EditMatchPage    from "./pages/EditMatchPage"

export default function App() {
  return (
    <Routes>
      {/* redirect root → /matches */}
      <Route path="/" element={<Navigate to="/matches" replace />} />

      {/* RESTful routes */}
      <Route path="/matches"           element={<MatchesPage />} />
      <Route path="/matches/new"       element={<NewMatchPage />} />
      <Route path="/matches/:id"       element={<MatchDetailPage />} />
      <Route path="/matches/:id/edit"  element={<EditMatchPage />} />

      {/* fallback 404 */}
      <Route
        path="*"
        element={<p className="p-4">404 – Siden findes ikke</p>}
      />
    </Routes>
  )
}
