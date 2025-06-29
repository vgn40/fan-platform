// frontend/src/pages/NewMatchPage.tsx
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useCreateMatch } from "../hooks/useCreateMatch"
import type { MatchInput } from "../types"

export default function NewMatchPage() {
  const navigate = useNavigate()
  const createMatch = useCreateMatch()

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<MatchInput>()

  const onSubmit = (data: MatchInput) => {
    createMatch.mutate(data, {
      onSuccess: () => navigate("/matches"),
    })
  }

  const createLoading = isSubmitting || createMatch.isPending

  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <Link to="/matches" className="text-primary hover:underline">← Tilbage til oversigt</Link>
      <h1 className="text-2xl font-bold">Opret ny kamp</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-zinc-800 p-6 rounded-xl shadow">
        {/* Dato & tid */}
        <div>
          <label className="block mb-1">Dato og tid *</label>
          <input
            type="datetime-local"
            {...register("date", { required: "Dato og tid er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.date && <p className="text-red-400 text-sm">{errors.date.message}</p>}
        </div>
        {/* Hjemmehold */}
        <div>
          <label className="block mb-1">Hjemmehold *</label>
          <input
            {...register("home", { required: "Hjemmehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.home && <p className="text-red-400 text-sm">{errors.home.message}</p>}
        </div>
        {/* Udehold */}
        <div>
          <label className="block mb-1">Udehold *</label>
          <input
            {...register("away", { required: "Udehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.away && <p className="text-red-400 text-sm">{errors.away.message}</p>}
        </div>
        {/* Veo-ID */}
        <div>
          <label className="block mb-1">Veo-ID (valgfri)</label>
          <input
            {...register("veo_id", { pattern: { value: /^\d*$/, message: "Veo-ID skal være tal" } })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.veo_id && <p className="text-red-400 text-sm">{errors.veo_id.message}</p>}
        </div>
        {/* Logo hjemme */}
        <div>
          <label className="block mb-1">Logo hjemme (URL, valgfri)</label>
          <input {...register("logo_home")} className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white" />
        </div>
        {/* Logo ude */}
        <div>
          <label className="block mb-1">Logo ude (URL, valgfri)</label>
          <input {...register("logo_away")} className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white" />
        </div>
        <button
          type="submit"
          disabled={createLoading}
          className="w-full bg-primary hover:bg-indigo-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {createLoading ? "Opretter…" : "Opret kamp"}
        </button>
        {createMatch.isError && (
          <p className="text-red-500 text-sm mt-2">{String(createMatch.error)}</p>
        )}
      </form>
    </main>
  )
}
