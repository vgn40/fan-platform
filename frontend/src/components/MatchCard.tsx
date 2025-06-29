import { Link } from "react-router-dom"
import type { Match } from "../types"

type Props = {
  match: Match
}

export function MatchCard({ match }: Props) {
  return (
    <Link
      to={`/matches/${match.id}`}
      className="group block bg-zinc-800 rounded-xl px-4 py-5 shadow hover:shadow-xl transition space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <img
            src={match.logo_home || "/placeholder.png"}
            alt={match.home}
            className="h-14 w-14 rounded-full object-cover border border-zinc-700"
          />
          <span className="text-sm text-zinc-100 text-center">{match.home}</span>
        </div>

        <span className="text-zinc-400 font-medium">vs</span>

        <div className="flex flex-col items-center gap-1">
          <img
            src={match.logo_away || "/placeholder.png"}
            alt={match.away}
            className="h-14 w-14 rounded-full object-cover border border-zinc-700"
          />
          <span className="text-sm text-zinc-100 text-center">{match.away}</span>
        </div>
      </div>

      <div className="text-center text-sm text-zinc-400">
        {new Date(match.date).toLocaleString("da-DK", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    </Link>
  )
}
