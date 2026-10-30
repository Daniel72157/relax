const STATS = [
  {
    numero: "-38%",
    titulo: "Reducción de cortisol",
    texto:
      "Estudios de neurociencia demuestran que 20 minutos de inmersión biofílica en VR reducen significativamente las hormonas del estrés."
  },
  {
    numero: "4-7 Hz",
    titulo: "Ondas cerebrales Theta",
    texto:
      "El audio binaural 8D estimula frecuencias cerebrales asociadas al sueño REM y la meditación profunda espontánea."
  },
  {
    numero: "98%",
    titulo: "Satisfacción en Montería",
    texto:
      "Nuestros clientes reportan alivio inmediato de contracturas musculares y una mejora en la calidad del sueño nocturno."
  }
];

const BENEFICIOS = [
  {
    icono: "🧠",
    titulo: "Neuro-relajación comprobada",
    meta: "Desaceleración de ondas Beta a Theta",
    texto:
      "La estimulación audiovisual en 360° desacelera la actividad del lóbulo frontal hiperactivo, induciendo estados de calma profunda similares a horas de meditación tradicional."
  },
  {
    icono: "❤️",
    titulo: "Estabilización cardiovascular",
    meta: "Regulación del sistema nervioso autónomo",
    texto:
      "El ritmo biofílico y los patrones de respiración sincronizada reducen la presión arterial y relajan el tono muscular en cuello y trapecios de forma visible."
  },
  {
    icono: "⚡",
    titulo: "Restauración cognitiva y foco",
    meta: "Recarga de energía mental sin fatiga",
    texto:
      "Al liberar a tu cerebro de las micro-notificaciones y el estrés urbano, regresas a tus actividades con renovada agudeza mental y serenidad."
  }
];

export default function Ciencia() {
  return (
    <section id="ciencia" className="relative overflow-hidden mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="gold-pill mb-3">🔬 Base Científica & Neurociencia</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
          ¿Por qué funciona la <span className="gold-text">inmersión VR 360°?</span>
        </h2>
        <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed">
          A diferencia de los métodos pasivos convencionales, la Realidad Virtual 360° aísla las distracciones lumínicas y auditivas para inducir un estado de relajación neurofisiológica profunda.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 mb-16">
        {STATS.map((s) => (
          <div
            key={s.titulo}
            className="card-luxury relative overflow-hidden text-center p-8 sm:p-10 bg-white/90 backdrop-blur-md shadow-xl border-gold/30 hover:-translate-y-1 transition-transform"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-display text-4xl sm:text-5xl text-gold-dark font-bold mb-3 tracking-tight">
              {s.numero}
            </p>
            <h3 className="font-display text-lg text-ink font-bold mb-2">{s.titulo}</h3>
            <p className="font-body text-xs sm:text-sm text-ink/65 leading-relaxed">{s.texto}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {BENEFICIOS.map((b) => (
          <div
            key={b.titulo}
            className="card-luxury p-8 bg-sand/30 border-gold/20 flex flex-col justify-between hover:bg-white hover:border-gold/40 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-2xl mb-4">
                {b.icono}
              </div>
              <h3 className="font-display text-xl text-ink font-bold mb-1">{b.titulo}</h3>
              <p className="font-body text-xs text-gold-dark font-semibold uppercase tracking-wider mb-3">
                {b.meta}
              </p>
              <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed">{b.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
