// src/hooks/useMatchesInfinite.ts
import { useInfiniteQuery } from "@tanstack/react-query"
import type { Match } from "../types"

export const PAGE_SIZE = 20

export function useMatchesInfinite(opts: { status: "upcoming" | "past" }) {
  return useInfiniteQuery<Match[], Error, Match[], [string, string]>({
    // Det her er queryKey’en
    queryKey: ["matches", opts.status],

    // Sådan henter vi data (pageParam starter på 0)
    queryFn: async ({ pageParam = 0 }) => {
      const now  = new Date().toISOString()
      const base = `${import.meta.env.VITE_API}/matches`
      const params =
        `?skip=${pageParam}&limit=${PAGE_SIZE}` +
        (opts.status === "upcoming" ? `&after=${now}` : `&before=${now}`)

      const res = await fetch(base + params)
      if (!res.ok) throw new Error("Kunne ikke hente kampe")
      return res.json() as Promise<Match[]>
    },

    // V5 kræver at vi sætter en initialPageParam
    initialPageParam: 0,

    // Skal vi hente næste side? (hvis sidste side var fuld, udregn skip)
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  })
}
