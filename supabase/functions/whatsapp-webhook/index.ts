// Webhook oficial de WhatsApp Cloud API (Meta) para respuestas automáticas
// reales dentro de WhatsApp — no solo en la página web.
//
// Esto es OPCIONAL y avanzado: requiere una app de Meta Business con el
// producto "WhatsApp" habilitado y el número de WhatsApp Business verificado.
//
// Configuración en Meta:
//   URL de callback: https://TU-PROYECTO.functions.supabase.co/whatsapp-webhook
//   Token de verificación: el mismo valor que WHATSAPP_VERIFY_TOKEN
//
// Sin este paso, el botón de WhatsApp del sitio sigue funcionando con el
// chatbot en pantalla (components/WhatsappChatbot.tsx) + el enlace wa.me
// para hablar con una persona real.

import { sendWhatsappText } from "../_shared/whatsapp.ts";

const VERIFY_TOKEN = Deno.env.get("WHATSAPP_VERIFY_TOKEN")!;

type Opcion = { respuesta: string; palabrasClave: string[] };

const OPCIONES: Opcion[] = [
  {
    respuesta:
      "Atendemos de lunes a viernes de 8:00 a.m. a 12:00 m. y de 2:00 a 6:00 p.m. Sábados de 8:00 a.m. a 6:00 p.m. Domingos y festivos cerrado.",
    palabrasClave: ["horario", "hora", "abren", "cierran"]
  },
  {
    respuesta:
      "Estamos en la Calle 42 #10-50, Local 2, Barrio Los Laureles, Montería, Córdoba: https://www.google.com/maps/search/?api=1&query=Calle+42+%2310-50+Local+2+Barrio+Los+Laureles+Monter%C3%ADa+Cordoba+Colombia",
    palabrasClave: ["ubicación", "direccion", "dirección", "llegar", "mapa"]
  },
  {
    respuesta:
      "Ofrecemos experiencias multisensoriales como Relax Ritual y Relax Gold, combinando masaje relajante, piedras volcánicas, aromaterapia doTERRA y realidad virtual 360°.",
    palabrasClave: ["servicio", "masaje", "ritual", "gold", "experiencia"]
  },
  {
    respuesta:
      "Puedes reservar en línea aquí: " + (Deno.env.get("SITE_URL") ?? "") + "/reservar",
    palabrasClave: ["reservar", "agendar", "cita", "turno"]
  },
  {
    respuesta:
      "Diseñamos pausas activas y bienestar empresarial para equipos de trabajo. Cuéntanos cuántas personas son.",
    palabrasClave: ["empresa", "empresarial", "corporativo"]
  }
];

const RESPUESTA_DEFECTO =
  "¡Hola! Gracias por escribirnos a Relax VR 360° Montería. En un momento un asesor te responderá personalmente. Mientras tanto, puedes reservar tu cita en " +
  (Deno.env.get("SITE_URL") ?? "") +
  "/reservar";

function buscarRespuesta(texto: string): string {
  const t = texto.toLowerCase();
  const encontrada = OPCIONES.find((op) => op.palabrasClave.some((p) => t.includes(p)));
  return encontrada?.respuesta ?? RESPUESTA_DEFECTO;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // --- Verificación del webhook (Meta la llama una sola vez al configurar) ---
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge ?? "", { status: 200 });
    }
    return new Response("Token inválido", { status: 403 });
  }

  // --- Mensajes entrantes ---
  if (req.method === "POST") {
    const body = await req.json();

    try {
      const cambios = body.entry?.[0]?.changes?.[0]?.value;
      const mensaje = cambios?.messages?.[0];

      if (mensaje?.type === "text") {
        const telefono = mensaje.from;
        const texto = mensaje.text.body as string;
        const respuesta = buscarRespuesta(texto);
        await sendWhatsappText(telefono, respuesta);
      }
    } catch (e) {
      console.error("Error procesando mensaje de WhatsApp:", e);
    }

    // Meta requiere responder 200 rápido para no reintentar el envío
    return new Response("EVENT_RECEIVED", { status: 200 });
  }

  return new Response("Método no soportado", { status: 405 });
});
