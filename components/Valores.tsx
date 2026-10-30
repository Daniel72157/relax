const VALORES = [
  {
    titulo: "Innovación Sensorial",
    texto:
      "Integramos la más avanzada tecnología inmersiva de Realidad Virtual 360° con técnicas corporales ancestrales para transformar el concepto tradicional del bienestar."
  },
  {
    titulo: "Calidez & Trato Humano",
    texto:
      "Cada usuario es único. Escuchamos tus necesidades individuales de fatiga y diseñamos un entorno a la medida de tu descanso."
  },
  {
    titulo: "Pureza & Calidad Botánica",
    texto:
      "Compromiso inquebrantable con aceites 100% puros doTERRA CPTG, garantizando una experiencia botánica libre de químicos, sintéticos o aditivos."
  },
  {
    titulo: "Privacidad & Exclusividad",
    texto:
      "Respeto absoluto por tu intimidad con cabinas climatizadas, diseñadas para un descanso individual o en pareja con total serenidad."
  }
];

export default function Valores() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="gold-pill mb-3">✨ Pilares Éticos</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
          Nuestros valores <span className="gold-text">fundamentales</span>
        </h2>
        <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed">
          Los principios inquebrantables que guían cada segundo de tu experiencia en nuestra sede.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {VALORES.map((v, i) => (
          <div
            key={v.titulo}
            className="card-luxury p-8 bg-white/90 backdrop-blur-md border-gold/30 shadow-lg hover:-translate-y-1 transition-transform relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-2xl font-bold text-gold">0{i + 1}</span>
              <span className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-xs font-bold text-gold-dark border border-gold/30">
                ✦
              </span>
            </div>
            <h3 className="font-display text-2xl text-ink font-bold mb-3">{v.titulo}</h3>
            <p className="font-body text-ink/75 leading-relaxed text-sm sm:text-base">{v.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
