// src/pages/MatchPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

<<<<<<< Updated upstream
type Match = { id: number; home: string; away: string; veo_id?: string | null };
=======
interface Match {
  id: number;
  home: string;
  away: string;
}
>>>>>>> Stashed changes

export default function MatchPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
<<<<<<< Updated upstream
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
=======
  const [error, setError] = useState<string>();

  async function load() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/matches`);
      if (!res.ok) throw new Error(await res.text());
      setMatches(await res.json());
    } catch (err: any) {
      setError(err.message || "Ukendt fejl");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Er du sikker på, at du vil slette kampen?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      // optimistisk opdatering
      setMatches((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert(`Kunne ikke slette: ${err.message || err}`);
    }
  }

  useEffect(() => {
    load();
>>>>>>> Stashed changes
  }, []);

  if (loading) return <p className="p-6">Indlæser…</p>;
  if (error) return <p className="p-6 text-red-600">Fejl: {error}</p>;

  return (
<<<<<<< Updated upstream
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
=======
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kampe</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-2">Kamp</th>
            <th className="p-2 w-32">Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">
                <Link to={`/matches/${m.id}`} className="hover:underline">
                  {m.home} – {m.away}
                </Link>
              </td>
              <td className="p-2 flex gap-2">
                <Link
                  to={`/matches/${m.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Redigér
                </Link>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-600 hover:underline"
                >
                  Slet
                </button>
              </td>
>>>>>>> Stashed changes
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
