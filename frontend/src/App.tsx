import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import MatchesPage from "./pages/MatchesPage"
import NewMatchPage from "./pages/NewMatchPage"
import MatchDetailPage from "./pages/MatchDetailPage"
import EditMatchPage from "./pages/EditMatchPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/matches/new" element={<NewMatchPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        <Route path="/matches/:id/edit" element={<EditMatchPage />} />
        <Route path="*" element={<MatchesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
