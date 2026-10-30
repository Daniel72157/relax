"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboardPage() {
  const [totalHoy, setTotalHoy] = useState<number | null>(null);
  const [totalPendientes, setTotalPendientes] = useState<number | null>(null);
  const [totalProductos, setTotalProductos] = useState<number | null>(null);

  useEffect(() => {
    const hoy = new Date().toISOString().slice(0, 10);

    supabase
      .from("citas")
      .select("id", { count: "exact", head: true })
      .eq("fecha", hoy)
      .then(({ count }) => setTotalHoy(count ?? 0));

    supabase
      .from("citas")
      .select("id", { count: "exact", head: true })
      .eq("estado", "pendiente")
      .then(({ count }) => setTotalPendientes(count ?? 0));

    supabase
      .from("productos_doterra")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => setTotalProductos(count ?? 0));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Resumen General</h1>
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-moss/15 p-6 shadow-sm">
          <p className="text-sm text-ink/60">Citas de hoy</p>
          <p className="font-display text-4xl mt-2 text-ink">{totalHoy ?? "…"}</p>
        </div>
        <div className="bg-white rounded-2xl border border-moss/15 p-6 shadow-sm">
          <p className="text-sm text-ink/60">Pendientes por confirmar</p>
          <p className="font-display text-4xl mt-2 text-moss-dark">{totalPendientes ?? "…"}</p>
        </div>
        <div className="bg-white rounded-2xl border border-moss/15 p-6 shadow-sm">
          <p className="text-sm text-ink/60">Productos doTERRA</p>
          <p className="font-display text-4xl mt-2 text-gold">{totalProductos ?? "…"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/admin/citas" className="rounded-full bg-moss-dark text-sand px-6 py-3 hover:bg-moss transition-colors shadow-sm">
          Ver citas
        </Link>
        <Link href="/admin/servicios" className="rounded-full border border-moss-dark/40 px-6 py-3 hover:bg-moss/10 transition-colors">
          Gestionar servicios
        </Link>
        <Link href="/admin/productos" className="rounded-full border border-gold/60 text-ink bg-gold/10 px-6 py-3 hover:bg-gold/20 transition-colors">
          Catálogo doTERRA
        </Link>
      </div>
    </div>
  );
}

