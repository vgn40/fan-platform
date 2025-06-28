import { useInfiniteQuery } from "@tanstack/react-query";

export const PAGE_SIZE = 20;

export type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

export function useMatchesInfinite() {
  return useInfiniteQuery<Match[], Error>({
    queryKey: ["matches"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(
        `${import.meta.env.VITE_API}/matches?skip=${pageParam}&limit=${PAGE_SIZE}`
      ).then((r) => {
        if (!r.ok) throw new Error("Kunne ikke hente kampe");
        return r.json() as Promise<Match[]>;
      }),
    getNextPageParam: (last, all) =>
      last.length === PAGE_SIZE ? all.length * PAGE_SIZE : undefined,
  });
}
