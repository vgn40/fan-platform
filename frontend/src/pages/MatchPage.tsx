import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Match = { id: number; home: string; away: string; veo_id?: string | null };

export default function MatchPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/matches`);
        if (!res.ok) throw new Error(await res.text());
        setMatches(await res.json());
      } catch (err: any) {
        setError(err.message ?? "Ukendt fejl");
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  if (loading) return <p className="p-6">Indlæser…</p>;
  if (error) return <p className="p-6 text-red-600">Fejl: {error}</p>;

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Kampe</h1>
        <Link to="/matches/new" className="text-blue-500 hover:underline">
          Opret kamp
        </Link>
      </header>

      <table className="w-full text-left border-separate border-spacing-y-1">
        <thead className="text-neutral-400 text-sm">
          <tr>
            <th>#</th>
            <th>Hjemme</th>
            <th>Ude</th>
            <th>Veo-ID</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m, idx) => (
            <tr key={m.id} className="hover:bg-neutral-800 rounded">
              <td className="pr-4 py-1">{idx}</td>
              <td className="pr-4 py-1">
                <Link
                  to={`/matches/${m.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {m.home}
                </Link>
              </td>
              <td className="pr-4 py-1">{m.away}</td>
              <td className="pr-4 py-1">{m.veo_id ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
