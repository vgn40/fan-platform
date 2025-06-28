// src/pages/MatchDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string;
  logo_home?: string | null;
  logo_away?: string | null;
};

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`);
        if (!res.ok) throw new Error(await res.text());
        setMatch(await res.json());
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Er du sikker på, du vil slette kampen?")) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/matches/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error(await res.text());
      navigate("/matches");
    } catch (err) {
      alert(`Kunne ikke slette: ${err}`);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Henter kamp…</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!match) return <p className="p-6 text-center text-red-600">Kamp ikke fundet</p>;

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb + actions */}
      <nav className="flex items-center justify-between">
        <Link
          to="/matches"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
        >
          <span className="-ml-1 text-lg">←</span>
          <span>Alle kampe</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to={`/matches/${match.id}/edit`}
            className="text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
          >
            Redigér
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white shadow hover:bg-red-500 disabled:opacity-50"
          >
            {deleting ? "Sletter…" : "Slet"}
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
          <span className="text-zinc-400">Veo-ID:</span> {match.veo_id ?? "—"}
        </p>
        <p>
          <span className="text-zinc-400">Match-ID:</span> {match.id}
        </p>
      </section>
    </main>
  );
}
