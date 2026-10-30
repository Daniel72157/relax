"use client";

import { useState } from "react";
import Image from "next/image";
import DoterraCatalogoModal from "./DoterraCatalogoModal";

export default function Doterra() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-sand via-white to-sand border-y border-gold/20 py-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div className="relative group">
            <div className="relative aspect-square rounded-3xl border-2 border-gold/40 p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden bg-[#404637]">
              {/* Imagen de fondo */}
              <Image
                src="/images/doterra.jpg"
                alt="Aceites esenciales doTERRA CPTG"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-[center_70%] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay oscuro para máximo contraste */}
              <div
                className="absolute inset-0 backdrop-blur-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(64, 70, 55, 0.88) 0%, rgba(45, 50, 39, 0.82) 50%, rgba(30, 34, 25, 0.90) 100%)"
                }}
              />

              {/* Contenido de texto */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 rounded-2xl bg-gold/20 border border-gold/50 shadow-lg flex items-center justify-center text-4xl mb-4 backdrop-blur-md group-hover:scale-110 transition-transform">
                  🌿
                </div>
                <p className="font-display text-3xl text-sand font-bold mb-1">
                  doTERRA® CPTG
                </p>
                <p className="font-body text-xs text-gold-light font-bold uppercase tracking-widest mb-3">
                  Certified Pure Therapeutic Grade
                </p>
                <p className="font-body text-xs text-sand/85 max-w-xs leading-relaxed">
                  Aceites esenciales 100% puros de grado terapéutico certificados sin rellenos sintéticos ni adulterantes.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <span className="gold-pill-dark text-[11px] py-1 px-3">
                    ✨ Difusión Pura
                  </span>
                  <span className="gold-pill-dark text-[11px] py-1 px-3">
                    💆 Aromaterapia CPTG
                  </span>
                  <span className="gold-pill-dark text-[11px] py-1 px-3">
                    🛍️ Venta Directa
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="gold-pill mb-4 shadow-sm">
              ✨ Distribuidores Oficiales Autorizados
            </span>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight text-ink font-bold mb-6">
              Aceites esenciales doTERRA · <span className="gold-text">CPTG certificado</span>
            </h2>
            <p className="text-ink/80 font-body text-base leading-relaxed max-w-prose mb-4">
              En Relax VR 360° elevamos cada experiencia con aceites doTERRA de grado terapéutico. 100% extractos botánicos puros para armonizar tu sistema límbico.
            </p>
            <p className="text-ink/80 font-body text-base leading-relaxed max-w-prose mb-8">
              Disfrútalos durante tu ritual o adquiérelos para llevar la serenidad a tu hogar o lugar de trabajo. Disponibles para entrega inmediata en sede Los Laureles y a domicilio en Montería.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setModalAbierto(true)}
                className="btn-gold px-8 py-4 text-base font-bold shadow-xl tracking-wide"
              >
                🛍️ Ver Catálogo y Pedidos doTERRA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal interactivo de catálogo de productos doTERRA */}
      <DoterraCatalogoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      />
    </>
  );
}