"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CitaConServicio = {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  servicios: { nombre: string } | null;
};

export default function MisCitasBuscador() {
  const [telefono, setTelefono] = useState("");
  const [citas, setCitas] = useState<CitaConServicio[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [busco, setBusco] = useState(false);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    setBuscando(true);
    setBusco(true);

    const { data } = await supabase
      .from("citas")
      .select("id, fecha, hora, estado, servicios(nombre)")
      .eq("cliente_telefono", telefono.trim())
      .order("fecha", { ascending: true });

    setCitas((data as any) ?? []);
    setBuscando(false);
  }

  async function cancelar(id: string) {
    const ok = confirm("¿Seguro que deseas cancelar esta reserva de bienestar?");
    if (!ok) return;

    await supabase.from("citas").update({ estado: "cancelada" }).eq("id", id);
    setCitas((prev) => prev.map((c) => (c.id === id ? { ...c, estado: "cancelada" } : c)));
  }

  return (
    <div className="card-luxury p-8 sm:p-10 bg-white/95 backdrop-blur-md shadow-2xl border-gold/30">
      <div className="pb-4 mb-6 border-b border-gold/15">
        <h3 className="font-display text-2xl font-bold text-ink mb-1">Consulta tus citas agendadas</h3>
        <p className="font-body text-xs sm:text-sm text-ink/60">Ingresa tu número de WhatsApp para ver el historial y estado de tus sesiones.</p>
      </div>

      <form onSubmit={buscar} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Tu número de WhatsApp (ej: 3001234567)"
          className="flex-1 rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-sm"
          required
        />
        <button
          type="submit"
          disabled={buscando}
          className="btn-gold px-8 py-3 font-bold text-sm shadow-md whitespace-nowrap disabled:opacity-50"
        >
          {buscando ? "Consultando…" : "🔍 Buscar Citas"}
        </button>
      </form>

      {busco && !buscando && citas.length === 0 && (
        <div className="p-6 rounded-2xl bg-sand/40 border border-gold/20 text-center text-ink/65 font-body text-sm">
          🌿 No encontramos citas registradas con ese número de WhatsApp.
        </div>
      )}

      <ul className="space-y-4">
        {citas.map((c) => {
          const esCancelada = c.estado === "cancelada";
          return (
            <li
              key={c.id}
              className={`border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                esCancelada
                  ? "bg-stone-50 border-stone-200 opacity-60"
                  : "bg-white border-gold/30 shadow-md hover:border-gold"
              }`}
            >
              <div className="font-body space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-base text-ink">
                    {c.servicios?.nombre ?? "Experiencia de Bienestar"}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      esCancelada
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {c.estado}
                  </span>
                </div>
                <p className="text-xs text-ink/60">
                  📅 Fecha: <strong>{c.fecha}</strong> · ⏰ Hora: <strong>{c.hora}</strong>
                </p>
              </div>

              {!esCancelada && (
                <button
                  onClick={() => cancelar(c.id)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline self-start sm:self-auto transition-colors"
                >
                  Cancelar cita
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
