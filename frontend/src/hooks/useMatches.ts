import { useEffect, useState } from "react";

export interface Match {
  id: number;
  home: string;
  away: string;
  veo_id: string | null;
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then(r => r.json())
      .then(setMatches)
      .catch(console.error);
  }, []);

  return matches;
}
