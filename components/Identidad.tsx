import PalmLeaf from "./PalmLeaf";
import Image from "next/image";

export default function Identidad() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-gradient-to-b from-sand via-white to-sand border-y border-gold/20 py-24">
      <PalmLeaf
        variant="fan"
        className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 text-gold/15 hidden lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="gold-pill mb-4 shadow-sm">
            🌿 Identidad, Ciencia & Propósito
          </span>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight text-ink mb-6">
            Un refugio sagrado de <span className="gold-text">autocuidado y calma</span>
          </h2>
          <p className="text-ink/75 font-body text-base leading-relaxed max-w-prose mb-4">
            Nacimos en el corazón del Valle del Sinú con una visión de alcance universal: crear un refugio sagrado dedicado al autocuidado, la pausa consciente y la restauración integral del cuerpo y la mente.
          </p>
          <p className="text-ink/75 font-body text-base leading-relaxed max-w-prose mb-8">
            Cada detalle de nuestras instalaciones —desde el clima controlado y la ergonomía de nuestros sillones reclinables, hasta la paleta biofílica inspirada en la vegetación cordobesa— está concebido para armonizar el sistema nervioso autónomo.
          </p>

          <div className="card-luxury p-6 bg-sand/40 border-gold/30 shadow-md">
            <dl className="font-body text-xs sm:text-sm text-ink/75 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gold font-bold">🏛️</span>
                <div>
                  <dt className="inline font-bold text-ink">Razón social: </dt>
                  <dd className="inline">Relax VR 360° S.A.S. · NIT registrado en Cámara de Comercio de Montería, Córdoba.</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold font-bold">📍</span>
                <div>
                  <dt className="inline font-bold text-ink">Sede Principal: </dt>
                  <dd className="inline">Calle 42 #10-50 Local 2, Barrio Los Laureles, Montería.</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gold font-bold">✨</span>
                <div>
                  <dt className="inline font-bold text-ink">Dirección General: </dt>
                  <dd className="inline">Eylin Sánchez Pastrana.</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40">
          <Image
            src="/images/sede.jpg"
            alt="Interior de la sede Relax VR 360° Montería"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-ink-dark/80 backdrop-blur-md border border-gold/30 text-sand text-xs font-body">
            <p className="font-bold text-gold text-sm font-display mb-0.5">Sede Los Laureles · Montería</p>
            <p className="text-sand/80">Cabinas privadas climatizadas diseñadas para tu desconexión.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
