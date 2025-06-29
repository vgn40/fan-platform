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
  away: string;
  date: string;
  veo_id?: string | null;
  logo_home?: string | null;
  logo_away?: string | null;
};

export default function EditMatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 1) Hent eksisterende kamp
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
  });

  // 2) Setup react-hook-form med typen fra hook’en
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

  // Når vi har hentet ‘match’, fyld formen
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

  // 3) Hook til at opdatere
  const updateMutation = useUpdateMatch();

  // Loading / error states
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

  // Submit-handler
  const onSubmit = (data: MatchUpdateInput) => {
    updateMutation.mutate(
      { ...data, id:
