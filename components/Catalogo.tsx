"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Servicio } from "@/lib/types";

const LINEAS = [
  { id: "todas", label: "Todas", icono: "✦" },
  { id: "Línea Inmersiva VR 360°", label: "Inmersiva VR 360°", icono: "🥽" },
  { id: "Línea Tradicional & Rituales Corporales", label: "Ritual & Gemas", icono: "🔥" },
  { id: "Línea Express & Cuidado Facial", label: "Facial & Criosferas", icono: "≋" }
];

const DETALLES: Record<string, { vivir: string[]; idealPara: string }> = {
  "Experiencia Relax Gold": {
    vivir: [
      "Desconexión Mental Inmersiva con VR 360° guiado para silenciar el estrés y la fatiga visual.",
      "Alivio Muscular Térmico con gemas volcánicas que sueltan la rigidez acumulada.",
      "Atmósfera Sensorial Completa: aromaterapia doTERRA, sonidos envolventes y bebida de bienvenida."
    ],
    idealPara: "Personas con altas cargas de trabajo, agotamiento acumulado o primera inmersión en Relax VR 360°."
  },
  "Experiencia Relax Gold Premium": {
    vivir: [
      "Tecnología Inmersiva a la Medida: entornos VR 360° adaptados para inducir calma profunda.",
      "Técnicas Corporales de Alta Intensidad: maniobras manuales y percusión para relajación muscular.",
      "Inmersión Sensorial Extendida con piedras volcánicas, aromaterapia doTERRA CPTG y sonidos."
    ],
    idealPara: "Ejecutivos, celebraciones en pareja, regalos de aniversario y quienes exigen la máxima experiencia."
  },
  "Experiencia Relax Ritual": {
    vivir: [
      "Alivio Corporal Focalizado: trabajo enfocado para soltar la rigidez de largas jornadas.",
      "Confort Térmico: calor envolvente y piedras volcánicas en áreas específicas.",
      "Atmósfera de Quietud: aceites puros doTERRA y sonidos para pausar la mente."
    ],
    idealPara: "Quienes necesitan una pausa rápida y efectiva para liberar cuello y espalda."
  },
  "Experiencia Relax Ritual Premium": {
    vivir: [
      "Restauración Integral de Pies a Cabeza: cobertura completa para sensación de ligereza total.",
      "Envolvimiento Térmico Profundo con gemas volcánicas que alivian la fatiga generalizada.",
      "Ritual Sensorial Integrado: aromaterapia doTERRA CPTG, sonidos y bebida de cortesía."
    ],
    idealPara: "Personas que buscan descanso total, desconexión completa y renovación de vitalidad."
  },
  "Experiencia Relax Facial": {
    vivir: [
      "Gimnasia y Masaje Facial: movimientos armónicos para soltar la rigidez del rostro.",
      "Estímulo Crio-Tonificante: esferas frías que descongestionan y refrescan la piel.",
      "Pausa Sensorial: aromas botánicos doTERRA y sonidos envolventes de quietud."
    ],
    idealPara: "Personas con fatiga visual, cansancio facial o sobrecarga muscular por estrés digital."
  }
};

export default function Catalogo() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .then(({ data }) => setServicios(data ?? []));
  }, []);

  const visibles = useMemo(
    () => (filtro === "todas" ? servicios : servicios.filter((s) => s.linea === filtro)),
    [servicios, filtro]
  );

  return (
    <section id="experiencias" className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <span className="gold-pill mb-3">Catálogo exclusivo de bienestar</span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold mb-4">
          Nuestras Experiencias de{" "}
          <span className="gold-text">Bienestar</span>
        </h2>
        <p className="font-body text-ink/80 text-base leading-relaxed">
          Protocolos diseñados con los más altos estándares de comodidad,
          aromaterapia botánica doTERRA y tecnología inmersiva VR 360°.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {LINEAS.map((l) => (
          <button
            key={l.id}
            onClick={() => setFiltro(l.id)}
            className={`rounded-full px-5 py-2.5 font-body text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 font-semibold ${
              filtro === l.id
                ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-[#12140D] shadow-md scale-[1.02]"
                : "border border-gold/30 bg-white text-ink/75 hover:bg-gold/10 hover:border-gold hover:text-ink"
            }`}
          >
            <span>{l.icono}</span>
            <span>{l.label}</span>
            {l.id === "todas" && servicios.length > 0 && (
              <span className="ml-1.5 text-[10px] opacity-75">({servicios.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Couple offer banner */}
      <div className="card-luxury p-6 mb-10 flex flex-wrap items-center justify-between gap-4 border-gold/30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl shrink-0">
            💑
          </div>
          <div>
            <p className="font-display font-bold text-base sm:text-lg text-ink">¿Vienes acompañado? Opción en Pareja / Dúo</p>
            <p className="font-body text-xs sm:text-sm text-ink/70">
              Celebra fechas especiales en cabina privada con{" "}
              <strong className="text-gold-dark font-bold">10% de descuento especial</strong> para dos personas.
            </p>
          </div>
        </div>
        <Link
          href="/reservar"
          className="btn-gold rounded-full px-6 py-3 text-sm font-bold whitespace-nowrap shadow-sm"
        >
          🎁 Agendar Cabina Dúo
        </Link>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {visibles.length === 0 && (
          <div className="py-16 text-center text-ink/50 font-body">
            <span className="text-3xl block mb-3">🌿</span>
            Cargando experiencias…
          </div>
        )}
        {visibles.map((s) => {
          const detalle = DETALLES[s.nombre];
          return (
            <div
              key={s.id}
              className="card-luxury p-7 sm:p-8 shadow-xl border-gold/30"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="gold-pill text-[10px] mb-2 inline-block">{s.linea}</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink font-bold">{s.nombre}</h3>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="gold-pill text-[11px] font-bold">⏱ {s.duracion_minutos} min</span>
                    <span className="font-body text-xs text-ink/60 font-medium">Individual o Pareja</span>
                  </div>
                </div>

                <p className="font-body text-ink/75 text-sm sm:text-base leading-relaxed mb-6">{s.descripcion}</p>

                {detalle && (
                  <>
                    {/* What you'll experience */}
                    <div className="mb-5">
                      <p className="font-body text-[11px] font-bold tracking-widest text-gold-darker uppercase mb-3">
                        ✦ Lo que vas a vivir
                      </p>
                      <ul className="space-y-2">
                        {detalle.vivir.map((v) => (
                          <li key={v} className="font-body text-sm text-ink/80 flex gap-3 items-start">
                            <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/35 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] text-gold-dark font-bold">✓</span>
                            </span>
                            <span className="leading-relaxed">{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal for */}
                    <div className="rounded-2xl border border-gold/25 bg-sand/40 px-5 py-3.5 mb-6">
                      <p className="font-body text-[11px] font-bold tracking-wider text-gold-darker uppercase mb-1">
                        Ideal para:
                      </p>
                      <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed">{detalle.idealPara}</p>
                    </div>
                  </>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/reservar"
                    className="btn-gold rounded-full px-6 py-3.5 font-body text-sm text-center font-bold flex-1 shadow-md"
                  >
                    Agendar Experiencia · {s.duracion_minutos} min
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("abrir-chatbot-precios"))}
                    className="btn-luxury rounded-full px-6 py-3.5 font-body text-sm text-center font-bold"
                  >
                    💬 Consultar precios
                  </button>
                </div>
              </div>

              {/* Bottom gold accent */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-6" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
