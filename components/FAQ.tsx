"use client";

import { useState } from "react";

const PREGUNTAS = [
  {
    q: "¿Qué es Relax VR 360° Montería S.A.S.?",
    a: "Relax VR 360° es un centro de innovación en bienestar y relajación profunda que fusiona masajes relajantes, calor térmico con gemas volcánicas, aromaterapia botánica pura doTERRA, paisajes sonoros Theta y Realidad Virtual inmersiva 360° en cabinas privadas climatizadas."
  },
  {
    q: "¿Qué aceites esenciales utilizan y cómo garantizan su pureza?",
    a: "Utilizamos y distribuimos exclusivamente aceites esenciales doTERRA con estándar CPTG (Certified Pure Therapeutic Grade): 100% puros, libres de químicos, pesticidas y aditivos sintéticos. Disponibles también para compra directa en sede."
  },
  {
    q: "¿Se pueden tomar experiencias en pareja o dúo?",
    a: "Sí. Nuestra cabina privada climatizada en Los Laureles está especialmente acondicionada para 2 personas simultáneas, con un 10% de descuento de cortesía directo sobre la experiencia reservada. Ideal para aniversarios, cumpleaños o una cita de desconexión."
  },
  {
    q: "¿Dónde consulto las tarifas de las experiencias y cómo se realiza el pago?",
    a: "Puedes consultar todas las tarifas oficiales actualizadas al instante en nuestro Asistente Virtual / Chatbot flotante en la esquina inferior de la pantalla. El pago se coordina directamente en sede (efectivo, transferencias, tarjetas) o por WhatsApp al momento de confirmar tu cita."
  },
  {
    q: "¿Cuánto tiempo tengo para confirmar mi reserva tras agendar en línea?",
    a: "Te recomendamos responder el mensaje de confirmación por WhatsApp el mismo día de tu reserva. Si no recibimos confirmación, el cupo puede liberarse para otro usuario, especialmente en horarios y fines de semana de alta demanda."
  },
  {
    q: "¿Qué requisitos de salud o consentimiento se solicitan antes de la sesión?",
    a: "Antes de tu sesión realizamos una breve valoración sensorial sobre condiciones de salud relevantes (embarazo, lesiones musculares recientes, sensibilidad lumínica o preferencias olfativas) para personalizar tu experiencia de forma 100% segura y placentera."
  }
];

export default function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden mx-auto max-w-4xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="gold-pill mb-3">❓ Preguntas Frecuentes</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
          Todo lo que necesitas <span className="gold-text">saber</span>
        </h2>
        <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed">
          Resolvemos tus dudas principales para que disfrutes al máximo tu cita en Relax VR 360° Montería.
        </p>
      </div>

      <div className="card-luxury p-6 sm:p-10 bg-white/95 backdrop-blur-md shadow-2xl border-gold/30 divide-y divide-gold/15">
        {PREGUNTAS.map((p, i) => {
          const abiertaAhora = abierta === i;
          return (
            <div key={p.q} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setAbierta(abiertaAhora ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-3 text-left font-display font-bold text-base sm:text-lg text-ink hover:text-gold-dark transition-colors"
                aria-expanded={abiertaAhora}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/15 text-gold-dark text-xs flex items-center justify-center shrink-0 font-bold border border-gold/30">
                    ?
                  </span>
                  {p.q}
                </span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-300 ${
                  abiertaAhora ? "bg-gold text-ink font-bold rotate-180" : "bg-sand text-ink/60 border border-gold/20"
                }`}>
                  ▼
                </span>
              </button>
              {abiertaAhora && (
                <div className="pt-2 pb-3 pl-9 pr-4 animate-fadeIn">
                  <p className="font-body text-ink/75 leading-relaxed text-sm sm:text-base">
                    {p.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
