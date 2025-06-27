import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdatePayload {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
}

export function useUpdateMatch() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdatePayload) => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      // opdatér både liste- og detail-cache
      qc.invalidateQueries({ queryKey: ["matches"] });
    },
  });
}
