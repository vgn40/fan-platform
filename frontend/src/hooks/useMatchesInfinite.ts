import { useInfiniteQuery } from "@tanstack/react-query";

export const PAGE_SIZE = 20;

export type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

/**
 * Henter kampe pagineret med skip/limit.
 *  – Sørger selv for at beregne næste side-parameter.
 */
export function useMatchesInfinite() {
  return useInfiniteQuery<Match[], Error>({
    queryKey: ["matchesInfinite"],
    /**
     * pageParam er start-offset (skip). Default = 0 på første kald.
     */
    queryFn: ({ pageParam = 0 }) =>
      fetch(
        `${import.meta.env.VITE_API}/matches?skip=${pageParam}&limit=${PAGE_SIZE}`
      ).then((r) => {
        if (!r.ok) throw new Error("Kunne ikke hente kampe");
        return r.json() as Promise<Match[]>;
      }),

    /** 
     * Hvis sidste page er fuld (= PAGE_SIZE), så findes der (formentlig)
     * flere – næste side starter ved (antal allerede hentede).
     * Returnerer undefined hvis vi er færdige => hasNextPage === false.
     */
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  });
}
