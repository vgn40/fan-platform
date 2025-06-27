// frontend/src/hooks/useDeleteMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Match } from "./useMatches";

export function useDeleteMatch() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error(await res.text());
      return id;
    },

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["matches"] });
      const prev = qc.getQueryData<Match[]>(["matches"]);
      if (prev) {
        qc.setQueryData<Match[]>(["matches"], prev.filter((m) => m.id !== id));
      }
      return { prev };
    },

    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(["matches"], ctx.prev);
      alert("Sletning mislykkedes!");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["matches"] });
    }
  });
}
