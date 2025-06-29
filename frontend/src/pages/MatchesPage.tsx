// frontend/src/pages/MatchesPage.tsx
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
    <div className="mx-auto max-w-7xl p-6 space-y-8">
      <nav className="flex gap-6 mb-6 text-indigo-300">
        <Link to="/matches" className="hover:underline">Kampe</Link>
        <Link to="/matches/new" className="hover:underline">Opret kamp</Link>
      </nav>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setStatus("upcoming")}
          className={`px-4 py-1 rounded-full transition ${
            status === "upcoming"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          }`}
        >
          Kommende
        </button>
        <button
          onClick={() => setStatus("past")}
          className={`px-4 py-1 rounded-full transition ${
            status === "past"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          }`}
        >
          Afviklede
        </button>
      </div>

      <h1 className="text-4xl font-bold text-white">
        {status === "upcoming" ? "Kommende kampe" : "Tidligere kampe"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>

      <div ref={loadMoreRef} />
      {isFetchingNextPage && <p className="text-center text-indigo-300 mt-6">Indlæser flere…</p>}
      {!hasNextPage && matches.length > 0 && (
        <p className="text-center text-indigo-300 mt-6">Alle kampe indlæst</p>
      )}
    </div>
  )
}
