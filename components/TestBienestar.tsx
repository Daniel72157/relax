"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { Servicio } from "@/lib/types";

const MOTIVOS = [
  {
    id: "tension",
    icono: "💆‍♂️",
    titulo: "Tensión muscular en cuello, hombros o espalda",
    texto: "Sobrecarga física acumulada, contracturas posturales por trabajo continuo o rigidez en trapecios.",
    recomendacion: "Experiencia Relax Ritual",
    porque: "Un trabajo focalizado con calor térmico y gemas volcánicas en las zonas de mayor tensión muscular para un alivio restaurador."
  },
  {
    id: "fatiga",
    icono: "🧠",
    titulo: "Fatiga mental, sobrecarga laboral y falta de foco",
    texto: "Saturación por pantallas, agotamiento cognitivo y necesidad urgente de silenciar el ruido mental.",
    recomendacion: "Experiencia Relax Gold",
    porque: "Inmersión guiada en Realidad Virtual 360° con gemas térmicas para silenciar el estrés y recuperar el balance mental."
  },
  {
    id: "insomnio",
    icono: "🌙",
    titulo: "Dificultad para desconectar, insomnio o sueño inquieto",
    texto: "Nerviosismo constante, cuerpo cargado y necesidad de una relajación prolongada e inmersiva de máxima exclusividad.",
    recomendacion: "Experiencia Relax Gold Premium",
    porque: "Desconexión profunda con técnicas de percusión, VR 360° personalizada y una atmósfera sensorial extendida de 60 minutos."
  },
  {
    id: "reflexion",
    icono: "🌿",
    titulo: "Deseo de autorreflexión, pausa zen y renovación total",
    texto: "Búsqueda de renovación integral de pies a cabeza en un entorno aromático botánico con aceites doTERRA.",
    recomendacion: "Experiencia Relax Ritual Premium",
    porque: "Un recorrido envolvente de pies a cabeza con cobertura total para restaurar tu vitalidad sin prisas ni interrupciones."
  }
];

export default function TestBienestar() {
  const [seleccion, setSeleccion] = useState<typeof MOTIVOS[number] | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .then(({ data }) => setServicios(data ?? []));
  }, []);

  const servicioMatch = seleccion
    ? servicios.find((s) => s.nombre.toLowerCase().includes(seleccion.recomendacion.toLowerCase()) || seleccion.recomendacion.toLowerCase().includes(s.nombre.toLowerCase()))
    : null;

  return (
    <section id="test-bienestar" className="relative overflow-hidden py-24 bg-sand border-y border-gold/20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="gold-pill mb-3">✨ Diagnóstico Personalizado</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
            Descubre tu <span className="gold-text">experiencia ideal</span>
          </h2>
          <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed">
            Identifica el estado de tu cuerpo y mente hoy. Nuestro test sensorial te recomendará el ritual exacto para tu bienestar.
          </p>
        </div>

        {!seleccion ? (
          <div className="card-luxury p-8 sm:p-10 bg-white/90 backdrop-blur-md shadow-2xl border-gold/30">
            <p className="font-display text-xl text-ink font-bold mb-6 text-center">
              ¿Cuál es tu principal sensación o necesidad hoy?
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {MOTIVOS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSeleccion(m)}
                  className="group text-left rounded-2xl border border-gold/25 bg-sand/20 hover:bg-gold/10 hover:border-gold p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {m.icono}
                    </div>
                    <p className="font-display font-bold text-base sm:text-lg text-ink mb-2 group-hover:text-gold-dark transition-colors">
                      {m.titulo}
                    </p>
                    <p className="font-body text-xs sm:text-sm text-ink/65 leading-relaxed">
                      {m.texto}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold-dark font-body">Ver diagnóstico</span>
                    <span className="text-xs text-gold font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-luxury p-8 sm:p-12 text-center bg-white/95 backdrop-blur-md shadow-2xl border-gold/40 relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <span className="gold-pill mb-4 shadow-sm">
              ✨ Recomendación Sensorial Personalizada
            </span>

            <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-3xl mx-auto mb-4">
              {seleccion.icono}
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-ink font-bold mb-3">
              {seleccion.recomendacion}
            </h3>

            {servicioMatch && (
              <div className="inline-flex items-center gap-2.5 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full mb-6 text-xs font-body text-gold-dark font-bold">
                <span>⏱ Duración recomendada: {servicioMatch.duracion_minutos} minutos</span>
                <span>•</span>
                <span>{servicioMatch.linea}</span>
              </div>
            )}

            <p className="font-body text-ink/75 mb-8 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              {seleccion.porque}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/reservar"
                className="btn-gold px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg"
              >
                🗓 Agendar {seleccion.recomendacion}
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("abrir-chatbot-precios"))}
                className="btn-luxury px-6 py-3.5 text-sm sm:text-base"
              >
                💬 Consultar tarifas en Chatbot
              </button>
              <button
                onClick={() => setSeleccion(null)}
                className="w-full sm:w-auto text-xs font-body text-ink/50 hover:text-gold-dark underline pt-2 sm:pt-0 transition-colors"
              >
                ↺ Repetir diagnóstico
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
