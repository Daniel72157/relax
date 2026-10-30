"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const SECCIONES = [
  { href: "/#que-es", label: "¿Qué es?" },
  { href: "/#experiencias", label: "Experiencias" },
  { href: "/#viaje-bienestar", label: "El Viaje" },
  { href: "/#simulador-360", label: "Simulador 360°" },
  { href: "/#test-bienestar", label: "Test Estrés" },
  { href: "/#cumpleanos", label: "Cumpleaños" },
  { href: "/#corporativo", label: "Empresas" },
  { href: "/#visitanos", label: "Ubicación" }
];

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(201,168,76,0.25),0_4px_24px_rgba(0,0,0,0.08)]"
          : "bg-sand/80 backdrop-blur-md shadow-none"
      }`}
    >
      {/* Gold top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 group" aria-label="Relax VR 360° - Inicio">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="Relax VR 360° - Centro de Relajación"
              width={160}
              height={65}
              priority
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden xl:flex items-center gap-0.5 font-body text-xs 2xl:text-sm text-ink/75">
          {SECCIONES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="relative px-3 py-1.5 rounded-full hover:text-ink transition-colors group whitespace-nowrap"
            >
              <span className="relative z-10">{s.label}</span>
              <span className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-colors duration-200" />
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            href="/mis-citas"
            className="rounded-full border border-gold/40 px-4 py-2 text-xs sm:text-sm font-body text-gold-dark hover:bg-gold/10 hover:border-gold/70 transition-all whitespace-nowrap"
          >
            Mi cita
          </Link>

          <Link
            href="/reservar"
            className="btn-gold rounded-full px-5 py-2 text-xs sm:text-sm font-body tracking-wide whitespace-nowrap"
          >
            AGENDAR CITA
          </Link>
        </div>

        {/* Menú móvil */}
        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className="xl:hidden h-9 w-9 flex items-center justify-center rounded-full border border-gold/30 hover:bg-gold/10 hover:border-gold/60 transition-all"
          aria-label="Abrir menú"
        >
          <span className="font-body text-xl leading-none text-ink/70">{menuAbierto ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <nav className="xl:hidden border-t border-gold/20 bg-white/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-3 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-1.5 pb-4 border-b border-gold/15">
            {SECCIONES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMenuAbierto(false)}
                className="py-2 px-3 rounded-xl hover:bg-gold/10 text-ink/80 text-xs sm:text-sm font-body transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/mis-citas"
              onClick={() => setMenuAbierto(false)}
              className="rounded-full border border-gold/40 py-2.5 text-center text-sm font-body text-gold-dark hover:bg-gold/10 transition-all"
            >
              Mi cita
            </Link>
            <Link
              href="/reservar"
              onClick={() => setMenuAbierto(false)}
              className="btn-gold rounded-full py-2.5 text-center text-sm font-body"
            >
              AGENDAR CITA
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
