"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Cliente = {
  nombre: string;
  telefono: string;
  email: string | null;
  nacimiento: string | null;
  diaNacimiento: number | null;
  mesNacimiento: number | null; // 1-12
  totalCitas: number;
  origen: "cita" | "club_cumpleanos" | "ambos";
};

const MESES = [
  { id: 0, nombre: "Todos los meses" },
  { id: 1, nombre: "Enero" },
  { id: 2, nombre: "Febrero" },
  { id: 3, nombre: "Marzo" },
  { id: 4, nombre: "Abril" },
  { id: 5, nombre: "Mayo" },
  { id: 6, nombre: "Junio" },
  { id: 7, nombre: "Julio" },
  { id: 8, nombre: "Agosto" },
  { id: 9, nombre: "Septiembre" },
  { id: 10, nombre: "Octubre" },
  { id: 11, nombre: "Noviembre" },
  { id: 12, nombre: "Diciembre" }
];

export default function AdminClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mesFiltro, setMesFiltro] = useState<number>(0);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function cargarClientes() {
      setCargando(true);
      const mapa = new Map<string, Cliente>();

      // 1. Obtener clientes de citas
      const { data: citasData } = await supabase
        .from("citas")
        .select("cliente_nombre, cliente_telefono, cliente_email, cliente_fecha_nacimiento");

      (citasData ?? []).forEach((c) => {
        const tel = c.cliente_telefono.trim();
        if (!tel) return;

        let dia: number | null = null;
        let mes: number | null = null;

        if (c.cliente_fecha_nacimiento) {
          const partes = c.cliente_fecha_nacimiento.split("-");
          if (partes.length >= 3) {
            mes = Number(partes[1]);
            dia = Number(partes[2]);
          }
        }

        const existente = mapa.get(tel);
        if (existente) {
          existente.totalCitas += 1;
          if (!existente.nacimiento && c.cliente_fecha_nacimiento) {
            existente.nacimiento = c.cliente_fecha_nacimiento;
            existente.diaNacimiento = dia;
            existente.mesNacimiento = mes;
          }
        } else {
          mapa.set(tel, {
            nombre: c.cliente_nombre,
            telefono: tel,
            email: c.cliente_email,
            nacimiento: c.cliente_fecha_nacimiento,
            diaNacimiento: dia,
            mesNacimiento: mes,
            totalCitas: 1,
            origen: "cita"
          });
        }
      });

      // 2. Obtener clientes del Club de Cumpleaños
      const { data: clubData } = await supabase
        .from("suscriptores_cumpleanos")
        .select("nombre, telefono, email, dia_nacimiento, mes_nacimiento");

      (clubData ?? []).forEach((s) => {
        const tel = s.telefono.trim();
        if (!tel) return;

        const existente = mapa.get(tel);
        if (existente) {
          existente.origen = "ambos";
          if (!existente.mesNacimiento) {
            existente.diaNacimiento = s.dia_nacimiento;
            existente.mesNacimiento = s.mes_nacimiento;
            existente.nacimiento = `${s.dia_nacimiento} de ${MESES[s.mes_nacimiento]?.nombre}`;
          }
        } else {
          mapa.set(tel, {
            nombre: s.nombre,
            telefono: tel,
            email: s.email,
            nacimiento: `${s.dia_nacimiento} de ${MESES[s.mes_nacimiento]?.nombre}`,
            diaNacimiento: s.dia_nacimiento,
            mesNacimiento: s.mes_nacimiento,
            totalCitas: 0,
            origen: "club_cumpleanos"
          });
        }
      });

      setClientes(Array.from(mapa.values()));
      setCargando(false);
    }

    cargarClientes();
  }, []);

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      // Filtro por mes
      const coincideMes = mesFiltro === 0 || c.mesNacimiento === mesFiltro;

      // Filtro por búsqueda de texto
      const termino = busqueda.toLowerCase().trim();
      const coincideBusqueda =
        !termino ||
        c.nombre.toLowerCase().includes(termino) ||
        c.telefono.includes(termino) ||
        (c.email && c.email.toLowerCase().includes(termino));

      return coincideMes && coincideBusqueda;
    });
  }, [clientes, mesFiltro, busqueda]);

  function formatearCumple(c: Cliente) {
    if (!c.mesNacimiento) return "—";
    const nombreMes = MESES[c.mesNacimiento]?.nombre ?? "";
    if (c.diaNacimiento) {
      return `${c.diaNacimiento} de ${nombreMes}`;
    }
    return `Mes de ${nombreMes}`;
  }

  function armarMensajeWhatsapp(c: Cliente) {
    const texto = `¡Hola ${c.nombre}! 🎉 De parte del equipo de Relax VR 360° Montería queremos desearte un muy feliz mes de cumpleaños. Recuerda que tienes un 15% OFF en cualquiera de nuestras experiencias de bienestar. ¿Te gustaría agendar tu cita especial?`;
    const tel = c.telefono.replace(/\D/g, "");
    const telCompleto = tel.startsWith("57") ? tel : `57${tel}`;
    return `https://wa.me/${telCompleto}?text=${encodeURIComponent(texto)}`;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Directorio de Clientes</h1>
          <p className="font-body text-sm text-ink/60 mt-1">
            Gestiona clientes de reservas y miembros del Club de Cumpleaños.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-moss/10 px-4 py-2 rounded-2xl border border-moss/20">
          <span className="text-xs font-body text-moss-dark font-medium">Total registrados:</span>
          <span className="font-display text-lg text-moss-dark">{clientes.length}</span>
        </div>
      </div>

      {/* Controles de Filtros */}
      <div className="bg-white rounded-2xl border border-moss/15 p-4 sm:p-5 mb-6 grid sm:grid-cols-2 gap-4">
        {/* Selector de Meses */}
        <div>
          <label className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
            🎂 Filtrar por mes de cumpleaños:
          </label>
          <select
            value={mesFiltro}
            onChange={(e) => setMesFiltro(Number(e.target.value))}
            className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-moss-dark"
          >
            {MESES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id === 0 ? "🎂 Todos los meses" : `📅 ${m.nombre}`}
              </option>
            ))}
          </select>
        </div>

        {/* Buscador de texto */}
        <div>
          <label className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
            🔍 Buscar cliente (nombre, teléfono o email):
          </label>
          <input
            type="text"
            placeholder="Ej: Daniel, 3001234567..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss-dark"
          />
        </div>
      </div>

      {/* Tabla de Clientes */}
      {cargando ? (
        <p className="font-body text-ink/60 py-10 text-center">Cargando directorio de clientes…</p>
      ) : clientesFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl border border-moss/15 p-10 text-center">
          <p className="font-body text-ink/60">
            No se encontraron clientes para el filtro seleccionado.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-moss/15 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-moss/10 text-left border-b border-moss/15">
              <tr>
                <th className="px-4 py-3.5 font-medium">Cliente</th>
                <th className="px-4 py-3.5 font-medium">WhatsApp</th>
                <th className="px-4 py-3.5 font-medium">Correo</th>
                <th className="px-4 py-3.5 font-medium">Cumpleaños</th>
                <th className="px-4 py-3.5 font-medium text-center">Citas</th>
                <th className="px-4 py-3.5 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
                <tr key={c.telefono} className="border-t border-moss/10 hover:bg-moss/5 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-ink">{c.nombre}</p>
                    {c.origen === "club_cumpleanos" && (
                      <span className="inline-block mt-0.5 text-[10px] bg-gold/20 text-gold-dark font-medium px-2 py-0.5 rounded-full">
                        Club Cumpleaños
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-ink/80">{c.telefono}</td>
                  <td className="px-4 py-3.5 text-ink/70">{c.email ?? "—"}</td>
                  <td className="px-4 py-3.5">
                    {c.mesNacimiento ? (
                      <span className="font-medium text-moss-dark bg-moss/10 px-2.5 py-1 rounded-full text-xs whitespace-nowrap">
                        🎂 {formatearCumple(c)}
                      </span>
                    ) : (
                      <span className="text-ink/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-center font-medium">{c.totalCitas}</td>
                  <td className="px-4 py-3.5 text-right">
                    <a
                      href={armarMensajeWhatsapp(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#25D366]/15 text-[#128C7E] hover:bg-[#25D366]/25 border border-[#25D366]/30 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      <span>💬</span>
                      <span>Saludar WhatsApp</span>
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
