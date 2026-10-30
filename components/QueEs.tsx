import PalmLeaf from "./PalmLeaf";
import Image from "next/image";

export default function QueEs() {
  return (
    <section id="que-es" className="relative mx-auto max-w-6xl px-6 py-24">
      <PalmLeaf
        variant="frond"
        className="pointer-events-none absolute top-4 right-0 w-72 h-32 text-gold/15 hidden lg:block"
      />
      <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-center">
        <div>
          <p className="section-label mb-3">Experiencia sensorial en Montería</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
            Una pausa reparadora{" "}
            <span className="gold-text">diseñada para</span>
            <br />
            <span className="gold-text">tu bienestar integral.</span>
          </h2>
          <p className="text-ink/70 font-body leading-relaxed max-w-prose mb-8 text-base">
            Relax VR 360° es un centro de relajación que integra masajes relajantes,
            experiencias aromáticas, sonidos envolventes y realidad virtual para ofrecer
            una experiencia multisensorial única, orientada al bienestar físico y mental.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🧘",
                title: "Desconexión total",
                desc: "Silencia el estrés diario con confort térmico envolvente y paisajes naturales inmersivos."
              },
              {
                icon: "🏠",
                title: "Cabina privada climatizada",
                desc: "Ambiente exclusivo para ti o en pareja — cabina dúo con 10% OFF especial."
              },
              {
                icon: "🌿",
                title: "Aromaterapia doTERRA",
                desc: "Aceites esenciales 100% puros, certificados CPTG, de la mejor calidad botánica."
              },
              {
                icon: "🎧",
                title: "Sonidos Binaurales",
                desc: "Frecuencias diseñadas para inducir estados profundos de calma y relajación."
              }
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="card-luxury p-5 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center text-xl mb-3 group-hover:bg-gold/25 transition-colors">
                  {icon}
                </div>
                <p className="font-display text-base text-ink mb-1">{title}</p>
                <p className="font-body text-xs text-ink/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Gold frame */}
          <div className="absolute -inset-3 rounded-3xl bg-gold-gradient opacity-15 blur-sm" />
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold/30 shadow-luxury">
            <Image
              src="/images/main.jpeg"
              alt="Cabina privada de relajación Relax VR 360°"
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 right-4 glass-gold rounded-xl p-3 border-gold-glow">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/25 flex items-center justify-center shrink-0">
                  <span className="text-sm">✦</span>
                </div>
                <div>
                  <p className="font-display text-sm text-ink font-medium">Experiencia Premium</p>
                  <p className="font-body text-[11px] text-ink/60">Cabinas privadas · Montería, Córdoba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
