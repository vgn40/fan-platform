// frontend/src/hooks/useUpdateMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Match, MatchUpdateInput } from "../types"

export function useUpdateMatch() {
  const qc = useQueryClient()
  return useMutation<Match, Error, MatchUpdateInput>({
    mutationFn: async (data) => {
      const { id, ...body } = data
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      })
      if (!res.ok) throw new Error(await res.text())
      return res.json() as Promise<Match>
    },
    onSuccess: (_match, vars) => {
      qc.invalidateQueries({ queryKey: ["matches"] })
      qc.invalidateQueries({ queryKey: ["match", String(vars.id)] })
    },
  })
}
