"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Servicio } from "@/lib/types";

const VACIO: Partial<Servicio> = {
  nombre: "",
  descripcion: "",
  duracion_minutos: 60,
  precio: 0,
  activo: true
};

export default function AdminServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [nuevo, setNuevo] = useState<Partial<Servicio>>(VACIO);

  async function cargar() {
    const { data } = await supabase.from("servicios").select("*").order("nombre");
    setServicios(data ?? []);
  }

  useEffect(() => {
    void cargar();
  }, []);

  async function crear(e: React.FormEvent) {
    e.preventDefault();
    if (!nuevo.nombre) return;
    await supabase.from("servicios").insert(nuevo);
    setNuevo(VACIO);
    void cargar();
  }

  async function actualizar(s: Servicio) {
    await supabase
      .from("servicios")
      .update({
        nombre: s.nombre,
        descripcion: s.descripcion,
        duracion_minutos: s.duracion_minutos,
        precio: s.precio,
        activo: s.activo
      })
      .eq("id", s.id);
    void cargar();
  }

  function actualizarLocal(id: string, cambios: Partial<Servicio>) {
    setServicios((prev) => prev.map((s) => (s.id === id ? { ...s, ...cambios } : s)));
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Servicios</h1>

      <div className="space-y-4 mb-12">
        {servicios.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-moss/15 p-5 grid sm:grid-cols-[2fr_1fr_1fr_auto_auto] gap-3 items-center">
            <input
              value={s.nombre}
              onChange={(e) => actualizarLocal(s.id, { nombre: e.target.value })}
              className="rounded-lg border border-moss/25 px-3 py-2"
            />
            <input
              type="number"
              value={s.duracion_minutos}
              onChange={(e) => actualizarLocal(s.id, { duracion_minutos: Number(e.target.value) })}
              className="rounded-lg border border-moss/25 px-3 py-2"
            />
            <input
              type="number"
              value={s.precio}
              onChange={(e) => actualizarLocal(s.id, { precio: Number(e.target.value) })}
              className="rounded-lg border border-moss/25 px-3 py-2"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={s.activo}
                onChange={(e) => actualizarLocal(s.id, { activo: e.target.checked })}
              />
              Activo
            </label>
            <button
              onClick={() => actualizar(s)}
              className="rounded-full bg-moss-dark text-sand px-4 py-2 text-sm hover:bg-moss"
            >
              Guardar
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={crear} className="bg-white rounded-2xl border border-moss/15 p-6 space-y-3">
        <h2 className="font-display text-xl mb-2">Nuevo servicio</h2>
        <input
          placeholder="Nombre (ej: Relax Ritual)"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          className="w-full rounded-lg border border-moss/25 px-3 py-2"
        />
        <textarea
          placeholder="Descripción"
          value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
          className="w-full rounded-lg border border-moss/25 px-3 py-2"
        />
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Duración (min)"
            value={nuevo.duracion_minutos}
            onChange={(e) => setNuevo({ ...nuevo, duracion_minutos: Number(e.target.value) })}
            className="rounded-lg border border-moss/25 px-3 py-2 w-40"
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevo.precio}
            onChange={(e) => setNuevo({ ...nuevo, precio: Number(e.target.value) })}
            className="rounded-lg border border-moss/25 px-3 py-2 w-40"
          />
        </div>
        <button type="submit" className="rounded-full bg-moss-dark text-sand px-6 py-2.5 hover:bg-moss">
          Crear servicio
        </button>
      </form>
    </div>
  );
}
