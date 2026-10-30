import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

export const metadata = {
  title: "Reserva Confirmada | Relax VR 360° Montería",
  description: "Tu reserva ha sido recibida con éxito en Relax VR 360° Montería."
};

export default async function ConfirmacionPage({
  searchParams
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;

  const { data: cita } = id
    ? await supabase
      .from("citas")
      .select("id, fecha, hora, cliente_nombre, servicios(nombre, duracion_minutos)")
      .eq("id", id)
      .maybeSingle()
    : { data: null };

  const nombreServicio = (cita as any)?.servicios?.nombre ?? "Experiencia de Bienestar";
  const duracion = (cita as any)?.servicios?.duracion_minutos;

  const mensajeWhatsapp = cita
    ? encodeURIComponent(
      `Hola Relax VR 360°, confirmo mi reserva:\n` +
      `• Experiencia: ${nombreServicio}\n` +
      `• Fecha: ${cita.fecha}\n` +
      `• Hora: ${cita.hora}\n` +
      `• A nombre de: ${cita.cliente_nombre}`
    )
    : encodeURIComponent("Hola Relax VR 360°, quiero confirmar mi reserva agendada en la página.");

  return (
    <main className="bg-sand min-h-screen">
      <Header />

      {/* Luxury Confirmation Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-2xl text-center">
          {/* Card Ticket VIP */}
          <div className="card-luxury relative overflow-hidden bg-white/95 backdrop-blur-md p-8 sm:p-12 shadow-2xl border-2 border-gold/40 text-ink">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-300 flex items-center justify-center text-3xl mx-auto mb-6 shadow-md animate-bounce">
              ✓
            </div>

            <span className="gold-pill mb-3 inline-block">
              ✨ Solicitud Registrada con Éxito
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              {cita ? `¡Todo listo, ${cita.cliente_nombre}!` : "Hemos recibido tu solicitud"}
            </h1>

            {cita ? (
              <div className="bg-sand/40 border border-gold/30 rounded-2xl p-6 mb-8 text-left space-y-3 font-body">
                <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                  <span className="text-xs uppercase tracking-wider text-gold-dark font-bold">Experiencia:</span>
                  <span className="font-display font-bold text-base text-ink">{nombreServicio}</span>
                </div>
                {duracion && (
                  <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                    <span className="text-xs text-ink/60">Duración:</span>
                    <span className="text-xs font-semibold text-ink">⏱ {duracion} minutos</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                  <span className="text-xs text-ink/60">Fecha agendada:</span>
                  <span className="text-sm font-semibold text-ink">📅 {cita.fecha}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink/60">Hora reservada:</span>
                  <span className="text-sm font-semibold text-gold-dark">⏰ {cita.hora}</span>
                </div>
              </div>
            ) : (
              <p className="font-body text-ink/70 mb-8 text-sm sm:text-base leading-relaxed">
                Tu cita ha quedado registrada en nuestro sistema de agenda. Te esperamos en nuestra sede Los Laureles.
              </p>
            )}

            <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed mb-8 max-w-md mx-auto">
              Para garantizar tu franja horaria sin contratiempos, te recomendamos enviar la confirmación inmediata por WhatsApp a nuestro equipo de recepción.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${mensajeWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-4 px-8 text-base font-bold shadow-xl tracking-wide flex items-center justify-center gap-2"
              >
                <span>💬</span> Confirmar por WhatsApp
              </a>
              <Link
                href="/mis-citas"
                className="btn-luxury py-4 px-6 text-sm font-semibold"
              >
                Ver Mis Citas
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/15 text-xs text-ink/50 font-body">
              📍 Sede Los Laureles · Calle 42 #10-50 Local 2, Montería, Córdoba
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
