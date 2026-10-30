import PalmLeaf from "./PalmLeaf";

const MAPS_URL = "https://maps.app.goo.gl/L87SZfPKzMmKD3oL6";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

const CONTACT = [
  {
    icon: "🕒",
    title: "Horario de Atención",
    primary: "Lunes a Sábado: 8:00 a.m. – 5:30 p.m.",
    secondary: "Domingos y festivos: Cerrado (jornadas corporativas con reserva previa)"
  },
  {
    icon: "📍",
    title: "Ubicación en Montería",
    primary: "Calle 42 #10-50, Local 2 · Barrio Los Laureles",
    secondary: "Montería, Córdoba — Colombia"
  }
];

export default function Horario() {
  return (
    <section id="visitanos" className="section-dark relative overflow-hidden py-24 px-6">
      <PalmLeaf
        variant="single"
        className="pointer-events-none absolute -bottom-10 -left-8 h-64 w-32 text-gold/10 rotate-[-10deg] hidden md:block"
      />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-moss/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl grid md:grid-cols-2 gap-14 items-center">
        {/* Left info */}
        <div>
          <span className="gold-pill-dark mb-4">📍 Visítanos & Contáctanos</span>
          <h2 className="font-display text-4xl sm:text-5xl mb-8 text-sand font-bold">
            Sede principal y{" "}
            <span className="gold-text-light">canales exclusivos.</span>
          </h2>

          <div className="space-y-4 font-body">
            {CONTACT.map(({ icon, title, primary, secondary }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-gold/25 bg-white/5 hover:border-gold/50 hover:bg-white/10 transition-all"
              >
                <p className="text-gold-light font-display text-base font-bold mb-1 flex items-center gap-2">
                  <span>{icon}</span> {title}
                </p>
                <p className="text-sand text-sm font-semibold">{primary}</p>
                <p className="text-sand/70 text-xs mt-0.5">{secondary}</p>
              </div>
            ))}

            {/* Contact grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-gold/25 bg-white/5 hover:border-gold/50 hover:bg-white/10 transition-all group"
              >
                <p className="text-gold-light text-[11px] font-bold uppercase tracking-wider mb-1">WhatsApp Oficial</p>
                <p className="text-sand text-sm font-semibold group-hover:text-gold-light transition-colors">
                  +57 323 505 6242
                </p>
              </a>
              <a
                href="mailto:relaxvr3@gmail.com"
                className="p-4 rounded-xl border border-gold/25 bg-white/5 hover:border-gold/50 hover:bg-white/10 transition-all group"
              >
                <p className="text-gold-light text-[11px] font-bold uppercase tracking-wider mb-1">Email Corporativo</p>
                <p className="text-sand text-xs font-semibold group-hover:text-gold-light transition-colors break-all">
                  relaxvr3@gmail.com
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Right map */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-gold/35 shadow-2xl">
            <iframe
              title="Ubicación Relax VR 360 Montería"
              src="https://maps.google.com/maps?q=Relax%20VR%20360%C2%B0%2C%20Calle%2042%20%2310-50%2C%20Monteria&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex items-center justify-between card-luxury-dark rounded-2xl px-6 py-4 border-gold/30">
            <div>
              <p className="font-display font-bold text-sand text-base">Relax VR 360° Montería</p>
              <p className="text-xs text-sand/70 mt-0.5">Calle 42 #10-50, Local 2, Los Laureles</p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs px-5 py-2.5 font-bold whitespace-nowrap shadow-md"
            >
              Cómo llegar ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
