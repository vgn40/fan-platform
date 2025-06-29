// frontend/src/hooks/useDeleteMatch.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteMatch() {
  const qc = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error(await res.text())
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["matches"] })
    },
  })
}
