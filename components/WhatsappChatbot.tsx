"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Servicio } from "@/lib/types";
import {
  CHATBOT_OPCIONES,
  CHATBOT_SALUDO,
  CHATBOT_NO_ENTENDIDO
} from "@/lib/chatbotResponses";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

type Mensaje = {
  autor: "bot" | "usuario";
  texto: string;
};

function formatearTextoConLinks(texto: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const partes = texto.split(urlRegex);

  return partes.map((parte, i) => {
    if (parte.match(urlRegex)) {
      return (
        <a
          key={i}
          href={parte}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold text-gold-light hover:text-gold break-all inline-block mt-1 transition-colors"
        >
          {parte.includes("maps") ? "📍 Abrir mapa de ubicación" : parte}
        </a>
      );
    }
    return parte;
  });
}

function construirRespuestaPrecios(listaServicios: Servicio[]) {
  if (!listaServicios || listaServicios.length === 0) {
    return (
      "✨ *Tarifas Oficiales Relax VR 360° Montería:*\n\n" +
      "Estamos sincronizando nuestras tarifas en tiempo real. Por favor indícanos qué experiencia te interesa o consúltanos por WhatsApp."
    );
  }

  // Agrupar por línea
  const lineasMap = new Map<string, Servicio[]>();
  listaServicios.forEach((s) => {
    const l = s.linea || "Experiencias de Bienestar";
    if (!lineasMap.has(l)) {
      lineasMap.set(l, []);
    }
    lineasMap.get(l)!.push(s);
  });

  let respuesta = "✨ *Tarifas Oficiales (Directo de nuestro catálogo en vivo):*\n\n";

  lineasMap.forEach((items, linea) => {
    respuesta += `🌟 *${linea}:*\n`;
    items.forEach((s) => {
      respuesta += `• *${s.nombre}* (${s.duracion_minutos} min): $${s.precio.toLocaleString("es-CO")} COP\n`;
    });
    respuesta += "\n";
  });

  respuesta += "🎁 *Descuentos Especiales:*\n";
  respuesta += "• *Cabina Dúo / Parejas:* 10% OFF en sesión para 2 personas.\n";
  respuesta += "• *Club Cumpleaños:* 15% OFF durante todo tu mes de cumpleaños.\n\n";
  respuesta += "¿Deseas agendar tu cita para alguna de estas experiencias?";

  return respuesta;
}

function construirRespuestaServicios(listaServicios: Servicio[]) {
  if (!listaServicios || listaServicios.length === 0) {
    return (
      "Tenemos 5 experiencias inmersivas que combinan masaje relajante, calor térmico con gemas volcánicas, aromaterapia botánica doTERRA CPTG y Realidad Virtual 360°."
    );
  }

  let respuesta = "🌿 *Catálogo de Experiencias Disponibles en Base de Datos:*\n\n";
  listaServicios.forEach((s) => {
    respuesta += `• *${s.nombre}* (${s.duracion_minutos} min - ${s.linea}):\n  ${s.descripcion}\n\n`;
  });
  respuesta += "¿Deseas consultar las tarifas de alguna en particular o agendar tu cita?";

  return respuesta;
}

function resolverRespuesta(textoUsuario: string, listaServicios: Servicio[]) {
  const texto = textoUsuario.toLowerCase();

  // Comprobar si pregunta por precios o tarifas
  const palabrasPrecios = ["precio", "precios", "tarifa", "tarifas", "cuesta", "cuestan", "vale", "valen", "costo", "costos", "valor", "valores"];
  const esPreguntaPrecio = palabrasPrecios.some((p) => texto.includes(p));

  if (esPreguntaPrecio) {
    // Si menciona un servicio específico
    const matchServicio = listaServicios.find((s) => {
      const nombreMin = s.nombre.toLowerCase();
      return (
        texto.includes(nombreMin) ||
        (nombreMin.includes("gold premium") && (texto.includes("gold premium") || texto.includes("premium"))) ||
        (nombreMin.includes("gold") && !nombreMin.includes("premium") && texto.includes("gold") && !texto.includes("premium")) ||
        (nombreMin.includes("ritual premium") && (texto.includes("ritual premium") || texto.includes("ritual 60"))) ||
        (nombreMin.includes("ritual") && !nombreMin.includes("premium") && texto.includes("ritual")) ||
        (nombreMin.includes("facial") && texto.includes("facial"))
      );
    });

    if (matchServicio && !texto.includes("todos") && !texto.includes("lista") && !texto.includes("catálogo") && !texto.includes("catalogo")) {
      return (
        `✨ *${matchServicio.nombre}*\n` +
        `• *Duración:* ${matchServicio.duracion_minutos} minutos\n` +
        `• *Precio oficial:* $${matchServicio.precio.toLocaleString("es-CO")} COP\n` +
        `• *Línea:* ${matchServicio.linea}\n` +
        `• *Detalle:* ${matchServicio.descripcion}\n\n` +
        `¿Deseas agendar esta experiencia o consultar otra tarifa?`
      );
    }

    return construirRespuestaPrecios(listaServicios);
  }

  // Comprobar si pregunta por servicios o qué experiencias ofrecen
  const palabrasServicios = ["servicio", "servicios", "experiencia", "experiencias", "que ofrecen", "qué ofrecen", "que hacen", "qué hacen", "masaje", "masajes", "rituales"];
  const esPreguntaServicio = palabrasServicios.some((p) => texto.includes(p));

  if (esPreguntaServicio) {
    return construirRespuestaServicios(listaServicios);
  }

  // Búsqueda en opciones predefinidas restantes
  const coincidencia = CHATBOT_OPCIONES.find((op) => op.palabrasClave.some((p) => texto.includes(p)));
  if (coincidencia) {
    if (coincidencia.id === "precios") {
      return construirRespuestaPrecios(listaServicios);
    }
    if (coincidencia.id === "servicios") {
      return construirRespuestaServicios(listaServicios);
    }
    return coincidencia.respuesta;
  }

  return CHATBOT_NO_ENTENDIDO;
}

export default function WhatsappChatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mostrarGlobo, setMostrarGlobo] = useState(true);
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ autor: "bot", texto: CHATBOT_SALUDO }]);
  const [entrada, setEntrada] = useState("");
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const finRef = useRef<HTMLDivElement>(null);

  // Cargar servicios en tiempo real desde Supabase
  useEffect(() => {
    supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setServicios(data);
        }
      });
  }, []);

  useEffect(() => {
    if (abierto) {
      finRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes, abierto]);

  const responderCon = useCallback((texto: string) => {
    setMensajes((prev) => [...prev, { autor: "bot", texto }]);
  }, []);

  // Listener para abrir chatbot desde otros componentes con precios en vivo de la BD
  useEffect(() => {
    const handleAbrirPrecios = async () => {
      setAbierto(true);
      setMostrarGlobo(false);

      // Si aún no han cargado los servicios en el state, cargarlos directo
      let lista = servicios;
      if (lista.length === 0) {
        const { data } = await supabase
          .from("servicios")
          .select("*")
          .eq("activo", true)
          .order("orden", { ascending: true });
        if (data) {
          lista = data;
          setServicios(data);
        }
      }

      const respuestaPrecios = construirRespuestaPrecios(lista);
      setMensajes((prev) => [
        ...prev,
        { autor: "usuario", texto: "¿Cuáles son las tarifas oficiales de las experiencias?" },
        { autor: "bot", texto: respuestaPrecios }
      ]);
    };

    const handleAbrirGeneral = () => {
      setAbierto(true);
      setMostrarGlobo(false);
    };

    window.addEventListener("abrir-chatbot-precios", handleAbrirPrecios);
    window.addEventListener("abrir-chatbot", handleAbrirGeneral);

    return () => {
      window.removeEventListener("abrir-chatbot-precios", handleAbrirPrecios);
      window.removeEventListener("abrir-chatbot", handleAbrirGeneral);
    };
  }, [servicios]);

  function manejarOpcion(preguntaId: string) {
    const opcion = CHATBOT_OPCIONES.find((o) => o.id === preguntaId);
    if (!opcion) return;

    setMensajes((prev) => [...prev, { autor: "usuario", texto: opcion.pregunta }]);

    setTimeout(() => {
      if (preguntaId === "precios") {
        responderCon(construirRespuestaPrecios(servicios));
      } else if (preguntaId === "servicios") {
        responderCon(construirRespuestaServicios(servicios));
      } else {
        responderCon(opcion.respuesta);
      }
    }, 300);
  }

  function enviarLibre(e: React.FormEvent) {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto) return;

    setMensajes((prev) => [...prev, { autor: "usuario", texto }]);
    setEntrada("");

    const respuestaDinamica = resolverRespuesta(texto, servicios);
    setTimeout(() => {
      responderCon(respuestaDinamica);
    }, 300);
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-body">
      {/* Ventana de Chat Flotante */}
      {abierto && (
        <div className="fixed bottom-20 right-3 sm:right-6 sm:bottom-24 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[min(560px,calc(100dvh-6.5rem))] bg-[#404637] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-gold/40 flex flex-col overflow-hidden z-50 animate-fadeIn">
          {/* Cabecera del Chat */}
          <div className="relative bg-[#33382C] text-sand px-5 py-4 flex items-center justify-between shrink-0 border-b border-gold/30 shadow-md">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-base shadow-sm">
                <span>✨</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#404637] shadow-sm animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold text-sm text-sand">Relax Concierge VR</p>
                  <span className="gold-pill-dark text-[9px] py-0.5 px-2">24/7 EN LÍNEA</span>
                </div>
                <p className="text-[11px] text-sand/80 font-medium">Tarifas oficiales en vivo desde base de datos</p>
              </div>
            </div>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar chat"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold text-sand hover:text-ink flex items-center justify-center text-sm font-bold leading-none transition-all duration-200 border border-white/10"
            >
              ✕
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#282D22] scrollbar-thin">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  m.autor === "bot"
                    ? "bg-[#33382C] text-sand border border-gold/25 shadow-md mr-auto rounded-tl-sm whitespace-pre-line"
                    : "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-[#12140D] font-bold ml-auto rounded-tr-sm shadow-md"
                }`}
              >
                {formatearTextoConLinks(m.texto)}
              </div>
            ))}
            <div ref={finRef} />
          </div>

          {/* Preguntas Frecuentes Sugeridas con Botones Dinámicos */}
          <div className="px-3.5 py-3 border-t border-gold/25 bg-[#33382C] flex flex-nowrap overflow-x-auto gap-2 scrollbar-none shrink-0">
            {CHATBOT_OPCIONES.slice(0, 6).map((op) => (
              <button
                key={op.id}
                onClick={() => manejarOpcion(op.id)}
                className="text-[11px] whitespace-nowrap rounded-full border border-gold/40 bg-[#404637] px-3.5 py-1.5 text-gold-light hover:bg-gold hover:text-ink font-bold transition-all duration-200 shrink-0 shadow-sm"
              >
                {op.id === "precios" ? "💰 Consultar tarifas (BD)" : op.pregunta}
              </button>
            ))}
          </div>

          {/* Formulario de Entrada */}
          <form onSubmit={enviarLibre} className="flex items-center border-t border-gold/30 bg-[#404637] px-3 py-2 shrink-0 gap-2">
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Pregunta por precios, servicios, horarios..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm outline-none bg-[#33382C] text-sand placeholder:text-sand/50 rounded-xl border border-gold/25 focus:border-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl btn-gold text-xs sm:text-sm font-bold shadow-md"
            >
              Enviar
            </button>
          </form>

          {/* Enlace directo a WhatsApp humano */}
          <div className="bg-[#24291E] border-t border-gold/15 px-4 py-2 text-center shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Relax VR 360°, deseo atención personalizada con un asesor.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-sand/80 hover:text-gold-light transition-colors inline-flex items-center justify-center gap-1.5 font-medium"
            >
              <span>💬</span> ¿Prefieres hablar con un asesor en WhatsApp? <span className="underline font-bold text-gold-light">Clic aquí</span>
            </a>
          </div>
        </div>
      )}

      {/* Botón Flotante con efecto Glow dorado */}
      <div className="relative flex items-center">
        {mostrarGlobo && !abierto && (
          <div className="hidden sm:flex items-center gap-2 mr-3 bg-[#404637] text-sand border border-gold/40 shadow-2xl px-4 py-2.5 rounded-full text-xs animate-bounce">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-bold text-sand">¿Consultas o tarifas?</span>
            <button
              onClick={() => setMostrarGlobo(false)}
              className="text-sand/60 hover:text-sand ml-1"
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setAbierto(!abierto);
            setMostrarGlobo(false);
          }}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light text-ink shadow-[0_4px_25px_rgba(201,168,76,0.5)] hover:shadow-[0_4px_35px_rgba(201,168,76,0.8)] hover:scale-105 transition-all duration-300 border-2 border-white/40"
          aria-label="Asistente virtual y chatbot de precios"
        >
          {abierto ? (
            <span className="text-xl font-bold">✕</span>
          ) : (
            <div className="relative flex items-center justify-center">
              <span className="text-2xl">✨</span>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#404637]"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
