// src/pages/NewMatchPage.tsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type Inputs = { home: string; away: string; veo_id?: string };

export default function NewMatchPage() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const navigate = useNavigate();

  async function onSubmit(data: Inputs) {
    await fetch(import.meta.env.VITE_API + "/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
    navigate("/");          // tilbage til forsiden
  }

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 480 }}>
      <Link to="/">← Tilbage</Link>
      <h1>Ny kamp</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input placeholder="Hjemmehold" {...register("home", { required: true })} />
        <input placeholder="Udehold"   {...register("away", { required: true })} />
        <input placeholder="Veo-ID (valgfri)" {...register("veo_id")} />
        <button type="submit">Gem kamp</button>
      </form>
    </main>
  );
}

