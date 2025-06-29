// frontend/src/components/MatchCard.tsx
import React from "react"
import { Link } from "react-router-dom"
import type { Match } from "../types"

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const dateStr = new Date(match.date).toLocaleString("da-DK", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  return (
    <Link to={`/matches/${match.id}`} className="block max-w-sm mx-auto group">
      <div className="aspect-square bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
        <img
          src={match.logo_home || "/placeholder.png"}
          alt={match.home}
          className="w-full h-full object-contain p-6"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="font-semibold text-lg text-indigo-100">
          {match.home} <span className="text-indigo-400">vs</span> {match.away}
        </p>
        <p className="mt-1 text-sm text-indigo-300">{dateStr}</p>
      </div>
    </Link>
  )
}
