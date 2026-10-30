import Image from "next/image";

const PROTOCOLOS = [
  {
    etiqueta: "Realidad Virtual 360°",
    titulo: "Inmersión visual & auditiva",
    texto:
      "Viaja a playas paradisíacas, cascadas naturales y bosques serenos mientras recibes un masaje terapéutico restaurador.",
    meta: "Cabina climatizada · Entornos biofílicos 8D",
    imagen: "/images/realidad.jpg"
  },
  {
    etiqueta: "Pistola & piedras volcánicas",
    titulo: "Percusión & termoterapia",
    texto:
      "Percusión profunda para disolver contracturas y nudos miofasciales, combinada con gemas volcánicas que relajan y calman el cuerpo.",
    meta: "Alivio focalizado cervical, dorsal y lumbar",
    imagen: "/images/piedras.jpg"
  },
  {
    etiqueta: "Aromaterapia doTERRA CPTG",
    titulo: "Botánica & confort térmico",
    texto:
      "Gotas puras de lavanda, menta y eucalipto micro-difuminadas en el aire para una relajación olfativa instantánea y profunda.",
    meta: "100% grado terapéutico · Distribuidor oficial",
    imagen: "/images/aroma.jpg"
  }
];

export default function Ambiente() {
  return (
    <section id="viaje-bienestar" className="section-dark relative overflow-hidden py-24 px-6">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="gold-pill-dark mb-3">🌿 Atmósfera Multisensorial</span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-bold mb-4">
            Un espacio creado para <span className="gold-text-light">tus sentidos</span>
          </h2>
          <p className="font-body text-sand/80 text-base sm:text-lg leading-relaxed">
            Tecnología inmersiva VR 360°, técnicas manuales de presión profunda, gemas volcánicas y botánica pura en un protocolo exclusivo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROTOCOLOS.map((p) => (
            <div
              key={p.titulo}
              className="card-luxury-dark relative p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div>
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-gold/30 shadow-md">
                  <Image
                    src={p.imagen}
                    alt={p.etiqueta}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="gold-pill-dark text-[10px] uppercase tracking-wider mb-3 inline-block">
                  {p.etiqueta}
                </span>
                <h3 className="font-display text-xl text-sand font-bold mb-2">{p.titulo}</h3>
                <p className="font-body text-sand/80 text-xs sm:text-sm leading-relaxed mb-4">{p.texto}</p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-body text-xs text-gold-light font-medium">{p.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}