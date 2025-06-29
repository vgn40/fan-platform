import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMatchesInfinite } from "../hooks/useMatchesInfinite"
import type { Match } from "../types"
import { MatchCard } from "../components/MatchCard"

export default function MatchesPage() {
  const [status, setStatus] = useState<"upcoming" | "past">("upcoming")
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMatchesInfinite({ status })

  const matches: Match[] = data?.pages.flat() ?? []
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: "200px" }
    )
    obs.observe(loadMoreRef.current)
    return () => obs.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) return <p className="p-4 text-center">Henter kampe…</p>
  if (error) return <p className="p-4 text-center text-red-600">{error.message}</p>

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <nav className="flex gap-4 mb-6">
        <Link to="/matches" className="text-primary hover:underline">Kampe</Link>
        <Link to="/matches/new" className="text-primary hover:underline">Opret kamp</Link>
      </nav>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setStatus("upcoming")}
          className={`px-4 py-2 rounded-md ${
            status === "upcoming"
              ? "bg-primary text-white"
              : "bg-zinc-700 text-zinc-300"
          }`}
        >
          Kommende
        </button>
        <button
          onClick={() => setStatus("past")}
          className={`px-4 py-2 rounded-md ${
            status === "past"
              ? "bg-primary text-white"
              : "bg-zinc-700 text-zinc-300"
          }`}
        >
          Afviklede
        </button>
      </div>

      <h1 className="text-3xl font-bold">
        {status === "upcoming" ? "Kommende kampe" : "Tidligere kampe"}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div> {/* <-- Denne lukker .grid containeren korrekt */}

      <div ref={loadMoreRef} className="h-2" />
      {isFetchingNextPage && <p className="text-center text-zinc-400 mt-4">Indlæser flere…</p>}
      {!hasNextPage && matches.length > 0 && (
        <p className="text-center text-zinc-500 mt-4">Alle kampe indlæst</p>
      )}
    </div>
  )
}
