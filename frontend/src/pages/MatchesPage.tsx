import { useRef } from "react";
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

  // sentinel-element til IntersectionObserver
  const loadMoreRef = useRef<HTMLTableRowElement | null>(null);

  // opsæt observer
  React.useEffect(() => {
    if (!loadMoreRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <p className="p-4">Henter kampe…</p>;
  if (error)     return <p className="p-4 text-red-600">{error.message}</p>;

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <nav className="flex gap-4 text-blue-500">
        <Link to="/matches">Kampe</Link>
        <Link to="/matches/new">Opret kamp</Link>
      </nav>

      <h1 className="text-4xl font-bold">Kampe</h1>

      <table className="w-full border-collapse">
        <thead className="border-b text-left">
          <tr>
            <th className="py-2 pr-4">#</th>
            <th className="py-2 pr-4">Hjemme</th>
            <th className="py-2 pr-4">Ude</th>
            <th className="py-2">Veo-ID</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m, idx) => (
            <tr key={m.id} className="border-b odd:bg-zinc-800/30">
              <td className="py-2 pr-4">{idx}</td>
              <td className="py-2 pr-4">
                <Link className="hover:underline" to={`/matches/${m.id}`}>
                  {m.home}
                </Link>
              </td>
              <td className="py-2 pr-4">{m.away}</td>
              <td className="py-2">{m.veo_id ?? "—"}</td>
            </tr>
          ))}

          {/* loader-række (observer-target) */}
          <tr ref={loadMoreRef}>
            <td colSpan={4} className="py-6 text-center">
              {hasNextPage ? (
                <span className="text-sm text-zinc-400">
                  {isFetchingNextPage ? "Indlæser flere…" : "Scroll for at hente flere"}
                </span>
              ) : (
                <span className="text-sm text-zinc-500">Alle kampe indlæst</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
