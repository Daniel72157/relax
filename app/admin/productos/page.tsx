"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { ProductoDoterra } from "@/lib/types";

const CATEGORIAS_PREDEFINIDAS = [
  "Aceites Simples",
  "Mezclas Patentadas",
  "Cuidado Terapéutico",
  "Difusores & Bienestar"
];

const PRODUCTO_VACIO: Omit<ProductoDoterra, "id"> = {
  nombre: "",
  categoria: "Aceites Simples",
  descripcion: "",
  beneficios: "",
  tamano: "15 ml",
  precio: 0,
  imagen_url: "",
  activo: true,
  destacado: false,
  orden: 0
};

export default function AdminProductosPage() {

  const [productos, setProductos] = useState<ProductoDoterra[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [nuevo, setNuevo] = useState<Omit<ProductoDoterra, "id">>(PRODUCTO_VACIO);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [mensajeEstado, setMensajeEstado] = useState<{ tipo: "exito" | "error"; texto: string } | null>(null);

  async function cargar() {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from("productos_doterra")
        .select("*")
        .order("orden", { ascending: true });

      if (error) {
        console.error("Error al cargar productos:", error);
      } else {
        setProductos((data as ProductoDoterra[]) ?? []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargar();
  }, []);

  function mostrarNotificacion(tipo: "exito" | "error", texto: string) {
    setMensajeEstado({ tipo, texto });
    setTimeout(() => setMensajeEstado(null), 4000);
  }

  async function crearProducto(e: React.FormEvent) {
    e.preventDefault();
    if (!nuevo.nombre.trim()) {
      mostrarNotificacion("error", "El nombre del producto es obligatorio.");
      return;
    }

    setGuardando(true);
    try {
      const { error } = await supabase.from("productos_doterra").insert({
        ...nuevo,
        orden: nuevo.orden || productos.length + 1
      });

      if (error) {
        mostrarNotificacion("error", `Error al crear producto: ${error.message}`);
      } else {
        mostrarNotificacion("exito", `Producto "${nuevo.nombre}" creado exitosamente.`);
        setNuevo(PRODUCTO_VACIO);
        setMostrarFormulario(false);
        void cargar();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      mostrarNotificacion("error", msg);
    } finally {
      setGuardando(false);
    }
  }

  async function actualizarProducto(p: ProductoDoterra) {
    try {
      const { error } = await supabase
        .from("productos_doterra")
        .update({
          nombre: p.nombre,
          categoria: p.categoria,
          tamano: p.tamano,
          precio: p.precio,
          descripcion: p.descripcion,
          beneficios: p.beneficios,
          imagen_url: p.imagen_url,
          activo: p.activo,
          destacado: p.destacado,
          orden: p.orden
        })
        .eq("id", p.id);

      if (error) {
        mostrarNotificacion("error", `Error al actualizar: ${error.message}`);
      } else {
        mostrarNotificacion("exito", `Producto "${p.nombre}" actualizado.`);
        void cargar();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      mostrarNotificacion("error", msg);
    }
  }

  async function eliminarProducto(id: string, nombre: string) {
    if (!window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) return;

    try {
      const { error } = await supabase.from("productos_doterra").delete().eq("id", id);
      if (error) {
        mostrarNotificacion("error", `Error al eliminar: ${error.message}`);
      } else {
        mostrarNotificacion("exito", `Producto "${nombre}" eliminado.`);
        void cargar();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      mostrarNotificacion("error", msg);
    }
  }

  function actualizarLocal(id: string, cambios: Partial<ProductoDoterra>) {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...cambios } : p))
    );
  }

  // Filtros
  const categoriasDisponibles = useMemo(() => {
    const set = new Set<string>(CATEGORIAS_PREDEFINIDAS);
    productos.forEach((p) => {
      if (p.categoria) set.add(p.categoria);
    });
    return ["Todas", ...Array.from(set)];
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCat = filtroCategoria === "Todas" || p.categoria === filtroCategoria;
      const q = busqueda.toLowerCase().trim();
      const coincideBusqueda =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q) ||
        p.beneficios?.toLowerCase().includes(q);

      return coincideCat && coincideBusqueda;
    });
  }, [productos, filtroCategoria, busqueda]);


  return (
    <div>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">Catálogo de Productos doTERRA</h1>
          <p className="font-body text-sm text-ink/60 mt-1">
            Gestiona los aceites esenciales, mezclas y difusores visibles en el catálogo web y cotizaciones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="rounded-full bg-moss-dark text-sand px-5 py-2.5 text-sm font-body hover:bg-moss transition-colors shadow-sm"
          >
            {mostrarFormulario ? "✕ Cerrar Formulario" : "＋ Subir Nuevo Producto"}
          </button>
        </div>
      </div>

      {/* Alerta de Estado */}
      {mensajeEstado && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-sm font-body ${
            mensajeEstado.tipo === "exito"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {mensajeEstado.texto}
        </div>
      )}

      {/* Formulario de Registro de Producto */}
      {mostrarFormulario && (
        <form
          onSubmit={crearProducto}
          className="bg-white rounded-3xl border border-moss/20 p-6 sm:p-8 mb-10 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-moss/10 pb-3 mb-4">
            <h2 className="font-display text-xl text-ink">Registrar Nuevo Producto doTERRA</h2>
            <span className="text-xs bg-gold/20 text-gold-dark px-2.5 py-1 rounded-full font-medium">
              Certificación CPTG
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nuevo-nombre" className="block text-xs font-medium text-ink/70 mb-1">
                Nombre del Producto *
              </label>
              <input
                id="nuevo-nombre"
                type="text"
                placeholder="Ej: Aceite Esencial Lavanda (Lavender)"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
                required
              />
            </div>

            <div>
              <label htmlFor="nuevo-categoria" className="block text-xs font-medium text-ink/70 mb-1">
                Categoría
              </label>
              <select
                id="nuevo-categoria"
                value={nuevo.categoria}
                onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
                className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
              >
                {CATEGORIAS_PREDEFINIDAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="nuevo-tamano" className="block text-xs font-medium text-ink/70 mb-1">
                Presentación / Tamaño
              </label>
              <input
                id="nuevo-tamano"
                type="text"
                placeholder="Ej: 15 ml, 5 ml, 120 ml, Unidad"
                value={nuevo.tamano}
                onChange={(e) => setNuevo({ ...nuevo, tamano: e.target.value })}
                className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
              />
            </div>

            <div>
              <label htmlFor="nuevo-precio" className="block text-xs font-medium text-ink/70 mb-1">
                Precio (COP) *
              </label>
              <input
                id="nuevo-precio"
                type="number"
                placeholder="Ej: 125000"
                value={nuevo.precio || ""}
                onChange={(e) => setNuevo({ ...nuevo, precio: Number(e.target.value) })}
                className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
                required
              />
            </div>

            <div>
              <label htmlFor="nuevo-orden" className="block text-xs font-medium text-ink/70 mb-1">
                Orden de Visualización
              </label>
              <input
                id="nuevo-orden"
                type="number"
                placeholder="Ej: 1"
                value={nuevo.orden}
                onChange={(e) => setNuevo({ ...nuevo, orden: Number(e.target.value) })}
                className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nuevo-descripcion" className="block text-xs font-medium text-ink/70 mb-1">
              Descripción Breve
            </label>
            <textarea
              id="nuevo-descripcion"
              rows={2}
              placeholder="Descripción sensorial y origen del producto..."
              value={nuevo.descripcion}
              onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
              className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
            />
          </div>

          <div>
            <label htmlFor="nuevo-beneficios" className="block text-xs font-medium text-ink/70 mb-1">
              Beneficios Principales (separados por coma o puntos)
            </label>
            <textarea
              id="nuevo-beneficios"
              rows={2}
              placeholder="Ej: Promueve sueño profundo, calma el sistema nervioso, alivia la tensión muscular..."
              value={nuevo.beneficios}
              onChange={(e) => setNuevo({ ...nuevo, beneficios: e.target.value })}
              className="w-full rounded-xl border border-moss/25 px-3.5 py-2 text-sm bg-sand/30 focus:outline-none focus:ring-2 focus:ring-moss-dark"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={nuevo.activo}
                  onChange={(e) => setNuevo({ ...nuevo, activo: e.target.checked })}
                  className="rounded border-moss/30 text-moss-dark focus:ring-moss-dark"
                />
                <span>Visible en el catálogo (Activo)</span>
              </label>

              <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={nuevo.destacado}
                  onChange={(e) => setNuevo({ ...nuevo, destacado: e.target.checked })}
                  className="rounded border-moss/30 text-moss-dark focus:ring-moss-dark"
                />
                <span>⭐ Producto Destacado</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={guardando}
              className="rounded-full bg-moss-dark text-sand px-7 py-2.5 text-sm font-body hover:bg-moss transition-colors shadow-sm disabled:opacity-50"
            >
              {guardando ? "Guardando…" : "Guardar Producto"}
            </button>
          </div>
        </form>
      )}

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white rounded-2xl border border-moss/15 p-4 sm:p-5 mb-6 grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="filtro-categoria" className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
            🌿 Filtrar por Categoría:
          </label>
          <select
            id="filtro-categoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-moss-dark"
          >
            {categoriasDisponibles.map((c) => (
              <option key={c} value={c}>
                {c === "Todas" ? "✨ Todas las categorías" : c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="busqueda-producto" className="block text-xs font-medium text-ink/70 mb-1.5 font-body">
            🔍 Buscar Producto o Beneficio:
          </label>
          <input
            id="busqueda-producto"
            type="text"
            placeholder="Ej: Lavanda, Menta, Sueño, Difusor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border border-moss/25 bg-sand/30 px-3.5 py-2.5 text-sm font-body text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss-dark"
          />
        </div>
      </div>

      {/* Listado de Productos */}
      {cargando ? (
        <p className="font-body text-ink/60 py-10 text-center">Cargando catálogo doTERRA…</p>
      ) : productos.length === 0 ? (
        <div className="bg-white rounded-3xl border border-moss/15 p-10 text-center space-y-4">
          <p className="font-display text-xl text-ink">Aún no hay productos registrados en la base de datos</p>
          <p className="font-body text-sm text-ink/60 max-w-md mx-auto">
            Utiliza el botón de arriba para registrar tus aceites esenciales y productos doTERRA CPTG®.
          </p>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="inline-flex items-center gap-2 rounded-full bg-moss-dark text-sand px-6 py-3 font-body text-sm hover:bg-moss transition-colors shadow-sm"
          >
            <span>＋</span>
            <span>Subir mi primer producto</span>
          </button>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl border border-moss/15 p-10 text-center">
          <p className="font-body text-ink/60">
            No se encontraron productos para el filtro seleccionado.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {productosFiltrados.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-moss/15 p-5 shadow-sm space-y-3"
            >
              <div className="grid sm:grid-cols-[1.5fr_1fr_0.8fr_0.8fr_auto] gap-3 items-center">
                {/* Nombre y categoría */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-body uppercase tracking-wider text-moss-dark bg-moss/10 px-2 py-0.5 rounded-full font-semibold">
                      {p.categoria}
                    </span>
                    {p.destacado && (
                      <span className="text-[10px] bg-gold/20 text-gold-dark px-2 py-0.5 rounded-full font-medium">
                        ⭐ Destacado
                      </span>
                    )}
                  </div>
                  <input
                    value={p.nombre}
                    onChange={(e) => actualizarLocal(p.id, { nombre: e.target.value })}
                    className="w-full rounded-lg border border-moss/25 px-3 py-1.5 text-sm font-medium"
                    placeholder="Nombre del producto"
                  />
                </div>

                {/* Categoría y Tamaño */}
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={p.categoria}
                    onChange={(e) => actualizarLocal(p.id, { categoria: e.target.value })}
                    className="rounded-lg border border-moss/25 px-2 py-1.5 text-xs"
                  >
                    {CATEGORIAS_PREDEFINIDAS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input
                    value={p.tamano}
                    onChange={(e) => actualizarLocal(p.id, { tamano: e.target.value })}
                    className="rounded-lg border border-moss/25 px-2 py-1.5 text-xs"
                    placeholder="Tamaño (15 ml)"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label htmlFor={`precio-${p.id}`} className="block text-[10px] text-ink/50 mb-0.5">Precio (COP):</label>
                  <input
                    id={`precio-${p.id}`}
                    type="number"
                    value={p.precio}
                    onChange={(e) => actualizarLocal(p.id, { precio: Number(e.target.value) })}
                    className="w-full rounded-lg border border-moss/25 px-2.5 py-1.5 text-sm"
                  />
                </div>

                {/* Activo y Destacado */}
                <div className="flex flex-col gap-1 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.activo}
                      onChange={(e) => actualizarLocal(p.id, { activo: e.target.checked })}
                    />
                    <span>Activo</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.destacado}
                      onChange={(e) => actualizarLocal(p.id, { destacado: e.target.checked })}
                    />
                    <span>Destacado</span>
                  </label>
                </div>

                {/* Botones de Acción */}
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => actualizarProducto(p)}
                    className="rounded-full bg-moss-dark text-sand px-3.5 py-1.5 text-xs hover:bg-moss transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => eliminarProducto(p.id, p.nombre)}
                    className="rounded-full bg-red-50 text-red-600 border border-red-200 px-2.5 py-1.5 text-xs hover:bg-red-100 transition-colors"
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Campos expandidos de descripción y beneficios */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-moss/10">
                <div>
                  <label htmlFor={`descripcion-${p.id}`} className="block text-[10px] text-ink/60 mb-0.5">Descripción:</label>
                  <textarea
                    id={`descripcion-${p.id}`}
                    rows={1}
                    value={p.descripcion || ""}
                    onChange={(e) => actualizarLocal(p.id, { descripcion: e.target.value })}
                    className="w-full rounded-lg border border-moss/20 px-2.5 py-1 text-xs bg-sand/20"
                    placeholder="Descripción..."
                  />
                </div>
                <div>
                  <label htmlFor={`beneficios-${p.id}`} className="block text-[10px] text-ink/60 mb-0.5">Beneficios:</label>
                  <textarea
                    id={`beneficios-${p.id}`}
                    rows={1}
                    value={p.beneficios || ""}
                    onChange={(e) => actualizarLocal(p.id, { beneficios: e.target.value })}
                    className="w-full rounded-lg border border-moss/20 px-2.5 py-1 text-xs bg-sand/20"
                    placeholder="Beneficios terapéuticos..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
