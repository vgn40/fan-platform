import { Link, useNavigate, useParams } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import { useDeleteMatch } from "../hooks/useDeleteMatch";

export default function MatchDetailPage() {
  const { id = "" } = useParams();
  const matchId = Number(id);
  const nav = useNavigate();

  const { data: match, isLoading, error } = useMatch(matchId);
  const del = useDeleteMatch();

  async function handleDelete() {
    if (confirm("Er du sikker på at du vil slette?")) {
      await del.mutateAsync(matchId);
      nav("/matches");
    }
  }

  if (isLoading) return <p className="p-4">Indlæser…</p>;
  if (error)     return <p className="p-4 text-red-600">{String(error)}</p>;
  if (!match)    return <p className="p-4">Match ikke fundet</p>;

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        {match.home} – {match.away}
      </h1>

      {/* Veo-video placeholder */}
      {match.veo_id ? (
        <div className="aspect-video bg-black/40 flex items-center justify-center rounded">
          <p className="text-sm text-zinc-400">Veo-video #{match.veo_id}</p>
        </div>
      ) : (
        <div className="aspect-video bg-zinc-800/40 flex items-center justify-center rounded">
          <p className="text-sm text-zinc-400">Ingen video tilføjet endnu</p>
        </div>
      )}

      <div className="flex gap-4">
        <Link
          to={`/matches/${matchId}/edit`}
          className="text-blue-500 hover:underline"
        >
          Redigér
        </Link>

        <button
          onClick={handleDelete}
          disabled={del.isPending}
          className="text-red-500 hover:underline disabled:opacity-50"
        >
          {del.isPending ? "Sletter…" : "Slet"}
        </button>
      </div>
    </div>
  );
}
