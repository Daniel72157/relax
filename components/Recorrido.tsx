const MOMENTOS = [
  {
    numero: "01",
    icono: "☕",
    titulo: "Bienvenida & Desconexión Inicial",
    texto:
      "Al llegar a nuestra sede en Montería, iniciamos tu ritual con una bebida de cortesía diseñada para hidratar tu cuerpo y predisponer tus sentidos para dejar atrás el estrés diario."
  },
  {
    numero: "02",
    icono: "🔥",
    titulo: "Restauración Corporal & Térmica",
    texto:
      "La tensión física comienza a ceder mediante la combinación de confort térmico, gemas volcánicas y técnicas manuales enfocadas en la relajación muscular en las zonas de mayor carga."
  },
  {
    numero: "03",
    icono: "🌿",
    titulo: "Alquimia Botánica & Aromaterapia doTERRA",
    texto:
      "A través de aceites esenciales puros de grado terapéutico doTERRA (estándar CPTG, sin químicos ni sintéticos), inducimos a tu sistema nervioso a un estado de relajación profunda."
  },
  {
    numero: "04",
    icono: "🥽",
    titulo: "Inmersión VR 360° & Sonidos Envolventes",
    texto:
      "Tu mente viaja a entornos naturales inmersivos a través de tecnología de Realidad Virtual 360°, acompañados de una atmósfera sonora que induce calma profunda y renovación mental absoluta."
  }
];

export default function Recorrido() {
  return (
    <section id="recorrido" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl mb-14">
        <p className="section-label mb-3">Recorrido multisensorial</p>
        <h2 className="font-display text-4xl sm:text-5xl mb-4">
          ¿Cómo es tu{" "}
          <span className="gold-text">viaje de bienestar?</span>
        </h2>
        <p className="font-body text-ink/80 text-base leading-relaxed">
          Un recorrido multisensorial diseñado para que cada minuto multiplique tu tranquilidad.
        </p>
      </div>

      <ol className="grid sm:grid-cols-2 gap-6">
        {MOMENTOS.map((m, i) => (
          <li key={m.numero} className="group card-luxury p-7">
            {/* Top row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="step-gold shrink-0 group-hover:shadow-gold transition-shadow duration-300">
                {m.numero}
              </div>
              <div className="flex items-center gap-2 text-xs text-ink/50 font-body pt-2 font-medium">
                <span className="divider-gold w-8 inline-block" />
                Paso {i + 1} de 4
              </div>
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-xl shrink-0">
                {m.icono}
              </div>
              <h3 className="font-display text-xl text-ink font-bold leading-snug">{m.titulo}</h3>
            </div>

            <p className="font-body text-sm text-ink/80 leading-relaxed">{m.texto}</p>

            {/* Bottom accent */}
            <div className="mt-5 pt-4 border-t border-gold/15 flex items-center gap-2">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              <span className="text-gold text-xs font-body">✦</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
