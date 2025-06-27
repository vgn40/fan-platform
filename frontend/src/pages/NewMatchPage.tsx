import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface MatchForm {
  home: string;
  away: string;
  veo_id?: string;
}

export default function NewMatchPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MatchForm>();

  const navigate = useNavigate();

  async function onSubmit(data: MatchForm) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      navigate("/matches"); // tilbage til oversigten
    } catch (err) {
      alert(`Kunne ikke gemme: ${err}`);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Opret ny kamp</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hjemmehold */}
        <div>
          <label className="block font-medium">Hjemmehold</label>
          <input
            className="w-full border rounded p-2"
            {...register("home", { required: "Påkrævet" })}
          />
          {errors.home && (
            <p className="text-red-600 text-sm">{errors.home.message}</p>
          )}
        </div>

        {/* Udehold */}
        <div>
          <label className="block font-medium">Udehold</label>
          <input
            className="w-full border rounded p-2"
            {...register("away", { required: "Påkrævet" })}
          />
          {errors.away && (
            <p className="text-red-600 text-sm">{errors.away.message}</p>
          )}
        </div>

        {/* Veo-ID */}
        <div>
          <label className="block font-medium">Veo-ID (valgfrit)</label>
          <input
            className="w-full border rounded p-2"
            {...register("veo_id")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Gemmer…" : "Gem"}
        </button>
      </form>
    </div>
  );
}
