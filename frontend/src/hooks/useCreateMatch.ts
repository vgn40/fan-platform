import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Match, MatchInput } from "../types"

export function useCreateMatch() {
  const qc = useQueryClient()
  return useMutation<Match, Error, MatchInput>({
    mutationFn: (input) =>
      fetch(`${import.meta.env.VITE_API}/matches`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(input),
      }).then((r) => {
        if (!r.ok) throw new Error("Fejl ved oprettelse")
        return r.json() as Promise<Match>
      }),
    onSuccess: () => {
      qc.invalidateQueries(["matches"])
    },
  })
}
