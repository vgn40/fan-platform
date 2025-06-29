// frontend/src/hooks/useCreateMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Match, MatchInput } from "../types"

export function useCreateMatch() {
  const qc = useQueryClient()
  return useMutation<Match, Error, MatchInput>({
    mutationFn: async (data) => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error(await res.text())
      return res.json() as Promise<Match>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] })
    },
  })
}
