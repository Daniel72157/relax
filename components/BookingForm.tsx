"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { generarSlotsDelDia, estaAbierto, formatearHora12 } from "@/lib/horarios";
import type { Servicio } from "@/lib/types";

function hoyMasDias(dias: number) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

const PASOS = ["Experiencia", "Modalidad", "Fecha y hora", "Tus datos"];

export default function BookingForm() {
  const router = useRouter();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioId, setServicioId] = useState("");
  const [fecha, setFecha] = useState(hoyMasDias(1));
  const [hora, setHora] = useState("");
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
  const [cargandoHoras, setCargandoHoras] = useState(false);

  const [modalidad, setModalidad] = useState<"individual" | "pareja">("individual");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [notas, setNotas] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setServicios(data);
          if (data[0]) setServicioId(data[0].id);
        }
      });
  }, []);

  const servicioSeleccionado = useMemo(
    () => servicios.find((s) => s.id === servicioId),
    [servicios, servicioId]
  );

  const pasoActual = useMemo(() => {
    if (!servicioId) return 1;
    if (!hora) return 3;
    if (!nombre || !telefono) return 4;
    return 4;
  }, [servicioId, hora, nombre, telefono]);

  useEffect(() => {
    if (!servicioSeleccionado || !fecha) return;
    setCargandoHoras(true);
    setHora("");

    supabase
      .from("citas")
      .select("hora")
      .eq("fecha", fecha)
      .neq("estado", "cancelada")
      .then(({ data }) => {
        const ocupadas = (data ?? []).map((c) => (c.hora ? c.hora.slice(0, 5) : ""));
        setHorasOcupadas(ocupadas);
        setCargandoHoras(false);
      });
  }, [fecha, servicioSeleccionado]);

  const todosLosSlots = useMemo(() => {
    if (!servicioSeleccionado || !estaAbierto(fecha)) return [];
    return generarSlotsDelDia(fecha, servicioSeleccionado.duracion_minutos);
  }, [servicioSeleccionado, fecha]);

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!servicioId || !fecha || !hora || !nombre || !telefono) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }

    setEnviando(true);

    const { data: choque } = await supabase
      .from("citas")
      .select("id")
      .eq("fecha", fecha)
      .eq("hora", hora)
      .neq("estado", "cancelada")
      .maybeSingle();

    if (choque) {
      setError("Ese horario acaba de ocuparse, por favor elige otro.");
      setEnviando(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from("citas")
      .insert({
        cliente_nombre: nombre,
        cliente_telefono: telefono,
        cliente_email: email || null,
        cliente_fecha_nacimiento: nacimiento || null,
        servicio_id: servicioId,
        modalidad,
        fecha,
        hora,
        estado: "pendiente",
        notas: notas || null
      })
      .select("id")
      .single();

    setEnviando(false);

    if (insertError || !data) {
      setError("No pudimos guardar tu reserva. Intenta de nuevo en un momento.");
      return;
    }

    router.push(`/reservar/confirmacion?id=${data.id}`);
  }

  return (
    <div className="card-luxury relative overflow-hidden p-6 sm:p-10 border-gold/30 shadow-2xl bg-white/90 backdrop-blur-md">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-gold/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <p className="font-body text-xs text-gold-dark uppercase tracking-widest font-semibold">
              Sistema Oficial de Agendamiento
            </p>
          </div>
          <p className="font-body text-xs text-ink/60">
            Sede Los Laureles · Calle 42 #10-50 Local 2 · Lunes a Sábado de 8:00 AM a 5:30 PM
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("abrir-chatbot-precios"))}
          className="text-left sm:text-right text-xs font-body text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-1"
        >
          <span>💬</span> ¿Deseas consultar las tarifas? <span className="underline font-semibold">Ver aquí</span>
        </button>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10">
        {PASOS.map((p, i) => {
          const completado = pasoActual > i + 1;
          const activo = pasoActual === i + 1;
          return (
            <div key={p} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    activo
                      ? "bg-gradient-to-tr from-gold-dark via-gold to-gold-light text-ink shadow-[0_0_15px_rgba(201,168,76,0.5)] font-bold scale-110"
                      : completado
                      ? "bg-moss text-sand"
                      : "border border-gold/30 text-ink/40 bg-sand/30"
                  }`}
                >
                  {completado ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline text-[11px] font-body text-ink/70">{p}</span>
              </div>
              {i < PASOS.length - 1 && (
                <span className={`w-6 sm:w-10 h-0.5 mb-0 sm:mb-4 ${pasoActual > i + 1 ? "bg-gold" : "bg-gold/20"}`} />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={manejarEnvio} className="space-y-10">
        {/* Paso 1: Selección de Experiencia (SIN PRECIOS) */}
        <fieldset>
          <div className="flex items-center justify-between mb-4">
            <legend className="font-display text-xl text-ink font-semibold flex items-center gap-2">
              <span className="text-gold">1.</span> Selecciona tu experiencia de bienestar:
            </legend>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {servicios.length === 0 && (
              <div className="col-span-full py-8 text-center text-ink/50 font-body">
                <span className="inline-block animate-spin mr-2">🌿</span> Cargando catálogo de experiencias…
              </div>
            )}
            {servicios.map((s) => {
              const seleccionado = servicioId === s.id;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setServicioId(s.id)}
                  className={`relative text-left rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border ${
                    seleccionado
                      ? "border-gold bg-gradient-to-br from-gold/10 via-white to-gold/5 shadow-[0_4px_20px_rgba(201,168,76,0.18)] ring-1 ring-gold"
                      : "border-moss/15 bg-white/70 hover:border-gold/50 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-[10px] text-gold-dark font-bold uppercase tracking-wider bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                        {s.linea}
                      </span>
                      <span className="font-body text-xs text-ink/70 bg-sand px-2.5 py-0.5 rounded-full font-medium border border-moss/10">
                        ⏱ {s.duracion_minutos} min
                      </span>
                    </div>
                    <p className="font-display text-base sm:text-lg text-ink font-bold mb-1.5">{s.nombre}</p>
                    <p className="text-xs text-ink/65 font-body line-clamp-2 leading-relaxed">{s.descripcion}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gold/15">
                    <span className="text-xs text-ink/50 font-body">Inmersión completa</span>
                    {seleccionado ? (
                      <span className="font-body text-xs text-gold-dark font-bold bg-gold/20 px-3 py-1 rounded-full flex items-center gap-1 border border-gold/30 shadow-sm">
                        <span>✓</span> Seleccionado
                      </span>
                    ) : (
                      <span className="font-body text-xs text-ink/50 hover:text-gold-dark font-medium">
                        Elegir experiencia →
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {servicioSeleccionado && (
            <div className="mt-4 p-4 rounded-xl bg-gold/5 border border-gold/20 flex items-start gap-3">
              <span className="text-lg">🌿</span>
              <div className="text-xs font-body text-ink/75 leading-relaxed">
                <p className="font-semibold text-ink mb-0.5">{servicioSeleccionado.nombre} ({servicioSeleccionado.duracion_minutos} minutos):</p>
                <p>{servicioSeleccionado.descripcion}</p>
              </div>
            </div>
          )}
        </fieldset>

        {/* Paso 2: Modalidad (SIN PRECIOS) */}
        <fieldset>
          <legend className="font-display text-xl text-ink font-semibold mb-4 flex items-center gap-2">
            <span className="text-gold">2.</span> Modalidad de asistencia:
          </legend>
          <div className="grid sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => setModalidad("individual")}
              className={`rounded-2xl border p-5 text-left font-body transition-all duration-300 flex flex-col justify-between ${
                modalidad === "individual"
                  ? "border-gold bg-gradient-to-br from-gold/10 via-white to-gold/5 shadow-[0_4px_20px_rgba(201,168,76,0.18)] ring-1 ring-gold"
                  : "border-moss/15 bg-white/70 hover:border-gold/50 hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display font-bold text-base text-ink">Sesión Individual</p>
                  <span className="text-xs bg-sand px-2 py-0.5 rounded-full text-ink/70">1 persona</span>
                </div>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Espacio 100% privado, cabina climatizada y aromaterapia personalizada para desconectar.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gold/15 flex items-center justify-between">
                <span className="text-xs text-gold-dark font-medium">Experiencia personal</span>
                {modalidad === "individual" && <span className="text-xs font-bold text-gold-dark">✓ Activo</span>}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setModalidad("pareja")}
              className={`relative rounded-2xl border p-5 text-left font-body transition-all duration-300 flex flex-col justify-between ${
                modalidad === "pareja"
                  ? "border-gold bg-gradient-to-br from-gold/10 via-white to-gold/5 shadow-[0_4px_20px_rgba(201,168,76,0.18)] ring-1 ring-gold"
                  : "border-moss/15 bg-white/70 hover:border-gold/50 hover:bg-white"
              }`}
            >
              <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-ink text-[10px] px-2.5 py-0.5 font-bold shadow-md uppercase tracking-wider">
                10% OFF DÚO
              </span>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display font-bold text-base text-ink">Sesión en Pareja / Dúo</p>
                  <span className="text-xs bg-sand px-2 py-0.5 rounded-full text-ink/70">2 personas</span>
                </div>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Cabina doble privada, sincronización sensorial y beneficio especial del 10% de descuento.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-gold/15 flex items-center justify-between">
                <span className="text-xs text-gold-dark font-medium">Cortesía especial para dos</span>
                {modalidad === "pareja" && <span className="text-xs font-bold text-gold-dark">✓ Activo</span>}
              </div>
            </button>
          </div>
        </fieldset>

        {/* Paso 3: Fecha y Hora */}
        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-ink font-semibold mb-2 flex items-center gap-2">
            <span className="text-gold">3.</span> Fecha y horario disponible:
          </legend>

          <div className="max-w-md">
            <label className="block text-xs font-medium text-ink/70 font-body mb-1.5">
              Selecciona el día de tu visita:
            </label>
            <input
              type="date"
              value={fecha}
              min={hoyMasDias(0)}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              required
            />
          </div>

          {!estaAbierto(fecha) && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-sm font-body">
              🌿 Ese día nuestras instalaciones permanecen cerradas. Por favor selecciona otra fecha de lunes a sábado.
            </div>
          )}

          {estaAbierto(fecha) && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-medium text-ink/70 font-body">
                Horas disponibles para {fecha}:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {cargandoHoras && (
                  <p className="col-span-full text-sm text-ink/60 font-body py-4 text-center">
                    ⏳ Verificando disponibilidad en tiempo real…
                  </p>
                )}
                {!cargandoHoras && todosLosSlots.length === 0 && (
                  <p className="col-span-full text-sm text-ink/60 font-body py-4 text-center">
                    No hay horarios disponibles para esta fecha. Intenta con otro día.
                  </p>
                )}
                {!cargandoHoras &&
                  todosLosSlots.map((s) => {
                    const ocupada = horasOcupadas.includes(s);
                    const seleccionada = hora === s;
                    return (
                      <button
                        type="button"
                        key={s}
                        disabled={ocupada}
                        onClick={() => !ocupada && setHora(s)}
                        className={`rounded-xl px-3.5 py-3 text-xs sm:text-sm font-body border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                          ocupada
                            ? "bg-stone-100 text-ink/30 border-stone-200 cursor-not-allowed line-through"
                            : seleccionada
                            ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-ink border-gold font-bold shadow-md scale-[1.03]"
                            : "bg-white border-gold/25 hover:border-gold hover:bg-gold/10 text-ink"
                        }`}
                      >
                        <span className="font-semibold">{formatearHora12(s)}</span>
                        {ocupada ? (
                          <span className="text-[10px] no-underline font-normal text-rose-500">Ocupado</span>
                        ) : seleccionada ? (
                          <span className="text-[10px] font-medium text-ink">✓ Seleccionado</span>
                        ) : (
                          <span className="text-[10px] font-normal text-gold-dark">Disponible</span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </fieldset>

        {/* Paso 4: Tus Datos */}
        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-ink font-semibold mb-2 flex items-center gap-2">
            <span className="text-gold">4.</span> Datos del titular de la reserva:
          </legend>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/80 font-body mb-1">
                Nombre completo *
              </label>
              <input
                placeholder="Nombre y apellido"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink placeholder:text-ink/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/80 font-body mb-1">
                WhatsApp de confirmación *
              </label>
              <input
                placeholder="Ej: 3001234567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink placeholder:text-ink/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/80 font-body mb-1">
                Correo electrónico (opcional)
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink placeholder:text-ink/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/80 font-body mb-1 flex items-center gap-1">
                <span>🎂</span> Fecha de nacimiento (para 15% OFF en tu mes):
              </label>
              <input
                type="date"
                value={nacimiento}
                onChange={(e) => setNacimiento(e.target.value)}
                className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/80 font-body mb-1">
              Notas, requerimientos especiales o aromas preferidos (opcional)
            </label>
            <textarea
              placeholder="¿Alguna condición particular, celebración especial o preferencia que debamos tener en cuenta?"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full rounded-xl border border-gold/30 px-4 py-3 font-body bg-white text-ink placeholder:text-ink/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              rows={3}
            />
          </div>
        </fieldset>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-body">
            ⚠️ {error}
          </div>
        )}

        {/* Botón de Confirmación Luxury */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={enviando || !hora}
            className="w-full btn-gold py-4 text-base tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            {enviando ? (
              <span>⏳ Procesando tu cita…</span>
            ) : (
              <span>
                Confirmar Reserva Oficial
                {servicioSeleccionado ? ` · ${servicioSeleccionado.nombre}` : ""}
              </span>
            )}
          </button>

          <p className="text-center text-xs text-ink/50 font-body mt-3">
            🔒 Tu reserva quedará agendada al instante. Recibirás confirmación por WhatsApp de nuestro equipo.
          </p>
        </div>
      </form>
    </div>
  );
}
