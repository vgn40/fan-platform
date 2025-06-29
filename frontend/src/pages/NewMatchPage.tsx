// frontend/src/pages/NewMatchPage.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateMatch } from "../hooks/useCreateMatch";
// ⚠️ “import type” so TS knows this is erased at runtime
import type { MatchInput } from "../hooks/useCreateMatch";

export default function NewMatchPage() {
  const navigate = useNavigate();
  const createMatch = useCreateMatch();

  // include “date” in our form type:
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MatchInput>();

  async function onSubmit(data: MatchInput) {
    // data.date will be like "2025-06-29T14:30"
    createMatch.mutate(data, {
      onSuccess() {
        navigate("/matches");
      },
    });
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <Link to="/matches" className="text-[var(--color-primary)] hover:underline">
        ← Tilbage til oversigt
      </Link>

      <h1 className="text-2xl font-bold">Opret ny kamp</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-zinc-800 p-6 rounded-xl shadow"
      >
        {/* ─── Dato & tid ─── */}
        <div>
          <label className="block mb-1">Dato og tid *</label>
          <input
            type="datetime-local"
            {...register("date", { required: "Dato og tid er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.date && (
            <p className="text-red-400 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* ─── Hjemmehold ─── */}
        <div>
          <label className="block mb-1">Hjemmehold *</label>
          <input
            {...register("home", { required: "Hjemmehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.home && (
            <p className="text-red-400 text-sm">{errors.home.message}</p>
          )}
        </div>

        {/* ─── Udehold ─── */}
        <div>
          <label className="block mb-1">Udehold *</label>
          <input
            {...register("away", { required: "Udehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.away && (
            <p className="text-red-400 text-sm">{errors.away.message}</p>
          )}
        </div>

        {/* ─── Veo-ID ─── */}
        <div>
          <label className="block mb-1">Veo-ID (valgfri)</label>
          <input
            {...register("veo_id", {
              pattern: { value: /^\d*$/, message: "Veo-ID skal være tal" },
            })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
          {errors.veo_id && (
            <p className="text-red-400 text-sm">{errors.veo_id.message}</p>
          )}
        </div>

        {/* ─── Logo hjemme ─── */}
        <div>
          <label className="block mb-1">Logo hjemme (URL, valgfri)</label>
          <input
            {...register("logo_home")}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
        </div>

        {/* ─── Logo ude ─── */}
        <div>
          <label className="block mb-1">Logo ude (URL, valgfri)</label>
          <input
            {...register("logo_away")}
            className="w-full rounded-md bg-zinc-900 px-3 py-2 text-white"
          />
        </div>

        {/* ─── Submit ─── */}
        <button
          type="submit"
          disabled={isSubmitting || createMatch.isPending}
          className="w-full bg-[var(--color-primary)] hover:bg-indigo-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting || createMatch.isPending ? "Opretter…" : "Opret kamp"}
        </button>

        {createMatch.isError && (
          <p className="text-red-500 text-sm mt-2">
            {String(createMatch.error)}
          </p>
        )}
      </form>
    </main>
  );
}
