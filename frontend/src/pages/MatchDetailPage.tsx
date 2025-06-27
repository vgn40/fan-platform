import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatch() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as Match;
        setMatch(data);
      } catch (err: any) {
        setError(err.message ?? "Ukendt fejl");
      } finally {
        setLoading(false);
      }
    }
    fetchMatch();
  }, [id]);

  if (loading) return <p className="p-6">Indlæser…</p>;
  if (error) return <p className="p-6 text-red-600">Fejl: {error}</p>;
  if (!match) return <p className="p-6">Match ikke fundet.</p>;

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {match.home} vs {match.away}
        </h1>
        <Link to="/matches" className="text-blue-500 hover:underline">
          ← Tilbage
        </Link>
      </header>

      {/* Placeholder for Veo-video */}
      <section className="aspect-video w-full rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400">
        {match.veo_id ? (
          <p>Her kommer videoen (veo_id: {match.veo_id})</p>
        ) : (
          <p>Ingen video endnu – veo-id mangler</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Info</h2>
        <table className="w-full text-left">
          <tbody>
            <tr>
              <th className="pr-4 py-1">ID</th>
              <td>{match.id}</td>
            </tr>
            <tr>
              <th className="pr-4 py-1">Hjemmehold</th>
              <td>{match.home}</td>
            </tr>
            <tr>
              <th className="pr-4 py-1">Udehold</th>
              <td>{match.away}</td>
            </tr>
            <tr>
              <th className="pr-4 py-1">Veo-ID</th>
              <td>{match.veo_id ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
