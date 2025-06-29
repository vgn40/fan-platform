// frontend/src/hooks/useMatches.ts
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"
import type { Match } from "../types"

export const PAGE_SIZE = 20

export function useMatchesInfinite(opts: { status: "upcoming" | "past" }) {
  return useInfiniteQuery<
    Match[],                 // TQueryFnData
    Error,                   // TError
    InfiniteData<Match[]>,   // TData
    [string, "upcoming" | "past"] // TQueryKey
  >({
    queryKey: ["matches", opts.status] as const,
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined,
  })
}
