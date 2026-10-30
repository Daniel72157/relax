"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const MODULOS = [
  {
    titulo: "Convenio Relax Empresarial",
    subtitulo: "Jornadas In-Site en las instalaciones de su empresa",
    tag: "In-Site Móvil",
    texto:
      "Llevamos estaciones portátiles de masaje corporal, aromaterapia botánica y bienestar sensorial a las sedes de su organización sin interrumpir la dinámica operativa.",
    beneficios: [
      "Incremento comprobado en la motivación y bienestar laboral (Employee Engagement)",
      "Espacios de recuperación neurosensorial para renovar el enfoque y la productividad",
      "Fortalecimiento visible del clima organizacional y cultura de autocuidado",
      "Estaciones de masaje con gemas térmicas y aromaterapia doTERRA"
    ]
  },
  {
    titulo: "Convenio Preferencial Corporativo",
    subtitulo: "Alianza institucional sin costos fijos",
    tag: "Alianza 0 Costo",
    texto:
      "Una alianza comercial que brinda tarifas preferenciales permanentes para todos los colaboradores y directivos de su empresa en cualquiera de nuestras experiencias en sede.",
    beneficios: [
      "Tarifa preferencial corporativa permanente para todo el personal y directivos",
      "Sin costos fijos ni cuotas de mantenimiento para la empresa aliada",
      "Beneficio de bienestar extralegal altamente valorado por los colaboradores",
      "Atención prioritaria y agenda flexible en sede Los Laureles"
    ]
  },
  {
    titulo: "Programa «Reconocer»",
    subtitulo: "Experiencias grupales y regalos institucionales",
    tag: "Incentivos VIP",
    texto:
      "Bienestar y desconexión diseñados para equipos de alto rendimiento, cierres de proyectos o regalos corporativos con condiciones preferenciales por volumen.",
    beneficios: [
      "Planes corporativos escalonados a partir de 5 experiencias",
      "Tarjetas de Regalo físicas en relieve dorado o digitales de alta fidelidad",
      "Facturación electrónica y reportes de atención para gestión humana",
      "Atención en cabina dúo e individual en horarios exclusivos"
    ]
  }
];

export default function Empresas() {
  const [empresa, setEmpresa] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [telefono, setTelefono] = useState("");
  const [numeroExperiencias, setNumeroExperiencias] = useState("5 a 9 experiencias");
  const [modalidad, setModalidad] = useState("Tarjetas de Regalo");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    if (!empresa || !solicitante || !telefono) return;
    setEnviando(true);
    await supabase.from("cotizaciones_empresariales").insert({
      empresa,
      solicitante,
      telefono,
      numero_experiencias: numeroExperiencias,
      modalidad
    });
    setEnviando(false);
    setEnviado(true);
  }

  return (
    <section id="corporativo" className="relative overflow-hidden mx-auto max-w-7xl px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="gold-pill mb-3">🏢 Bienestar Organizacional & B2B</span>
        <h2 className="font-display text-4xl sm:text-5xl text-ink font-bold mb-4">
          Soluciones corporativas & <span className="gold-text">planes para empresas</span>
        </h2>
        <p className="font-body text-ink/80 text-base sm:text-lg leading-relaxed">
          Potencia el rendimiento, reduce el estrés laboral y recompensa el talento de tu equipo con experiencias multisensoriales únicas en Montería.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {MODULOS.map((m, i) => (
          <div
            key={m.titulo}
            className="card-luxury relative p-8 flex flex-col justify-between shadow-xl border-gold/30 hover:-translate-y-1 transition-transform"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="gold-pill text-[10px]">{m.tag}</span>
                <span className="text-xs font-display text-gold-dark font-bold">Módulo 0{i + 1}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-1">{m.titulo}</h3>
              <p className="font-body text-xs font-semibold text-gold-dark mb-3">{m.subtitulo}</p>
              <p className="font-body text-xs text-ink/75 leading-relaxed mb-5">{m.texto}</p>

              <div className="border-t border-gold/15 pt-4">
                <p className="text-[11px] font-bold text-ink uppercase tracking-wider mb-2.5">Beneficios clave:</p>
                <ul className="font-body text-xs text-ink/80 space-y-2">
                  {m.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-gold-dark font-bold text-xs mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario Corporativo Luxury con Fondo Oscuro Real */}
      <div id="formulario-corporativo" className="card-luxury-dark relative p-8 sm:p-12 grid md:grid-cols-2 gap-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex flex-col justify-between">
          <div>
            <span className="gold-pill-dark text-xs mb-3 shadow-sm inline-block">
              ✨ Atención Ejecutiva Directa
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-sand font-bold mb-4 leading-tight">
              Cotiza tu propuesta institucional o jornada in-site
            </h3>
            <p className="font-body text-sand/85 text-sm sm:text-base leading-relaxed mb-6">
              Diseñamos una propuesta personalizada según el número de colaboradores, objetivos de salud ocupacional y presupuesto. Contamos con facturación electrónica y atención preferencial.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-gold/30 text-xs text-sand/85 font-body space-y-1">
            <p className="font-bold text-gold-light">⚡ Respuesta garantizada:</p>
            <p>Atención y propuesta formal en menos de 2 horas hábiles vía WhatsApp o correo institucional.</p>
          </div>
        </div>

        {enviado ? (
          <div className="card-luxury bg-white text-ink p-8 flex flex-col items-center justify-center text-center shadow-xl border-gold/40 animate-fadeIn">
            <span className="text-4xl mb-3">🤝</span>
            <h4 className="font-display text-2xl font-bold mb-2">¡Solicitud recibida!</h4>
            <p className="font-body text-sm text-ink/75 max-w-sm">
              Nuestro equipo corporativo revisará los datos de {empresa} y te contactará de inmediato con la propuesta ajustada.
            </p>
          </div>
        ) : (
          <form onSubmit={manejarEnvio} className="card-luxury bg-white text-ink p-8 sm:p-10 space-y-4 shadow-2xl border-gold/40">
            <div className="pb-2 border-b border-gold/15">
              <p className="font-display font-bold text-lg text-ink">Formulario de Cotización Institucional</p>
              <p className="font-body text-xs text-ink/60">Completa los datos de tu empresa</p>
            </div>

            <div>
              <label htmlFor="empresa-nombre" className="block text-xs font-bold text-ink/80 font-body mb-1">Empresa u Organización *</label>
              <input
                id="empresa-nombre"
                placeholder="Nombre de la empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-2.5 font-body bg-sand/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label htmlFor="empresa-solicitante" className="block text-xs font-bold text-ink/80 font-body mb-1">Nombre del Solicitante / Cargo *</label>
              <input
                id="empresa-solicitante"
                placeholder="Ej: Laura Castro (Gestión Humana)"
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-2.5 font-body bg-sand/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label htmlFor="empresa-telefono" className="block text-xs font-bold text-ink/80 font-body mb-1">WhatsApp o Celular Corporativo *</label>
              <input
                id="empresa-telefono"
                placeholder="Ej: 3001234567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-2.5 font-body bg-sand/30 text-ink text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="empresa-experiencias" className="block text-xs font-bold text-ink/80 font-body mb-1">Experiencias</label>
                <select
                  id="empresa-experiencias"
                  value={numeroExperiencias}
                  onChange={(e) => setNumeroExperiencias(e.target.value)}
                  className="w-full rounded-xl border border-gold/30 px-3 py-2.5 font-body bg-sand/30 text-ink text-xs focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option>5 a 9 experiencias</option>
                  <option>10 a 25 experiencias</option>
                  <option>+25 experiencias</option>
                </select>
              </div>

              <div>
                <label htmlFor="empresa-modalidad" className="block text-xs font-bold text-ink/80 font-body mb-1">Modalidad</label>
                <select
                  id="empresa-modalidad"
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="w-full rounded-xl border border-gold/30 px-3 py-2.5 font-body bg-sand/30 text-ink text-xs focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option>Tarjetas de Regalo</option>
                  <option>Jornada In-Site</option>
                  <option>Convenio en Sede</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full btn-gold py-3.5 text-center block text-sm font-bold shadow-xl tracking-wide disabled:opacity-50"
            >
              {enviando ? "Enviando cotización…" : "🏢 Solicitar Propuesta Empresarial"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
