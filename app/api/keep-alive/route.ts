import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Forzar ejecución dinámica en cada petición (evita que Next.js o Vercel sirvan respuestas en caché)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Endpoint de mantenimiento automático para mantener activo el proyecto de Supabase
export async function GET() {
  try {
    const { count, error } = await supabase
      .from("servicios")
      .select("id", { count: "exact", head: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        ok: true,
        mensaje: "Ping a Supabase exitoso. Base de datos activa.",
        servicios: count,
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
        }
      }
    );
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

