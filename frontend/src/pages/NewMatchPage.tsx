// -----------------------------------------------------------------------------
//  NewMatchPage.tsx
//  Opret ny kamp – med react-hook-form validering
// -----------------------------------------------------------------------------
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type Inputs = {
  home: string;
  away: string;
  veo_id?: string;
};

export default function NewMatchPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<Inputs>();

  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  //  Submit handler
  // ---------------------------------------------------------------------------
  async function onSubmit(data: Inputs) {
    try {
      await fetch(`${import.meta.env.VITE_API}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
      navigate("/matches");
    } catch (err) {
      alert(`Kunne ikke gemme: ${err}`);
    }
  }

  // Bruges til “home ≠ away” validering
  const homeValue = watch("home");

  // ---------------------------------------------------------------------------
  //  Render
  // ---------------------------------------------------------------------------
  return (
    <main className="mx-auto max-w-md p-6 space-y-8">
      <Link to="/matches" className="text-blue-400 hover:underline">
        ← Tilbage
      </Link>

      <h1 className="text-3xl font-bold">Opret ny kamp</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-zinc-800 rounded-xl p-6 shadow"
      >
        {/* HOME -------------------------------------------------------------- */}
        <div className="space-y-2">
          <label className="block font-medium">Hjemmehold *</label>
          <input
            {...register("home", {
              required: "Hjemmehold er påkrævet",
              validate: (v) =>
                v !== watch("away") || "Hjemme- og udehold må ikke være ens",
            })}
            placeholder="B52 Aalborg"
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.home && (
            <p className="text-sm text-red-400">{errors.home.message}</p>
          )}
        </div>

        {/* AWAY -------------------------------------------------------------- */}
        <div className="space-y-2">
          <label className="block font-medium">Udehold *</label>
          <input
            {...register("away", {
              required: "Udehold er påkrævet",
              validate: (v) =>
                v !== homeValue || "Hjemme- og udehold må ikke være ens",
            })}
            placeholder="AC Pandas"
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.away && (
            <p className="text-sm text-red-400">{errors.away.message}</p>
          )}
        </div>

        {/* VEO ID ------------------------------------------------------------ */}
        <div className="space-y-2">
          <label className="block font-medium">Veo-ID (valgfri)</label>
          <input
            {...register("veo_id", {
              pattern: {
                value: /^\d*$/,
                message: "Veo-ID skal være et tal",
              },
            })}
            placeholder="fx 37453"
            className="w-full rounded-md bg-zinc-900 px-3 py-2"
          />
          {errors.veo_id && (
            <p className="text-sm text-red-400">{errors.veo_id.message}</p>
          )}
        </div>

        {/* SUBMIT ------------------------------------------------------------ */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white shadow hover:bg-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Gemmer…" : "Gem kamp"}
        </button>
      </form>
    </main>
  );
}
