// src/types.ts
export type Match = {
  id:      number
  home:    string
  away:    string
  date:    string   // ISO timestamp
  veo_id?: string | null
  logo_home?: string | null
  logo_away?: string | null
}

export type MatchInput = {
  home:    string
  away:    string
  date:    string
  veo_id?: string
  logo_home?: string
  logo_away?: string
}

  
  // Hvis du skal opdatere en kamp
  export type MatchUpdateInput = Partial<MatchInput> & { id: number }
  