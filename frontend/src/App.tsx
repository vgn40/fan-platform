import { useEffect, useState } from "react";

type Match = {
  id: number;
  home: string;
  away: string;
  veo_id?: string | null;
};

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then(r => r.json())
      .then(setMatches)
      .catch(console.error);
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kampe</h1>

      {matches.length === 0 ? (
        <p>Henter kampe …</p>
      ) : (
        matches.map(m => (
          <p key={m.id}>
            {m.home} vs {m.away}
          </p>
        ))
      )}
    </main>
  );
}
