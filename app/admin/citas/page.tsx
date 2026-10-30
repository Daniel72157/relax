"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Cita } from "@/lib/types";

type CitaConServicio = Cita & { servicios: { nombre: string } | null };

const ESTADOS: { id: Cita["estado"] | "todos"; label: string; color: string }[] = [
  { id: "todos", label: "Todos los estados", color: "bg-ink/5 text-ink" },
  { id: "pendiente", label: "Pendientes", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: "confirmada", label: "Confirmadas", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: "completada", label: "Completadas", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "cancelada", label: "Canceladas", color: "bg-rose-100 text-rose-800 border-rose-300" }
];

export default function AdminCitasPage() {
  const [citas, setCitas] = useState<CitaConServicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardandoId, setGuardandoId] = useState<string | null>(null);

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<Cita["estado"] | "todos">("todos");

  async function cargar() {
    setCargando(true);
    const { data, error } = await supabase
      .from("citas")
      .select("*, servicios(nombre)")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    if (error) {
      console.error("Error al cargar citas:", error);
    } else {
      setCitas((data as any) ?? []);
    }
    setCargando(false);
  }

  useEffect(() => {
    void cargar();
  }, []);

  async function cambiarEstado(id: string, estado: Cita["estado"]) {
    setGuardandoId(id);
    const { error } = await supabase.from("citas").update({ estado }).eq("id", id);
    if (!error) {
      setCitas((prev) => prev.map((c) => (c.id === id ? { ...c, estado } : c)));
    } else {
      alert("Error al actualizar el estado de la cita");
    }
    setGuardandoId(null);
  }

  // Filtrado reactivo en memoria
  const citasFiltradas = useMemo(() => {
    return citas.filter((c) => {
      // 1. Filtro por estado
      const coincideEstado = estadoFiltro === "todos" || c.estado === estadoFiltro;

      // 2. Filtro por fecha específica seleccionada
      const coincideFecha = !fechaFiltro || c.fecha === fechaFiltro;

      // 3. Filtro por búsqueda de texto (nombre, teléfono, correo, servicio o notas)
      const termino = busqueda.toLowerCase().trim();
      const coincideBusqueda =
        !termino ||
        c.cliente_nombre.toLowerCase().includes(termino) ||
        c.cliente_telefono.includes(termino) ||
        (c.cliente_email && c.cliente_email.toLowerCase().includes(termino)) ||
        (c.servicios?.nombre && c.servicios.nombre.toLowerCase().includes(termino)) ||
        (c.notas && c.notas.toLowerCase().includes(termino)) ||
        c.fecha.includes(termino) ||
        c.hora.includes(termino);

      return coincideEstado && coincideFecha && coincideBusqueda;
    });
  }, [citas, estadoFiltro, fechaFiltro, busqueda]);

  // Formato para enlaces rápidos de fecha
  function setFechaRapida(opcion: "hoy" | "manana" | "todas") {
    if (opcion === "todas") {
      setFechaFiltro("");
      return;
    }
    const d = new Date();
    if (opcion === "manana") {
      d.setDate(d.getDate() + 1);
    }
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setFechaFiltro(`${yyyy}-${mm}-${dd}`);
  }

  function armarMensajeWhatsApp(c: CitaConServicio) {
    const texto = `¡Hola ${c.cliente_nombre}! Te saludamos de Relax VR 360° Montería 🌿. Queremos confirmar los detalles de tu cita para la experiencia ${c.servicios?.nombre ?? "de bienestar"} (${c.modalidad === "pareja" ? "Sesión en Pareja" : "Individual"}) agendada para el ${c.fecha} a las ${c.hora}. ¿Tienes alguna duda o requerimiento previo?`;
    const tel = c.cliente_telefono.replace(/\D/g, "");
    const telCompleto = tel.startsWith("57") ? tel : `57${tel}`;
    return `https://wa.me/${telCompleto}?text=${encodeURIComponent(texto)}`;
  }

  function getEstadoBadgeClass(estado: Cita["estado"]) {
    switch (estado) {
      case "confirmada":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pendiente":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "completada":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelada":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }

  return (
    <div>
      {/* Encabezado y Estadísticas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Panel de Citas</h1>
          <p className="font-body text-sm text-ink/60 mt-1">
            Busca, filtra y gestiona todas las reservas de experiencias en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={cargar}
            disabled={cargando}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-moss/20 text-xs font-body font-medium text-ink hover:bg-moss/5 transition-colors shadow-sm"
          >
            <span>🔄</span>
            <span>{cargando ? "Actualizando…" : "Refrescar"}</span>
          </button>
          <div className="flex items-center gap-2 bg-moss/10 px-4 py-2 rounded-xl border border-moss/20">
            <span className="text-xs font-body text-moss-dark font-medium">Citas encontradas:</span>
            <span className="font-display text-lg text-moss-dark font-semibold">
              {citasFiltradas.length} <span className="text-xs font-normal text-ink/40">/ {citas.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="bg-white rounded-2xl border border-moss/15 p-4 sm:p-5 mb-6 shadow-sm space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Buscador de Texto General */}
          <div className="md:col-span-1">
            <label htmlFor="filtro-busqueda" className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
              🔍 Buscar por nombre, número o servicio:
            </label>
            <div className="relative">
              <input
                id="filtro-busqueda"
                type="text"
                placeholder="Ej: Marcela, 3235056242, Relax Gold..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss-dark pr-8"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-sm"
                  title="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filtro por Fecha */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="filtro-fecha" className="block text-xs font-medium text-ink/70 font-body">
                📅 Filtrar por fecha:
              </label>
              <div className="flex gap-1.5 text-[11px] font-body text-moss-dark font-medium">
                <button
                  type="button"
                  onClick={() => setFechaRapida("hoy")}
                  className="hover:underline"
                >
                  Hoy
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setFechaRapida("manana")}
                  className="hover:underline"
                >
                  Mañana
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setFechaRapida("todas")}
                  className="hover:underline text-ink/50"
                >
                  Todas
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                id="filtro-fecha"
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
                className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-moss-dark"
              />
              {fechaFiltro && (
                <button
                  onClick={() => setFechaFiltro("")}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-xs bg-white px-1.5 py-0.5 rounded border border-moss/20"
                  title="Ver todas las fechas"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Filtro por Estado */}
          <div>
            <label htmlFor="filtro-estado" className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
              📌 Filtrar por estado:
            </label>
            <select
              id="filtro-estado"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value as Cita["estado"] | "todos")}
              className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-moss-dark"
            >
              {ESTADOS.map((est) => (
                <option key={est.id} value={est.id}>
                  {est.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Indicador de filtros activos y botón de reset */}
        {(busqueda || fechaFiltro || estadoFiltro !== "todos") && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-moss/10 text-xs font-body text-ink/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Filtros aplicados:</span>
              {busqueda && (
                <span className="bg-moss/10 text-moss-dark px-2.5 py-0.5 rounded-full border border-moss/20">
                  Texto: "{busqueda}"
                </span>
              )}
              {fechaFiltro && (
                <span className="bg-moss/10 text-moss-dark px-2.5 py-0.5 rounded-full border border-moss/20">
                  Fecha: {fechaFiltro}
                </span>
              )}
              {estadoFiltro !== "todos" && (
                <span className="bg-moss/10 text-moss-dark px-2.5 py-0.5 rounded-full border border-moss/20">
                  Estado: {estadoFiltro}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setBusqueda("");
                setFechaFiltro("");
                setEstadoFiltro("todos");
              }}
              className="text-moss-dark underline font-medium hover:text-moss"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </div>

      {/* Tabla de Citas */}
      {cargando ? (
        <div className="bg-white rounded-2xl border border-moss/15 p-12 text-center">
          <p className="font-body text-ink/60">Cargando panel de citas…</p>
        </div>
      ) : citasFiltradas.length === 0 ? (
        <div className="bg-white rounded-2xl border border-moss/15 p-12 text-center">
          <p className="font-body text-base text-ink/80 font-medium mb-1">
            No se encontraron citas con los criterios seleccionados
          </p>
          <p className="font-body text-xs text-ink/50 mb-4">
            Prueba ajustando el texto de búsqueda, cambiando la fecha o el estado.
          </p>
          {(busqueda || fechaFiltro || estadoFiltro !== "todos") && (
            <button
              onClick={() => {
                setBusqueda("");
                setFechaFiltro("");
                setEstadoFiltro("todos");
              }}
              className="px-4 py-2 rounded-xl bg-moss text-sand text-xs font-body font-medium hover:bg-moss-dark transition-colors"
            >
              Mostrar todas las citas
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-moss/15 shadow-sm">
          <table className="w-full text-sm font-body">
            <thead className="bg-moss/10 text-left border-b border-moss/15">
              <tr>
                <th className="px-4 py-3.5 font-medium">Fecha & Hora</th>
                <th className="px-4 py-3.5 font-medium">Cliente</th>
                <th className="px-4 py-3.5 font-medium">WhatsApp</th>
                <th className="px-4 py-3.5 font-medium">Experiencia / Modalidad</th>
                <th className="px-4 py-3.5 font-medium">Estado</th>
                <th className="px-4 py-3.5 font-medium text-right">Contacto</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((c) => (
                <tr key={c.id} className="border-t border-moss/10 hover:bg-moss/5 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="font-medium text-ink">{c.fecha}</p>
                    <p className="text-xs text-ink/60 mt-0.5">⏰ {c.hora}</p>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-medium text-ink">{c.cliente_nombre}</p>
                    {c.cliente_email && (
                      <p className="text-xs text-ink/50 truncate max-w-[180px]">{c.cliente_email}</p>
                    )}
                    {c.notas && (
                      <p className="text-[11px] text-ink/60 bg-sand/50 rounded px-1.5 py-0.5 mt-1 italic max-w-[220px]">
                        📝 {c.notas}
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-ink/80 whitespace-nowrap">
                    {c.cliente_telefono}
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-medium text-ink">{c.servicios?.nombre ?? "Experiencia General"}</p>
                    <span
                      className={`inline-block mt-0.5 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        c.modalidad === "pareja"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-moss/10 text-moss-dark border border-moss/20"
                      }`}
                    >
                      {c.modalidad === "pareja" ? "👥 Cabina Dúo / Pareja" : "👤 Individual"}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <select
                      value={c.estado}
                      disabled={guardandoId === c.id}
                      onChange={(e) => cambiarEstado(c.id, e.target.value as Cita["estado"])}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-moss-dark transition-colors ${getEstadoBadgeClass(
                        c.estado
                      )}`}
                    >
                      <option value="pendiente">🟡 Pendiente</option>
                      <option value="confirmada">🟢 Confirmada</option>
                      <option value="completada">🔵 Completada</option>
                      <option value="cancelada">🔴 Cancelada</option>
                    </select>
                  </td>

                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <a
                      href={armarMensajeWhatsApp(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 border border-[#25D366]/30 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                      title="Enviar mensaje de confirmación por WhatsApp"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
