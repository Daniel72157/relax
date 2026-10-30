"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PalmLeaf from "./PalmLeaf";
import { supabase } from "@/lib/supabaseClient";
import type { Servicio } from "@/lib/types";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

export default function TarjetaRegalo() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [para, setPara] = useState("");
  const [de, setDe] = useState("");
  const [experiencia, setExperiencia] = useState("Experiencia Relax Gold (40 min)");
  const [dedicatoria, setDedicatoria] = useState("");

  useEffect(() => {
    supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setServicios(data);
          setExperiencia(`${data[0].nombre} (${data[0].duracion_minutos} min)`);
        }
      });
  }, []);

  const mensaje = encodeURIComponent(
    `Hola Relax VR 360°, quiero solicitar una Tarjeta de Regalo VIP de Bienestar.\n` +
    `• Para: ${para || "—"}\n` +
    `• De: ${de || "—"}\n` +
    `• Experiencia: ${experiencia}\n` +
    `• Dedicatoria: ${dedicatoria || "—"}`
  );

  return (
    <section id="tarjetas-regalo" className="relative overflow-hidden bg-sand text-ink py-24">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="gold-pill mb-3">🎁 Obsequio de Bienestar Exclusivo</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold mb-4">
            Regala innovación y <span className="gold-text">desconexión total</span>
          </h2>
          <p className="font-body text-ink/80 text-base sm:text-lg leading-relaxed">
            El detalle perfecto para aniversarios, cumpleaños o sorprender a alguien especial. Solicita tu tarjeta física con relieve dorado en sede o el bono digital de alta fidelidad al instante.
          </p>
        </div>

        {/* Vista previa Luxury de la tarjeta (Fondo Oscuro VIP) */}
        <div className="card-luxury-dark relative p-8 sm:p-10 mb-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <PalmLeaf variant="fan" className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 text-gold/10" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Relax VR 360°"
                width={150}
                height={60}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              />
              <span className="w-px h-8 bg-gold/40" />
              <p className="font-display italic text-sm text-gold-light tracking-wide">
                VIP Gift Pass
              </p>
            </div>
            <span className="gold-pill-dark text-xs py-1 px-3.5 self-start sm:self-auto shadow-md">
              Bono de Experiencia Oficial ✨
            </span>
          </div>

          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gold/30 mb-6">
            <p className="text-[11px] uppercase tracking-widest text-gold-light font-bold mb-1.5">
              Experiencia Incluida
            </p>
            <p className="font-display text-xl sm:text-2xl text-sand font-bold">
              {experiencia}
            </p>
            {dedicatoria && (
              <p className="text-xs text-sand/90 font-body italic mt-3 pt-3 border-t border-white/10">
                “{dedicatoria}”
              </p>
            )}
          </div>

          <div className="relative grid sm:grid-cols-2 gap-4 font-body text-sm mb-6 text-sand/90">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-xs text-gold-light uppercase tracking-wider block font-bold mb-0.5">Homenajeado / Para:</span>
              <p className="font-medium text-base text-sand">{para || "Nombre del beneficiario"}</p>
            </div>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-xs text-gold-light uppercase tracking-wider block font-bold mb-0.5">De parte de:</span>
              <p className="font-medium text-base text-sand">{de || "Tu nombre"}</p>
            </div>
          </div>

          <div className="relative border-t border-gold/25 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-body text-sand/70">
            <span>📍 Sede Los Laureles · Calle 42 #10-50 Local 2</span>
            <span>📞 WhatsApp: 323 505 6242</span>
            <span className="text-gold-light font-semibold">Válido por 3 meses bajo reserva</span>
          </div>
        </div>

        {/* Formulario de personalización (Tarjeta Clara) */}
        <div className="card-luxury p-8 sm:p-10 space-y-5 shadow-2xl border-gold/30">
          <div className="flex items-center gap-2 mb-2 pb-3 border-b border-gold/15">
            <span className="text-xl">✍️</span>
            <h3 className="font-display text-xl font-bold text-ink">Personaliza tu Bono o Tarjeta Física</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink/80 font-body mb-1">
                ¿Para quién es el regalo? (Nombre) *
              </label>
              <input
                placeholder="Ej: Laura Gómez"
                value={para}
                onChange={(e) => setPara(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink/80 font-body mb-1">
                ¿De parte de quién? (Tu nombre) *
              </label>
              <input
                placeholder="Ej: Carlos Pérez"
                value={de}
                onChange={(e) => setDe(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink/80 font-body mb-1">
              Selecciona la experiencia a obsequiar:
            </label>
            <select
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
              className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              {servicios.map((s) => (
                <option key={s.id} value={`${s.nombre} (${s.duracion_minutos} min)`}>
                  {s.nombre} ({s.duracion_minutos} min) — {s.linea}
                </option>
              ))}
              <option value="Bono de Experiencia Libre / Personalizada">
                Bono de Experiencia Libre / Personalizada
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink/80 font-body mb-1">
              Mensaje o dedicatoria especial:
            </label>
            <textarea
              placeholder="Ej: ¡Feliz cumpleaños! Mereces un momento de desconexión y relajación total..."
              value={dedicatoria}
              onChange={(e) => setDedicatoria(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-sand/30 text-ink focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${mensaje}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-gold py-4 text-center block text-base font-bold shadow-xl tracking-wide"
          >
            🎁 Solicitar Tarjeta VIP Personalizada por WhatsApp
          </a>

          <p className="text-xs text-ink/60 font-body text-center">
            ✨ Entrega digital en alta fidelidad lista para imprimir o compartir, o tarjeta física premium en sede.
          </p>
        </div>
      </div>
    </section>
  );
}
