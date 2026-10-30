"use client";

import Link from "next/link";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

export default function PlanesEspeciales() {
  return (
    <section id="descuentos" className="relative overflow-hidden mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="gold-pill mb-3">✨ Beneficios & Opciones Especiales</span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold mb-4">
          Planes especiales & <span className="gold-text">cabina en pareja</span>
        </h2>
        <p className="font-body text-ink/80 text-base sm:text-lg leading-relaxed">
          Diseñados para quienes desean compartir momentos inolvidables o incorporar el bienestar inmersivo como un hábito continuo en Montería.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Pareja - Tarjeta Clara */}
        <div className="card-luxury relative p-8 sm:p-10 flex flex-col justify-between shadow-xl border-gold/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-3xl sm:text-4xl text-gold-dark font-bold">10% OFF</span>
              <span className="gold-pill text-xs">
                Cabina Dúo Climatizada ✨
              </span>
            </div>

            <h3 className="font-display text-2xl text-ink font-bold mb-1">Experiencia en Pareja / Dúo</h3>
            <p className="font-body text-xs sm:text-sm text-gold-dark font-bold mb-4">
              Celebra aniversarios, cumpleaños o una cita de desconexión inolvidable
            </p>

            <p className="font-body text-ink/80 leading-relaxed mb-6 text-sm">
              Nuestra cabina privada climatizada en Los Laureles está especialmente acondicionada para recibir a 2 personas de manera simultánea, sincronizando estímulos sensoriales y relajación profunda.
            </p>

            <div className="bg-sand/60 border border-gold/30 rounded-2xl p-5 mb-6">
              <p className="text-xs uppercase tracking-wider text-gold-darker font-bold mb-2">Privilegios incluidos:</p>
              <ul className="font-body text-xs text-ink/85 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span><strong>10% de descuento directo</strong> aplicado en la sesión dúo.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Privacidad y exclusividad total de la cabina durante tu turno.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Bebidas botánicas de bienvenida e hidratación para ambos.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Aromas puros doTERRA y entornos biofílicos en VR 360°.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/reservar"
              className="w-full btn-gold py-3.5 text-center block text-sm font-bold shadow-md"
            >
              🗓 Agendar Cabina en Pareja (10% OFF)
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("abrir-chatbot-precios"))}
              className="w-full text-center text-xs text-gold-dark hover:text-gold font-bold py-1 transition-colors"
            >
              💬 Consultar tarifas oficiales en el Asistente Virtual
            </button>
          </div>
        </div>

        {/* Pase Mensual - Tarjeta Oscura Luxury */}
        <div className="card-luxury-dark relative p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-3xl sm:text-4xl text-gold-light font-bold">20% OFF</span>
              <span className="gold-pill-dark text-xs">
                Membresía Mensual VIP 🌟
              </span>
            </div>

            <h3 className="font-display text-2xl text-sand font-bold mb-1">Pase Mensual Anti-Estrés</h3>
            <p className="font-body text-xs sm:text-sm text-gold-light font-medium mb-4">
              4 sesiones completas al mes (1 inmersión semanal programada)
            </p>

            <p className="font-body text-sand/85 leading-relaxed mb-6 text-sm">
              Controla de forma sostenida los niveles de cortisol, contracturas musculares crónicas y la sobrecarga laboral mediante una rutina semanal de descanso profundo en Realidad Virtual 360°.
            </p>

            <div className="bg-white/5 backdrop-blur-md border border-gold/30 rounded-2xl p-5 mb-6">
              <p className="text-xs uppercase tracking-wider text-gold-light font-bold mb-2">Ventajas del Pase Mensual:</p>
              <ul className="font-body text-xs text-sand/90 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-gold-light font-bold">★</span>
                  <span><strong>20% de ahorro continuo</strong> comparado con sesiones individuales.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-light font-bold">★</span>
                  <span>Prioridad exclusiva de agenda en horarios premium y fines de semana.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-light font-bold">★</span>
                  <span>100% transferible a un familiar o amigo en caso de viaje o imprevisto.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-light font-bold">★</span>
                  <span>Atención prioritaria y kit botánico de bienvenida.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Relax VR 360°, deseo solicitar y activar el Pase Mensual Anti-Estrés (4 sesiones al mes con 20% OFF).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-gold py-3.5 text-center block text-sm font-bold shadow-lg"
            >
              🌟 Adquirir Pase Mensual por WhatsApp
            </a>
            <p className="text-center text-xs text-sand/60 font-body">
              Cupos mensuales limitados para garantizar exclusividad y privacidad en sede.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
