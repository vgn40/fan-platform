// frontend/src/hooks/useMatchesInfinite.ts
import { useInfiniteQuery } from "@tanstack/react-query"
import type { Match } from "../types"

export const PAGE_SIZE = 20

export function useMatchesInfinite(opts: { status: "upcoming" | "past" }) {
  return useInfiniteQuery<Match[], Error, Match[], [string, string]>({
    queryKey: ["matches", opts.status],
    queryFn: async ({ pageParam = 0 }) => {
      const now  = new Date().toISOString()
      const base = `${import.meta.env.VITE_API}/matches`
      const params =
        `?skip=${pageParam}&limit=${PAGE_SIZE}` +
        (opts.status === "upcoming" ? `&after=${now}` : `&before=${now}`)

      const res = await fetch(base + params)
      if (!res.ok) throw new Error("Kunne ikke hente kampe")
      return (await res.json()) as Match[]
    },
    initialPageParam: 0,    // ← påkrævet i v5
    getNextPageParam: (lastPage, pages) =>
      lastPage.length === PAGE_SIZE
        ? pages.length * PAGE_SIZE
        : undefined,
  })
}
