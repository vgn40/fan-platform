import { useMatches } from "./hooks/useMatches";

export default function App() {
  const { data: matches, loading, error } = useMatches();

  if (loading) return <p style={{ padding: "2rem" }}>Henter kampe …</p>;
  if (error)   return <p style={{ padding: "2rem" }}>Fejl: {`${error}`}</p>;

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kampe</h1>
      {matches.map(m => (
        <p key={m.id}>
          {m.home} vs {m.away}
        </p>
      ))}
    </main>
  );
}
