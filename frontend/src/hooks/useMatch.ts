// frontend/src/hooks/useMatch.ts
import { useQuery } from "@tanstack/react-query";

export function useMatch(id: string | number) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`);
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()) as {
        id: number;
        home: string;
        away: string;
        veo_id?: string | null;
      };
    },
  });
}
