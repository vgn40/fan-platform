import { useInfiniteQuery } from "@tanstack/react-query";

export const PAGE_SIZE = 20;

export type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

export function useMatches() {
  return useInfiniteQuery<Match[], Error>({
    queryKey: ["matches"],
    queryFn: ({ pageParam = 0 }) =>
      fetch(
        `${import.meta.env.VITE_API}/matches?skip=${pageParam}&limit=${PAGE_SIZE}`
      ).then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json() as Promise<Match[]>;
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  });
}
