// Edge Function que envía la confirmación de cita por WhatsApp.
// Conéctala como "Database Webhook" en Supabase:
//   Dashboard → Database → Webhooks → Create a new hook
//   Tabla: citas · Evento: INSERT · Tipo: HTTP Request → esta función
//
// Requiere una plantilla aprobada en Meta Business Manager, por ejemplo:
//   Nombre: cita_confirmada
//   Cuerpo: "Hola {{1}}, tu cita en Relax VR 360° quedó registrada para el
//            {{2}} a las {{3}}. Si necesitas cambiarla, escríbenos por este medio."

import { sendWhatsappTemplate } from "../_shared/whatsapp.ts";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    // Supabase Database Webhooks envían { type, table, record, old_record }
    const cita = payload.record;

    if (!cita?.cliente_telefono) {
      return new Response(JSON.stringify({ ok: false, error: "Sin teléfono" }), { status: 400 });
    }

    await sendWhatsappTemplate(cita.cliente_telefono, "cita_confirmada", [
      cita.cliente_nombre,
      cita.fecha,
      cita.hora
    ]);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
});
