// Edge Function programada para ejecutarse el día 1 de cada mes.
// Busca todos los clientes cuyo mes de nacimiento coincide con el mes actual
// (tomando el mes de la fecha de nacimiento más reciente registrada por
// número de WhatsApp) y les envía la plantilla de cumpleaños.
//
// Programar con Supabase Scheduled Triggers (Dashboard → Edge Functions →
// birthday-notifier → Cron) usando la expresión: 0 9 1 * *  (día 1, 9:00 a.m.)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { sendWhatsappTemplate } from "../_shared/whatsapp.ts";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async () => {
  const ahora = new Date();
  const mesActual = ahora.getMonth() + 1; // 1-12
  const referencia = `${ahora.getFullYear()}-${String(mesActual).padStart(2, "0")}`;

  // Trae un cliente por número de WhatsApp con su fecha de nacimiento más reciente
  const { data: clientes, error } = await supabaseAdmin
    .from("citas")
    .select("cliente_nombre, cliente_telefono, cliente_fecha_nacimiento")
    .not("cliente_fecha_nacimiento", "is", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Deduplicar por teléfono, quedándonos con el registro más reciente
  const porTelefono = new Map<string, { nombre: string; telefono: string; nacimiento: string }>();
  for (const c of clientes ?? []) {
    porTelefono.set(c.cliente_telefono, {
      nombre: c.cliente_nombre,
      telefono: c.cliente_telefono,
      nacimiento: c.cliente_fecha_nacimiento
    });
  }

  const cumpleañerosDelMes = Array.from(porTelefono.values()).filter((c) => {
    const mesNacimiento = Number(c.nacimiento.split("-")[1]);
    return mesNacimiento === mesActual;
  });

  const resultados = [];

  for (const cliente of cumpleañerosDelMes) {
    // Evita reenviar si ya se le envió este mes (tabla mensajes_enviados)
    const { data: yaEnviado } = await supabaseAdmin
      .from("mensajes_enviados")
      .select("id")
      .eq("cliente_telefono", cliente.telefono)
      .eq("tipo", "cumpleanos")
      .eq("referencia", referencia)
      .maybeSingle();

    if (yaEnviado) continue;

    try {
      await sendWhatsappTemplate(cliente.telefono, "feliz_cumpleanos", [cliente.nombre]);
      await supabaseAdmin.from("mensajes_enviados").insert({
        cliente_telefono: cliente.telefono,
        tipo: "cumpleanos",
        referencia
      });
      resultados.push({ telefono: cliente.telefono, enviado: true });
    } catch (e) {
      resultados.push({ telefono: cliente.telefono, enviado: false, error: String(e) });
    }
  }

  return new Response(JSON.stringify({ mes: referencia, resultados }), {
    headers: { "Content-Type": "application/json" }
  });
});
