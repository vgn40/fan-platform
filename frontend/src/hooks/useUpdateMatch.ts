// src/hooks/useUpdateMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type MatchUpdateInput = {
  home:       string;
  away:       string;
  date:       string; // Tilføjet dato for kamp 
  veo_id?:    string;
  logo_home?: string;
  logo_away?: string;
  id?:        string; // vi tilføjer id her eller i mutate-kaldet
};

export function useUpdateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MatchUpdateInput) => {
      const { id, ...payload } = data;
      const res = await fetch(
        `${import.meta.env.VITE_API}/matches/${id}`,
        {
          method:  "PUT",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Ukendt fejl ved opdatering af kamp");
      }
      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["match", variables.id] });
    },
  });
}
