import { useQuery } from "@tanstack/react-query"

export type Match = {
  id:         number
  home:       string
  away:       string
  date:      string
  veo_id?:    string | null
  logo_home?: string | null
  logo_away?: string | null
}

export function useMatch(id: number | string) {
  return useQuery<Match, Error>({
    queryKey:   ["match", id],
    queryFn:    async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`)
      if (!res.ok) throw new Error("Kunne ikke hente kampen")
      return res.json() as Promise<Match>
    },
    enabled: !!id,
  })
}
