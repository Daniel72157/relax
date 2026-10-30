import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";
const MAPS_URL = "https://maps.app.goo.gl/L87SZfPKzMmKD3oL6";

const SOCIAL = [
  { href: `https://wa.me/${WHATSAPP}`, icon: "whatsapp", label: "WhatsApp", sub: "+57 323 505 6242" },
  { href: "mailto:relaxvr3@gmail.com", icon: "mail", label: "Email", sub: "relaxvr3@gmail.com" },
  { href: "https://www.instagram.com/vr360m", icon: "instagram", label: "Instagram", sub: "@vr360m" },
  { href: "https://www.tiktok.com/@relaxvrmtr", icon: "tiktok", label: "TikTok", sub: "@relaxvrmtr" },
  { href: "https://www.facebook.com/profile.php?id=61586707487995", icon: "facebook", label: "Facebook", sub: "Relax VR 360°" }
];

const NAV = [
  { href: "/#que-es", label: "¿Qué es Relax VR 360°?" },
  { href: "/#experiencias", label: "Catálogo de experiencias" },
  { href: "/#viaje-bienestar", label: "Tu viaje de bienestar" },
  { href: "/#simulador-360", label: "Simulador 360° en vivo" },
  { href: "/#ciencia", label: "Ciencia & bienestar VR" },
  { href: "/#descuentos", label: "Planes & parejas" },
  { href: "/#tarjetas-regalo", label: "Tarjetas de regalo" },
  { href: "/#corporativo", label: "Soluciones corporativas" },
  { href: "/mis-citas", label: "Consultar mi cita" },
  { href: "/politica-privacidad", label: "Política de privacidad" }
];

// Iconos de línea (trazo), heredan el color del texto con currentColor
const ICONS: Record<string, ReactNode> = {
  whatsapp: (
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {ICONS[name]}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="section-dark relative text-sand/80 overflow-hidden">
      {/* Gold top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10 text-sm font-body">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link
            href="/"
            aria-label="Relax VR 360° Montería"
            className="inline-block mb-5 bg-sand rounded-2xl px-4 py-2 border border-gold/40 hover:border-gold transition-all shadow-md"
          >
            <Image
              src="/images/logo.png"
              alt="Relax VR 360° Montería"
              width={140}
              height={57}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-sand/75 text-xs leading-relaxed mb-5">
            Primer centro de bienestar inmersivo en Montería. Realidad Virtual 360°, masajes
            botánicos con aceites doTERRA®, aromaterapia y sonidos binaurales.
          </p>
          <div className="space-y-0.5 text-[11px] text-sand/60">
            <p>Gerente: Eylin Sánchez Pastrana</p>
            <p>Razón social: Relax VR 360° S.A.S.</p>
            <p>NIT · Cámara de Comercio de Montería</p>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h4 className="text-sand font-display font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            Sede & Horarios
          </h4>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-3 hover:text-gold-light transition-colors group"
          >
            <p className="font-semibold text-sand group-hover:text-gold-light">Calle 42 #10-50 Local 2</p>
            <p className="text-xs text-sand/70">Los Laureles · Montería, Córdoba 📍</p>
          </a>
          <div className="space-y-1 text-xs text-sand/75">
            <p><span className="text-sand font-bold">Lun–Sáb:</span> 8:00 a.m. – 5:30 p.m.</p>
            <p><span className="text-sand font-bold">Dom / festivos:</span> Cerrado</p>
            <p className="text-gold-light font-medium mt-2">Corporativo: cita previa</p>
          </div>
        </div>

        {/* Social / Contact */}
        <div>
          <h4 className="text-sand font-display font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            Contacto Oficial
          </h4>
          <ul className="space-y-3">
            {SOCIAL.map(({ href, icon, label, sub }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-white hover:text-gold-light transition-colors group"
                >
                  <SocialIcon name={icon} />
                  <span className="text-xs font-medium text-sand/80 group-hover:text-gold-light">
                    {sub}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sand font-display font-bold text-base mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            Navegación
          </h4>
          <ul className="space-y-2 text-xs">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sand/70 hover:text-gold-light font-medium transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5 text-xs text-sand/60 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>© {new Date().getFullYear()} RELAX VR 360° MONTERÍA S.A.S. · Todos los derechos reservados.</p>
        <p className="text-gold font-medium">Diseñado para tu bienestar y serenidad ✦</p>
      </div>
    </footer>
  );
}