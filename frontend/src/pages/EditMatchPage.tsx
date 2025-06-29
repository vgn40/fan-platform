// frontend/src/pages/EditMatchPage.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useUpdateMatch } from "../hooks/useUpdateMatch";
import type { MatchUpdateInput } from "../hooks/useUpdateMatch";

type Match = {
  id: number;
  home: string;
  home: string;
  away: string;
  date: string;
  veo_id?: string | null;
  logo_home?: string | null;
  logo_away?: string | null;
};

export default function EditMatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateMutation = useUpdateMatch();

  const {
    data: match,
    isLoading: isLoadingMatch,
    isError: isErrorMatch,
    error: errorMatch,
  } = useQuery<Match, Error>({
    queryKey: ["match", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    enabled: Boolean(id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MatchUpdateInput>({
    defaultValues: {
      home: "",
      away: "",
      date: "",
      veo_id: "",
      logo_home: "",
      logo_away: "",
    },
  });

  useEffect(() => {
    if (match) {
      reset({
        home: match.home,
        away: match.away,
        date: match.date,
        veo_id: match.veo_id ?? "",
        logo_home: match.logo_home ?? "",
        logo_away: match.logo_away ?? "",
      });
    }
  }, [match, reset]);

  const onSubmit = (data: MatchUpdateInput) => {
    updateMutation.mutate(
      { ...data, id: match!.id.toString() },
      { onSuccess: () => navigate(`/matches/${match!.id}`) }
    );
  };

  if (isLoadingMatch) {
    return <p className="p-6 text-center">Henter kamp…</p>;
  }
  if (isErrorMatch) {
    return (
      <p className="p-6 text-center text-red-600">
        {errorMatch?.message}
      </p>
    );
  }
  if (!match) {
    return <p className="p-6 text-center text-red-600">Kamp ikke fundet</p>;
  }

  return (
    <main className="mx-auto max-w-md p-6 space-y-6">
      <Link to={`/matches/${match.id}`} className="text-primary hover:underline">
        ← Tilbage til kamp
      </Link>
      <h1 className="text-2xl font-bold">Redigér kamp</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-zinc-800 p-6 rounded-xl shadow"
      >
        {/* Dato og tid */}
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

        {/* Hjemmehold */}
        <div>
          <label className="block mb-1">Hjemmehold *</label>
          <input
            {...register("home", { required: "Hjemmehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.home && (
            <p className="text-red-400 text-sm">{errors.home.message}</p>
          )}
        </div>

        {/* Udehold */}
        <div>
          <label className="block mb-1">Udehold *</label>
          <input
            {...register("away", { required: "Udehold er påkrævet" })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.away && (
            <p className="text-red-400 text-sm">{errors.away.message}</p>
          )}
        </div>

        {/* Veo-ID */}
        <div>
          <label className="block mb-1">Veo-ID (valgfri)</label>
          <input
            {...register("veo_id", {
              pattern: { value: /^\d*$/, message: "Skal være tal" },
            })}
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.veo_id && (
            <p className="text-red-400 text-sm">{errors.veo_id.message}</p>
          )}
        </div>

        {/* Logo hjemme */}
        <div>
          <label className="block mb-1">Logo hjemme (URL, valgfri)</label>
          <input
            {...register("logo_home")}
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
        </div>

        {/* Logo ude */}
        <div>
          <label className="block mb-1">Logo ude (URL, valgfri)</label>
          <input
            {...register("logo_away")}
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || updateMutation.isLoading}
          className="w-full bg-primary hover:bg-indigo-600 text-white py-2 rounded-md disabled:opacity-50"
        >
          {isSubmitting || updateMutation.isLoading
            ? "Gemmer…"
            : "Gem ændringer"}
        </button>

        {updateMutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            {String(updateMutation.error)}
          </p>
        )}
      </form>
    </main>
  );
}
