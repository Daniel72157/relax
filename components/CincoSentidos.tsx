"use client";

import { useState } from "react";
import PalmLeaf from "./PalmLeaf";

const SENTIDOS = [
  {
    numero: "01",
    paso: "Paso 1",
    fase: "Apertura",
    emoji: "👁️",
    sentido: "Vista",
    titulo: "Sentido de la Vista",
    subtitulo: "Inmersión Visual VR 360°",
    tag: "Biofilia 360°",
    texto:
      "Entornos biofílicos en alta definición con visores de Realidad Virtual 360° que aíslan la sobrecarga lumínica cotidiana y transportan la mente a paisajes naturales de serenidad absoluta."
  },
  {
    numero: "02",
    paso: "Paso 2",
    fase: "Sincronización",
    emoji: "👂",
    sentido: "Oído",
    titulo: "Sentido del Oído",
    subtitulo: "Acústica & Ondas Theta",
    tag: "Frecuencias 4-7 Hz",
    texto:
      "Paisajes auditivos 8D y frecuencias armónicas calibradas para inducir ondas cerebrales Theta, propiciando meditación espontánea y desaceleración del ritmo cardíaco."
  },
  {
    numero: "03",
    paso: "Paso 3",
    fase: "Estimulación",
    emoji: "👃",
    sentido: "Olfato",
    titulo: "Sentido del Olfato",
    subtitulo: "Aceites doTERRA CPTG",
    tag: "Aromaterapia Pura",
    texto:
      "Difusión y aplicación de aceites esenciales 100% puros de grado terapéutico doTERRA (estándar CPTG certificado), modulando directamente el sistema límbico y las emociones."
  },
  {
    numero: "04",
    paso: "Paso 4",
    fase: "Preparación",
    emoji: "👄",
    sentido: "Gusto",
    titulo: "Sentido del Gusto",
    subtitulo: "Hidratación Botánica",
    tag: "Receptividad Celular",
    texto:
      "Infusión de bienvenida refrescante y nutritiva diseñada para hidratar los tejidos y predisponer el organismo hacia un estado receptivo de calma y descanso."
  },
  {
    numero: "05",
    paso: "Paso 5",
    fase: "Restauración",
    emoji: "✋",
    sentido: "Tacto",
    titulo: "Sentido del Tacto",
    subtitulo: "Gemas & Criosferas",
    tag: "Termo & Crioterapia",
    texto:
      "Confort térmico con piedras volcánicas calientes, técnicas manuales de presión profunda y criosferas tonificantes que liberan contracturas musculares."
  }
];

export default function CincoSentidos() {
  const [pasoActivo, setPasoActivo] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-sand via-white to-sand border-y border-gold/20">
      <PalmLeaf
        variant="frond"
        className="pointer-events-none absolute -top-4 left-0 w-80 h-40 text-gold/10 hidden lg:block"
      />
      <PalmLeaf
        variant="fan"
        className="pointer-events-none absolute -bottom-10 right-0 w-72 h-72 text-gold/10 hidden lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="gold-pill mb-3">✨ Armonía Neurosensorial</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight mb-4">
            Los 5 sentidos en <span className="gold-text">sintonía perfecta</span>
          </h2>
          <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed">
            Una secuencia científica progresiva y sincronizada para desacelerar el sistema nervioso y restaurar tu bienestar en tiempo récord.
          </p>
        </div>

        {/* LÍNEA DE TIEMPO HORIZONTAL */}
        <div className="relative">
          {/* Barra horizontal continua de conexión (Desktop & Tablet) */}
          <div className="hidden md:block absolute top-[32px] left-[6%] right-[6%] h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20 z-0 rounded-full" />

          {/* Contenedor horizontal responsivo */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory">
            {SENTIDOS.map((s, index) => {
              const estaSeleccionado = pasoActivo === index;

              return (
                <div
                  key={s.numero}
                  onMouseEnter={() => setPasoActivo(index)}
                  onMouseLeave={() => setPasoActivo(null)}
                  className="relative flex flex-col items-center snap-center min-w-[260px] md:min-w-0"
                >
                  {/* Nodo circular del paso en la línea horizontal */}
                  <div className="relative z-10 flex flex-col items-center mb-6">
                    <div
                      className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 transition-all duration-300 shadow-md ${
                        estaSeleccionado
                          ? "border-gold scale-110 shadow-[0_0_20px_rgba(201,168,76,0.6)] ring-4 ring-gold/25"
                          : "border-gold/40 hover:border-gold hover:scale-105"
                      }`}
                    >
                      <span className="text-2xl select-none">{s.emoji}</span>
                      <span className="absolute -bottom-2 -right-1 text-[10px] font-display font-bold bg-gradient-to-r from-gold-dark to-gold text-ink px-2 py-0.5 rounded-full border border-white shadow-sm">
                        {s.numero}
                      </span>
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-[11px] font-body font-bold text-gold-dark uppercase tracking-widest block">
                        {s.paso}
                      </span>
                      <span className="text-xs font-display text-ink/70 font-medium">
                        {s.fase}
                      </span>
                    </div>
                  </div>

                  {/* Tarjeta de contenido debajo del nodo */}
                  <div
                    className={`w-full flex-1 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                      estaSeleccionado
                        ? "border-gold bg-white shadow-[0_10px_30px_rgba(201,168,76,0.2)] -translate-y-1 ring-1 ring-gold/40"
                        : "border-gold/20 bg-white/80 shadow-sm hover:border-gold/50 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-3">
                        <span className="text-[10px] font-body font-bold tracking-wider uppercase text-gold-dark bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/25">
                          {s.tag}
                        </span>
                        <span className="text-[11px] font-display text-ink/40 font-medium">
                          Fase {index + 1}/5
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-ink mb-1">
                        {s.titulo}
                      </h3>
                      <p className="font-body text-xs font-semibold text-gold-dark mb-3">
                        {s.subtitulo}
                      </p>
                      <p className="text-ink/70 font-body text-xs sm:text-sm leading-relaxed">
                        {s.texto}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between text-[11px] font-body text-ink/50">
                      <span>Estimulación #{index + 1}</span>
                      <span className="text-gold-dark font-semibold">{s.sentido} →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumen de cierre */}
        <div className="mt-14 card-luxury border-gold/30 bg-white/90 p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-xl">
          <p className="font-display text-lg sm:text-xl text-ink font-bold mb-2 flex items-center justify-center gap-2">
            <span className="text-gold">✨</span> Conexión Secuencial en Tiempo Real
          </p>
          <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed max-w-xl mx-auto">
            Cada fase sensorial prepara biológicamente a la siguiente, logrando que en menos de 10 minutos tu mente y sistema nervioso autónomo alcancen un estado de profunda calma.
          </p>
        </div>
      </div>
    </section>
  );
}
