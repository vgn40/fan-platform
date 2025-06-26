import { useEffect, useState } from "react";
import axios from "axios";

export type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

export function useMatches() {
  const [data, setData]   = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    axios
      .get<Match[]>("http://127.0.0.1:8000/matches")
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
