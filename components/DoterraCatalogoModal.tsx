"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { ProductoDoterra } from "@/lib/types";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573235056242";

type ItemPedido = {
  producto: ProductoDoterra;
  cantidad: number;
};

export default function DoterraCatalogoModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [productos, setProductos] = useState<ProductoDoterra[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState<Record<string, ItemPedido>>({});

  useEffect(() => {
    if (!isOpen) return;

    // Bloquear scroll de la página cuando el modal está abierto
    const scrollOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    async function cargar() {
      setCargando(true);
      try {
        const { data, error } = await supabase
          .from("productos_doterra")
          .select("*")
          .eq("activo", true)
          .order("orden", { ascending: true });

        if (error || !data) {
          setProductos([]);
        } else {
          setProductos(data as ProductoDoterra[]);
        }
      } catch {
        setProductos([]);
      } finally {
        setCargando(false);
      }
    }

    cargar();

    function manejarTecla(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", manejarTecla);

    return () => {
      document.body.style.overflow = scrollOriginal;
      window.removeEventListener("keydown", manejarTecla);
    };
  }, [isOpen, onClose]);


  // Obtener categorías únicas dinámicas
  const categorias = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => {
      if (p.categoria) set.add(p.categoria);
    });
    return ["Todas", ...Array.from(set)];
  }, [productos]);

  // Filtrado de productos
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCat =
        categoriaSeleccionada === "Todas" || p.categoria === categoriaSeleccionada;
      const q = busqueda.toLowerCase().trim();
      const coincideBusqueda =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q) ||
        p.beneficios?.toLowerCase().includes(q) ||
        p.categoria?.toLowerCase().includes(q);

      return coincideCat && coincideBusqueda;
    });
  }, [productos, categoriaSeleccionada, busqueda]);

  // Manejo del carrito de pedidos
  function agregarAlCarrito(prod: ProductoDoterra) {
    setCarrito((prev) => {
      const actual = prev[prod.id];
      const cantidad = actual ? actual.cantidad + 1 : 1;
      return {
        ...prev,
        [prod.id]: { producto: prod, cantidad }
      };
    });
  }

  function restarDelCarrito(prodId: string) {
    setCarrito((prev) => {
      const copia = { ...prev };
      if (!copia[prodId]) return prev;
      if (copia[prodId].cantidad > 1) {
        copia[prodId] = { ...copia[prodId], cantidad: copia[prodId].cantidad - 1 };
      } else {
        delete copia[prodId];
      }
      return copia;
    });
  }

  const itemsCarrito = Object.values(carrito);
  const totalArticulos = itemsCarrito.reduce((acc, i) => acc + i.cantidad, 0);
  const totalInversion = itemsCarrito.reduce(
    (acc, i) => acc + i.producto.precio * i.cantidad,
    0
  );

  // Armar enlace de WhatsApp para un producto individual
  function enlaceWhatsAppIndividual(p: ProductoDoterra) {
    const texto = `¡Hola Relax VR 360°! 🌿 Me interesa comprar el producto doTERRA:\n\n• *${p.nombre}* (${p.tamano || "15ml"})\nPrecio: $${p.precio.toLocaleString("es-CO")} COP\n\n¿Tienen disponibilidad para entrega en sede o a domicilio?`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  }

  // Armar enlace de WhatsApp para pedido consolidado
  function enlaceWhatsAppPedidoConsolidado() {
    let mensaje = `¡Hola Relax VR 360°! 🌿 Deseo realizar un pedido de productos doTERRA CPTG:\n\n`;
    itemsCarrito.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.producto.nombre}* (${item.producto.tamano || "15ml"}) x${item.cantidad} — $${(item.producto.precio * item.cantidad).toLocaleString("es-CO")} COP\n`;
    });
    mensaje += `\n*Total a pagar:* $${totalInversion.toLocaleString("es-CO")} COP\n\n¿Me confirman disponibilidad y datos para la entrega? Muchas gracias.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Contenedor del Modal */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-sand rounded-3xl border border-moss/20 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-white border-b border-moss/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-moss/10 border border-moss/20 flex items-center justify-center text-xl">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl text-ink">
                  Catálogo doTERRA · Estándar CPTG®
                </h2>
                <span className="hidden sm:inline-block text-[11px] bg-gold/20 text-gold-dark font-medium px-2 py-0.5 rounded-full">
                  100% Puros
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-ink/60">
                Aceites esenciales de grado terapéutico y productos de bienestar para entrega en sede o a domicilio.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-sand hover:bg-moss/15 text-ink/70 hover:text-ink flex items-center justify-center text-xl transition-colors shrink-0"
            aria-label="Cerrar catálogo"
          >
            ✕
          </button>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="px-6 py-4 sm:px-8 bg-white/70 border-b border-moss/10 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-colors ${categoriaSeleccionada === cat
                    ? "bg-moss-dark text-sand font-medium"
                    : "bg-sand/80 text-ink/75 hover:bg-moss/10 border border-moss/15"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative min-w-[240px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-ink/40">🔍</span>
            <input
              type="text"
              placeholder="Buscar aceite o beneficio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs font-body rounded-full border border-moss/20 bg-white placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-moss-dark"
            />
          </div>
        </div>

        {/* Cuerpo del Catálogo */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {cargando ? (
            <div className="py-20 text-center font-body text-ink/60">
              <span className="inline-block animate-spin mr-2">🌿</span>
              Cargando catálogo doTERRA…
            </div>
          ) : productos.length === 0 ? (
            <div className="py-16 text-center bg-white/70 rounded-3xl border border-moss/15 p-8 max-w-lg mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 text-2xl flex items-center justify-center mx-auto mb-4">
                📦
              </div>
              <h3 className="font-display text-2xl text-ink mb-2">Aún no hay productos disponibles</h3>
              <p className="font-body text-xs sm:text-sm text-ink/60 leading-relaxed mb-6">
                Estamos sincronizando nuestro inventario oficial de aceites y difusores doTERRA CPTG®.
                Si buscas un producto específico, puedes consultar disponibilidad inmediata por WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Relax VR 360°, quiero consultar disponibilidad de aceites esenciales doTERRA.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-moss-dark text-sand px-6 py-2.5 text-xs sm:text-sm font-body hover:bg-moss transition-colors shadow-sm"
              >
                <span>💬</span>
                <span>Consultar disponibilidad por WhatsApp</span>
              </a>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="py-16 text-center bg-white/60 rounded-2xl border border-moss/15 p-8">
              <p className="font-display text-lg text-ink/80 mb-1">No se encontraron productos</p>
              <p className="font-body text-xs text-ink/60">
                Prueba buscando otro término o seleccionando otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {productosFiltrados.map((p) => {
                const enCarrito = carrito[p.id]?.cantidad || 0;

                return (
                  <div
                    key={p.id}
                    className="flex flex-col justify-between bg-white rounded-2xl border border-moss/15 p-5 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-moss-dark bg-moss/10 px-2 py-0.5 rounded-full">
                          {p.categoria || "Aceite Esencial"}
                        </span>
                        {p.tamano && (
                          <span className="text-[11px] font-body text-ink/60 bg-sand px-2 py-0.5 rounded-full border border-moss/10">
                            💧 {p.tamano}
                          </span>
                        )}
                      </div>

                      {/* Título y descripción */}
                      <h3 className="font-display text-lg text-ink leading-snug mb-1.5">
                        {p.nombre}
                      </h3>
                      <p className="font-body text-xs text-ink/70 leading-relaxed mb-3">
                        {p.descripcion}
                      </p>

                      {/* Beneficios */}
                      {p.beneficios && (
                        <div className="mb-4 bg-sand/50 rounded-xl p-2.5 border border-moss/10">
                          <p className="text-[10px] font-bold text-moss-dark uppercase tracking-wider mb-1">
                            Beneficios Principales:
                          </p>
                          <p className="text-xs font-body text-ink/75 leading-relaxed">
                            {p.beneficios}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Precio y Botones de Acción */}
                    <div className="pt-3 border-t border-moss/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs text-ink/60 font-body">Inversión:</span>
                        <span className="font-display text-xl text-moss-dark">
                          ${p.precio.toLocaleString("es-CO")}{" "}
                          <span className="text-xs font-body text-ink/50">COP</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Botón de Pedido Directo WhatsApp */}
                        <a
                          href={enlaceWhatsAppIndividual(p)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] py-2 px-2 text-xs font-body font-medium transition-colors text-center"
                        >
                          <span>💬</span>
                          <span>Pedir ya</span>
                        </a>

                        {/* Botón Agregar al Carrito */}
                        {enCarrito > 0 ? (
                          <div className="flex items-center justify-between bg-moss-dark text-sand rounded-xl px-2 py-1 text-xs">
                            <button
                              onClick={() => restarDelCarrito(p.id)}
                              className="w-6 h-6 rounded flex items-center justify-center font-bold hover:bg-moss/40"
                            >
                              -
                            </button>
                            <span className="font-medium">{enCarrito}</span>
                            <button
                              onClick={() => agregarAlCarrito(p)}
                              className="w-6 h-6 rounded flex items-center justify-center font-bold hover:bg-moss/40"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => agregarAlCarrito(p)}
                            className="flex items-center justify-center gap-1 rounded-xl bg-moss-dark text-sand hover:bg-moss py-2 px-2 text-xs font-body transition-colors"
                          >
                            <span>+</span>
                            <span>Agregar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Barra Inferior si hay productos seleccionados en el Carrito */}
        {totalArticulos > 0 && (
          <div className="px-6 py-4 sm:px-8 bg-moss-dark text-sand border-t border-moss/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/30 border border-gold/50 flex items-center justify-center text-sm font-bold text-sand">
                {totalArticulos}
              </div>
              <div>
                <p className="text-xs font-body text-sand/80">
                  {totalArticulos} {totalArticulos === 1 ? "producto seleccionado" : "productos seleccionados"}
                </p>
                <p className="font-display text-lg text-sand leading-none">
                  Total: ${totalInversion.toLocaleString("es-CO")} COP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setCarrito({})}
                className="text-xs text-sand/60 hover:text-sand underline px-2 py-1 font-body"
              >
                Limpiar
              </button>
              <a
                href={enlaceWhatsAppPedidoConsolidado()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-ink font-body font-semibold px-6 py-2.5 text-xs sm:text-sm hover:brightness-105 transition-all shadow-md"
              >
                <span>💬</span>
                <span>Enviar Pedido Consolidado a WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
