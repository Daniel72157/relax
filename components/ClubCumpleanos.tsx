"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PalmLeaf from "./PalmLeaf";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function ClubCumpleanos() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nombre || !telefono || !dia || !mes) {
      setError("Completa nombre, WhatsApp, día y mes de cumpleaños.");
      return;
    }

    setEnviando(true);
    const { error: insertError } = await supabase.from("suscriptores_cumpleanos").insert({
      nombre,
      telefono,
      email: email || null,
      dia_nacimiento: Number(dia),
      mes_nacimiento: Number(mes)
    });
    setEnviando(false);

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? "Ese número de WhatsApp ya está registrado en el Club de Cumpleaños."
          : "No pudimos registrar tu cumpleaños. Intenta de nuevo."
      );
      return;
    }
    setEnviado(true);
  }

  return (
    <section id="cumpleanos" className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-sand to-white border-y border-gold/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <PalmLeaf
        variant="single"
        className="pointer-events-none absolute -top-8 right-8 h-56 w-28 text-gold/20 rotate-[15deg] hidden md:block"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="gold-pill mb-3">🎂 Club Preferencial VIP</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
          Celebra tu cumpleaños con <span className="gold-text">15% OFF</span>
        </h2>
        <p className="font-body text-ink/70 max-w-prose mx-auto mb-10 text-base leading-relaxed">
          Regístrate gratis en nuestro club y recibe tu obsequio exclusivo: <strong>15% de descuento</strong> válido durante todo el mes de tu natalicio en cualquiera de nuestras experiencias.
        </p>

        {enviado ? (
          <div className="card-luxury p-10 bg-white/95 backdrop-blur-md shadow-2xl border-gold/40 relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="text-4xl mb-3 block">🎉</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-2">¡Felicitaciones, {nombre}!</h3>
            <p className="font-body text-ink/70 leading-relaxed max-w-md mx-auto text-sm">
              Hemos registrado tu fecha especial en nuestro sistema. Cuando comience tu mes de cumpleaños, recibirás tu código de cortesía por WhatsApp para redimirlo en sede.
            </p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="card-luxury text-left bg-white/95 backdrop-blur-md p-8 sm:p-10 space-y-4 shadow-2xl border-gold/30">
            <div className="flex items-center gap-2 pb-2 border-b border-gold/15">
              <span className="text-xl">🎁</span>
              <p className="font-display text-base font-bold text-ink">Inscripción rápida sin costo</p>
            </div>

            <div>
              <label htmlFor="club-nombre" className="block text-xs font-semibold text-ink/75 font-body mb-1">
                Nombre completo *
              </label>
              <input
                id="club-nombre"
                placeholder="Tu nombre y apellido"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label htmlFor="club-telefono" className="block text-xs font-semibold text-ink/75 font-body mb-1">
                WhatsApp (para enviarte tu bono oficial) *
              </label>
              <input
                id="club-telefono"
                placeholder="Ej: 3001234567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label htmlFor="club-email" className="block text-xs font-semibold text-ink/75 font-body mb-1">
                Correo electrónico (opcional)
              </label>
              <input
                id="club-email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="club-dia" className="block text-xs font-semibold text-ink/75 font-body mb-1">
                  Día *
                </label>
                <select
                  id="club-dia"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                >
                  <option value="">Selecciona el día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="club-mes" className="block text-xs font-semibold text-ink/75 font-body mb-1">
                  Mes de Cumpleaños *
                </label>
                <select
                  id="club-mes"
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
                  required
                >
                  <option value="">Selecciona el mes</option>
                  {MESES.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-body">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full btn-gold py-4 text-center block text-sm font-bold shadow-xl tracking-wide disabled:opacity-50"
            >
              {enviando ? "Registrando en Club VIP…" : "✨ Obtener Mi 15% OFF de Cumpleaños"}
            </button>

            <p className="text-[11px] text-ink/50 font-body text-center pt-1">
              🔒 Válido durante todo el mes de tu cumpleaños en la sede Los Laureles, Montería.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
