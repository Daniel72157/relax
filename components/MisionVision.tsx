import PalmLeaf from "./PalmLeaf";

export default function MisionVision() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <PalmLeaf
        variant="single"
        className="pointer-events-none absolute -bottom-10 -right-6 h-64 w-32 text-gold/20 rotate-[8deg] hidden lg:block"
      />
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="gold-pill mb-3">🧭 Dirección Estratégica</span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold mb-4">
          Lo que nos mueve, <span className="gold-text">hacia dónde vamos</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Misión - Tarjeta Clara de Lujo */}
        <div className="card-luxury relative p-8 sm:p-10 shadow-xl border-gold/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="gold-pill text-[10px] mb-4 inline-block">MISIÓN INSTITUCIONAL</span>
          <h3 className="font-display text-2xl sm:text-3xl text-ink font-bold mb-4 leading-tight">
            Salud preventiva y bienestar holístico
          </h3>
          <p className="font-body text-ink/80 leading-relaxed text-sm sm:text-base">
            Optimizar el bienestar y la tranquilidad de individuos y organizaciones mediante sistemas de relajación de vanguardia que integran tecnología inmersiva, técnicas corporales manuales y estímulos sensoriales botánicos 100% puros.
          </p>
        </div>

        {/* Visión - Tarjeta Oscura de Lujo con Alto Contraste */}
        <div className="card-luxury-dark relative p-8 sm:p-10 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="gold-pill-dark text-[10px] mb-4 inline-block">VISIÓN · HORIZONTE 2030</span>
          <h3 className="font-display text-2xl sm:text-3xl text-sand font-bold mb-4 leading-tight">
            Liderazgo en innovación de bienestar en el Caribe
          </h3>
          <p className="font-body text-sand/90 leading-relaxed text-sm sm:text-base">
            Consolidarnos como la compañía líder en innovación para el bienestar corporativo e individual en la región Caribe colombiana, reconocidos por el rigor científico en la gestión del estrés y la fatiga mental.
          </p>
        </div>
      </div>
    </section>
  );
}
