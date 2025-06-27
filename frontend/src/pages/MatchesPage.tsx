import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Match {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Hent alle kampe ved mount */
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/matches`);
        if (!res.ok) throw new Error(await res.text());
        setMatches(await res.json());
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-6">Indlæser…</p>;
  if (error) return <p className="p-6 text-red-600">Fejl: {error}</p>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kampe</h1>
        <Link
          to="/matches/new"
          className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700"
        >
          Opret kamp
        </Link>
      </header>

      {matches.length === 0 ? (
        <p>Ingen kampe endnu.</p>
      ) : (
        <table className="w-full border divide-y">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Hjemme</th>
              <th className="p-2">Ude</th>
              <th className="p-2">Veo-ID</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="p-2">
                  <Link
                    to={`/matches/${m.id}`}
                    className="text-blue-600 underline"
                  >
                    {m.id}
                  </Link>
                </td>
                <td className="p-2">{m.home}</td>
                <td className="p-2">{m.away}</td>
                <td className="p-2">{m.veo_id ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

