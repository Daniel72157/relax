// Envía un mensaje de texto libre usando la API oficial de WhatsApp Cloud (Meta).
// Requiere que el número de destino le haya escrito primero en las últimas 24h,
// EXCEPTO si usas una plantilla aprobada (ver sendWhatsappTemplate más abajo),
// que es lo recomendado para el mensaje de cumpleaños (mensaje "fuera de ventana").

const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_CLOUD_API_TOKEN")!;
const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID")!;

function urlGraph() {
  return `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;
}

/** Mensaje de texto libre (solo funciona dentro de la ventana de 24h de conversación). */
export async function sendWhatsappText(telefono: string, texto: string) {
  const res = await fetch(urlGraph(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: telefono,
      type: "text",
      text: { body: texto }
    })
  });
  return res.json();
}

/**
 * Mensaje por plantilla aprobada en Meta Business Manager. Úsalo para el saludo
 * de cumpleaños, ya que es un mensaje iniciado por el negocio (fuera de la
 * ventana de 24h) y Meta EXIGE una plantilla aprobada para esos casos.
 *
 * Debes crear en Meta Business Manager una plantilla, por ejemplo:
 *   Nombre: feliz_cumpleanos
 *   Idioma: es
 *   Cuerpo: "¡Feliz mes de cumpleaños, {{1}}! De parte de todo el equipo de
 *            Relax VR 360° Montería queremos regalarte un momento de
 *            relajación. Escríbenos y agenda tu sesión especial este mes. 🎉"
 */
export async function sendWhatsappTemplate(
  telefono: string,
  nombrePlantilla: string,
  parametros: string[]
) {
  const res = await fetch(urlGraph(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: telefono,
      type: "template",
      template: {
        name: nombrePlantilla,
        language: { code: "es" },
        components: [
          {
            type: "body",
            parameters: parametros.map((texto) => ({ type: "text", text: texto }))
          }
        ]
      }
    })
  });
  return res.json();
}
