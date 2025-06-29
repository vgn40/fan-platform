import { useInfiniteQuery } from "@tanstack/react-query"

export const PAGE_SIZE = 20

// 🚨 Her eksporterer vi typen, så MatchesPage kan importere den
export type Match = {
  id:         number
  home:       string
  away:       string
  date:       string        // ISO‐timestamp fra backend
  veo_id?:    string | null
  logo_home?: string | null
  logo_away?: string | null
}

export function useMatchesInfinite(opts: { status: "upcoming" | "past" }) {
  return useInfiniteQuery<Match[], Error>({
    queryKey: ["matches", opts.status],
    queryFn: async ({ pageParam = 0 }) => {
      const now = new Date().toISOString()
      const url =
        `${import.meta.env.VITE_API}/matches` +
        `?skip=${pageParam}&limit=${PAGE_SIZE}` +
        (opts.status === "upcoming" ? `&after=${now}` : `&before=${now}`)
      console.log("fetching matches:", url)
      const res = await fetch(url)
      if (!res.ok) throw new Error("Kunne ikke hente kampe")
      return res.json() as Promise<Match[]>
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  })
}
