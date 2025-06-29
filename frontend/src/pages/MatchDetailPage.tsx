// src/pages/MatchDetailPage.tsx
import React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

type Match = {
  id:        number
  home:      string
  away:      string
  veo_id?:   string
  logo_home?: string | null
  logo_away?: string | null
}

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()

  // ──────────────────────────────────────────────────────────────────────────
  // Hent kampen
  // ──────────────────────────────────────────────────────────────────────────
  const {
    data: match,
    isLoading,
    isError,
    error,
  } = useQuery<Match, Error>({
    queryKey: ["match", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`)
      if (!res.ok) throw new Error(await res.text())
      return res.json()
    },
  })

  // ──────────────────────────────────────────────────────────────────────────
  // Slet-mutation
  // ──────────────────────────────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API}/matches/${id}`,
        { method: "DELETE" },
      )
      if (!res.ok) throw new Error(await res.text())
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] })
      navigate("/matches")
    },
  })

  if (isLoading) {
    return <p className="p-6 text-center">Henter kamp…</p>
  }
  if (isError) {
    return (
      <p className="p-6 text-center text-red-600">
        {error.message}
      </p>
    )
  }
  if (!match) {
    return (
      <p className="p-6 text-center text-red-600">
        Kamp ikke fundet
      </p>
    )
  }

  return (
    <main className="mx-auto max-w-lg p-6 space-y-6">
      {/* Breadcrumb + actions */}
      <nav className="flex items-center justify-between">
        <Link
          to="/matches"
          className="text-[var(--color-primary)] hover:underline"
        >
          ← Alle kampe
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to={`/matches/${match.id}/edit`}
            className="text-[var(--color-primary)] hover:underline"
          >
            Redigér
          </Link>
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="bg-red-600 px-4 py-1.5 text-white rounded hover:bg-red-500 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Sletter…" : "Slet"}
          </button>
        </div>
      </nav>

      {/* Kamp-header */}
      <section className="flex flex-col sm:flex-row items-center justify-between bg-zinc-800 p-6 rounded-xl shadow-lg space-y-4 sm:space-y-0">
        <div className="flex items-center gap-4">
          <img
            src={match.logo_home || "/placeholder.png"}
            alt={match.home}
            className="logo"
          />
          <span className="text-2xl font-bold">{match.home}</span>
        </div>
        <span className="text-zinc-400 text-xl font-semibold">vs</span>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">{match.away}</span>
          <img
            src={match.logo_away || "/placeholder.png"}
            alt={match.away}
            className="logo"
          />
        </div>
      </section>

      {/* Detaljer */}
      <section className="bg-zinc-800 p-6 rounded-xl shadow-lg space-y-2">
  <h2 className="text-xl font-semibold">Detaljer</h2>

  <p>
    <span className="text-zinc-400">Dato & Tidspunkt:</span>{" "}
    {new Date(match.date).toLocaleString("da-DK", {
      dateStyle: "full",
      timeStyle: "short",
    })}
  </p>

  <p>
    <span className="text-zinc-400">Veo-ID:</span> {match.veo_id ?? "—"}
  </p>
  <p>
    <span className="text-zinc-400">Match-ID:</span> {match.id}
  </p>
</section>
    </main>
  )
}
