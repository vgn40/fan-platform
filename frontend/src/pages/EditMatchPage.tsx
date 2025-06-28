// src/pages/NewMatchPage.tsx (eller EditMatchPage.tsx)
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type Inputs = { home: string; away: string; veo_id?: string; logo_home?: string; logo_away?: string; };

export default function NewMatchPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const navigate = useNavigate();

  async function onSubmit(data: Inputs) {
    // ... din API kode
    navigate("/matches");
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <Link to="/matches" className="text-blue-400 mb-4 block">&larr; Tilbage til kampe</Link>
        <h1 className="text-2xl font-bold mb-6 text-white">Opret ny kamp</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-zinc-300 mb-1">Hjemmehold</label>
            <input className="w-full rounded px-3 py-2 bg-zinc-700 text-white" {...register("home", { required: true })} placeholder="Hjemmehold" />
            {errors.home && <span className="text-red-400 text-sm">Påkrævet</span>}
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Logo (URL, hjemmehold)</label>
            <input className="w-full rounded px-3 py-2 bg-zinc-700 text-white" {...register("logo_home")} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Udehold</label>
            <input className="w-full rounded px-3 py-2 bg-zinc-700 text-white" {...register("away", { required: true })} placeholder="Udehold" />
            {errors.away && <span className="text-red-400 text-sm">Påkrævet</span>}
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Logo (URL, udehold)</label>
            <input className="w-full rounded px-3 py-2 bg-zinc-700 text-white" {...register("logo_away")} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Veo-ID (valgfri)</label>
            <input className="w-full rounded px-3 py-2 bg-zinc-700 text-white" {...register("veo_id")} placeholder="37453" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold w-full"
          >
            {isSubmitting ? "Gemmer…" : "Gem kamp"}
          </button>
        </form>
      </div>
    </main>
  );
}
