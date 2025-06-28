// src/pages/MatchesPage.tsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMatchesInfinite } from "../hooks/useMatchesInfinite";

export default function MatchesPage() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMatchesInfinite();

  const matches = data?.pages.flat() ?? [];
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p className="p-4 text-center">Henter kampe…</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header + nav */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Kampe</h1>
        <nav className="mt-4 sm:mt-0 space-x-4">
          <Link to="/matches" className="text-blue-400 hover:underline">
            Kampe
          </Link>
          <Link to="/matches/new" className="text-blue-400 hover:underline">
            Opret kamp
          </Link>
        </nav>
      </header>

      {/* Grid med kampekort */}
      <div className="grid gap-6 sm:grid-cols-2">
        {matches.map((m) => (
          <Link
            key={m.id}
            to={`/matches/${m.id}`}
            className="group block bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={m.logo_home || "/placeholder.png"}
                  alt={m.home}
                  className="logo"
                />
                <span className="ml-3 text-lg font-semibold text-white group-hover:text-blue-300">
                  {m.home}
                </span>
              </div>

              <span className="text-zinc-400 font-medium">vs</span>

              <div className="flex items-center">
                <span className="mr-3 text-lg font-semibold text-white group-hover:text-blue-300">
                  {m.away}
                </span>
                <img
                  src={m.logo_away || "/placeholder.png"}
                  alt={m.away}
                  className="logo"
                />
              </div>
            </div>

            <div className="text-sm text-zinc-400">
              <span className="font-medium text-zinc-500">Veo-ID:</span>{" "}
              {m.veo_id ?? "—"}
            </div>
          </Link>
        ))}
      </div>

      {/* Sentinel + loader */}
      <div ref={loadMoreRef} className="h-8" />
      {isFetchingNextPage && (
        <p className="text-center text-zinc-400 mt-6">Indlæser flere…</p>
      )}
    </div>
  );
}
