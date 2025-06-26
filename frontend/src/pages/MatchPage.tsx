import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Match } from "../hooks/useMatches";

export default function MatchPage() {
  const { id } = useParams();                // ← "1" fra /match/1
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/matches/${id}`)
      .then(r => r.json())
      .then(setMatch)
      .catch(console.error);
  }, [id]);

  if (!match) return <p style={{ padding: "2rem" }}>Indlæser …</p>;

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <Link to="/">← Tilbage</Link>
      <h1>{match.home} vs {match.away}</h1>

      {match.veo_id ? (
        <iframe
          title="VEO-video"
          src={`https://app.veo.co/embed/${match.veo_id}`}
          width="100%"
          height="480"
          allowFullScreen
          style={{ border: 0, marginTop: "1rem" }}
        />
      ) : (
        <p>Ingen video endnu.</p>
      )}
    </main>
  );
}
