import Link from "next/link";
import Image from "next/image";
import PalmLeaf from "./PalmLeaf";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-moss/5 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

      {/* Decorative palm leaf & brand emblem */}
      <PalmLeaf
        variant="single"
        className="pointer-events-none absolute -top-4 -left-4 h-72 w-36 text-moss/15 rotate-[-15deg] hidden sm:block"
      />
      <div className="pointer-events-none absolute top-4 sm:top-8 right-0 sm:right-4 lg:right-6 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 opacity-35 select-none hidden sm:block">
        <Image
          src="/images/logolimpio.png"
          alt="Relax VR 360°"
          width={300}
          height={300}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        {/* Top pill badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { icon: "✦", text: "Realidad Virtual 360°" },
            { icon: "🌿", text: "Aceites doTERRA CPTG" },
            { icon: "★", text: "5.0 en Google" },
            { icon: "📍", text: "Los Laureles · Montería" }
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="badge-gold"
            >
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </div>

        {/* Main heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="section-label mb-4">Centro de Relajación Multisensorial · Montería, Colombia</p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink mb-6">
            ¿Estrés, tensión
            <br />o fatiga mental?{" "}
            <span className="gold-text">Regálate</span>
            <br />
            <span className="gold-text">una pausa total.</span>
          </h1>

          <p className="font-display text-lg sm:text-xl text-ink/60 mb-2 tracking-wide">
            RELAX VR 360° MONTERÍA S.A.S.
          </p>
          <p className="font-body text-moss-dark italic text-sm sm:text-base">
            La Primera Experiencia Multisensorial y Realidad Virtual 360° en Montería
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-ink/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-center mb-10">
          Desconecta del ruido y sumérgete en un oasis de serenidad. Fusionamos masajes
          relajantes, piedras volcánicas, aceites certificados{" "}
          <strong className="text-ink font-semibold">doTERRA CPTG</strong> y paisajes naturales
          inmersivos 360° en cabinas privadas climatizadas.
        </p>

        {/* Couple offer highlight */}
        <div className="mx-auto max-w-lg glass-gold rounded-2xl px-6 py-4 mb-10 flex items-start gap-3 text-left border-gold-glow">
          <span className="text-2xl mt-0.5">♡</span>
          <div>
            <p className="font-body text-sm font-semibold text-ink mb-0.5">
              ¿Celebras una fecha especial o vienes en pareja?
            </p>
            <p className="font-body text-xs text-ink/70">
              Vive la experiencia en nuestra cabina dúo con{" "}
              <strong className="text-gold-dark">10% de descuento especial</strong> para dos personas.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/reservar"
            className="btn-gold rounded-full px-8 py-3.5 font-body text-sm tracking-widest uppercase font-semibold"
          >
            Agendar Cita Ahora
          </Link>
          <a
            href="#cumpleanos"
            className="rounded-full border border-gold/50 text-gold-dark px-6 py-3.5 font-body text-sm tracking-wide hover:bg-gold/10 hover:border-gold transition-all font-medium"
          >
            15% OFF Cumpleaños 🎂
          </a>
          <a
            href="#test-bienestar"
            className="rounded-full border border-moss/25 px-6 py-3.5 font-body text-sm tracking-wide hover:bg-moss/10 transition-all text-ink/80"
          >
            Test de Estrés (Gratis)
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 font-body text-sm text-ink/55 mb-16">
          <span className="flex items-center gap-2">
            <span className="text-gold tracking-tight text-base">★★★★★</span>
            <span>5.0 en Google Reviews</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
            Sede Climatizada · Los Laureles
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60"></span>
            Atención Exclusiva y Personalizada
          </span>
        </div>

        {/* Hero card — flagship experience */}
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-gold/25 bg-white">
            {/* Gold ribbon */}
            <div className="absolute top-4 left-4 z-10">
              <span className="badge-gold text-[10px]">✦ Línea Insignia · Relax Gold VR 360°</span>
            </div>

            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/gafas.jpg"
                alt="Experiencia Relax Gold con gafas de Realidad Virtual 360°"
                fill
                className="object-cover object-[center_35%] scale-[1.02] hover:scale-[1.06] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Card body */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-display text-xl text-ink">Relax Gold VR 360°</p>
                  <p className="font-body text-xs text-ink/55">La experiencia más elegida por nuevos visitantes</p>
                </div>
                <span className="font-body text-xs text-ink/60 bg-sand px-3 py-1.5 rounded-full border border-gold/25">★ 5.0 · Montería S.A.S.</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {[
                  { icon: "🔥", title: "Gemas Volcánicas", desc: "Confort térmico focalizado" },
                  { icon: "≋", title: "doTERRA CPTG", desc: "Pureza 100% garantizada" }
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 flex gap-3 items-start">
                    <span className="text-lg mt-0.5">{icon}</span>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink">{title}</p>
                      <p className="font-body text-xs text-ink/55">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#simulador-360"
                className="block text-center rounded-full border border-gold/40 py-2.5 font-body text-sm hover:bg-gold/10 hover:border-gold/70 transition-all text-gold-dark font-medium"
              >
                Explorar Paisajes 360° en Vivo ✦
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold divider */}
      <div className="divider-gold mt-8" />
    </section>
  );
}
