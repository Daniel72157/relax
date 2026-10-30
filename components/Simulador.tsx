import Link from "next/link";
import Panorama360 from "@/components/Panorama360";

type Paisaje = {
  nombre: string;
  tag: string;
  imagen?: string;
  video?: string;
};

const PAISAJES: Paisaje[] = [
  { nombre: "Playa al Atardecer", video: "/panoramas/playa.mp4", tag: "Biofilia Marina" },
  { nombre: "Puerto Marino", video: "/panoramas/puerto.mp4", tag: "Horizonte & Calma" },
  { nombre: "Noche Estrellada", imagen: "/panoramas/noche.jpg", tag: "Cosmos & Calma" },
  { nombre: "Campo Nevado", imagen: "/panoramas/nieve.jpg", tag: "Frescura & Serenidad" }
];

export default function Simulador() {
  return (
    <section id="simulador-360" className="section-dark relative overflow-hidden py-24 px-6">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="gold-pill-dark mb-3">🥽 Simulador Interactivo 360°</span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-bold mb-4">
            Explora los paisajes inmersivos <span className="gold-text-light">en vivo</span>
          </h2>
          <p className="font-body text-sand/80 text-base sm:text-lg leading-relaxed">
            Interactúa con los entornos biofílicos en alta definición con movimiento panorámico 360°. Durante tu cita en sede, estos escenarios se proyectan en tus visores VR junto a tu masaje y aromaterapia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {PAISAJES.map((p) => (
            <div
              key={p.nombre}
              className="card-luxury-dark relative p-4 sm:p-5 shadow-2xl flex flex-col gap-3"
            >
              <div className="aspect-video rounded-2xl overflow-hidden border border-gold/30 shadow-inner relative">
                {p.video ? (
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-label={p.nombre}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <Panorama360 src={p.imagen!} caption={p.nombre} />
                )}
              </div>
              <div className="flex items-center justify-between px-2 pt-1">
                <p className="font-display font-bold text-base text-sand">{p.nombre}</p>
                <span className="gold-pill-dark text-[10px]">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature highlight bar */}
        <div className="card-luxury-dark p-8 sm:p-10 border-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="gold-pill-dark text-xs mb-3 inline-block">✨ Visores de Realidad Virtual Ultra HD</span>
            <h3 className="font-display text-2xl sm:text-3xl text-sand font-bold mb-2">
              Cero fatiga visual y campo inmersivo envolvente
            </h3>
            <p className="font-body text-sand/80 text-sm sm:text-base leading-relaxed">
              Durante tu sesión en Relax VR 360° serás transportado a estos paisajes naturales mientras sincronizamos calor térmico, percusión corporal y aromaterapia pura doTERRA.
            </p>
          </div>
          <Link
            href="/reservar"
            className="btn-gold px-8 py-4 text-base font-bold shadow-xl tracking-wide whitespace-nowrap"
          >
            🗓 Vivir la Experiencia en Sede
          </Link>
        </div>
      </div>
    </section>
  );
}