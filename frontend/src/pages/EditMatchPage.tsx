// src/pages/EditMatchPage.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface MatchForm {
  home: string;
  away: string;
  veo_id?: string;
}

export default function EditMatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MatchForm>();

  // hent eksisterende data
  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`);
      if (res.ok) {
        const data = await res.json();
        setValue("home", data.home);
        setValue("away", data.away);
        setValue("veo_id", data.veo_id || "");
      }
    })();
  }, [id, setValue]);

  async function onSubmit(data: MatchForm) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      navigate(`/matches/${id}`); // tilbage til detaljeside
    } catch (err) {
      alert(`Kunne ikke gemme: ${err}`);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Redigér kamp</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
