import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMatch } from "../hooks/useMatch";
import { useUpdateMatch } from "../hooks/useUpdateMatch";

type FormData = { home: string; away: string; veo_id?: string };

export default function EditMatchPage() {
  const { id = "" } = useParams();
  const matchId = Number(id);
  const nav     = useNavigate();

  const { data: match, isLoading, error } = useMatch(matchId);
  const update = useUpdateMatch();

  const { register, handleSubmit, reset } = useForm<FormData>();

  // Når vi får data første gang ⇒ fyld formularen
  useEffect(() => {
    if (match) reset(match);
  }, [match, reset]);

  if (isLoading) return <p className="p-4">Indlæser…</p>;
  if (error)     return <p className="p-4 text-red-600">{String(error)}</p>;
  if (!match)    return null; // burde ikke ske, men for en god ordens skyld

  async function onSubmit(data: FormData) {
    await update.mutateAsync({ id: matchId, ...data });
    nav("/matches");
  }

  return (
    <div className="mx-auto max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-bold">Redigér kamp</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full border p-2" {...register("home", { required: true })} />
        <input className="w-full border p-2" {...register("away", { required: true })} />
        <input className="w-full border p-2" {...register("veo_id")} />

        <button
          className="bg-blue-600 text-white rounded py-2 px-4 disabled:opacity-50"
          disabled={update.isPending}
        >
          {update.isPending ? "Gemmer…" : "Gem"}
        </button>
      </form>
    </div>
  );
}
