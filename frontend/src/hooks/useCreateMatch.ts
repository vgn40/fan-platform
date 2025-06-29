// frontend/src/hooks/useCreateMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type MatchInput = {
  date:       string;           // ← new!
  home:       string;
  away:       string;
  veo_id?:    string;
  logo_home?: string;
  logo_away?: string;
};

export function useCreateMatch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: MatchInput) => {
      const res = await fetch(
        `${import.meta.env.VITE_API}/matches`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Ukendt fejl ved oprettelse af kamp");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}
