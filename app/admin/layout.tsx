"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [cargando, setCargando] = useState(true);
  const esLogin = pathname === "/admin/login";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && !esLogin) {
        router.replace("/admin/login");
      }
      setCargando(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !esLogin) router.replace("/admin/login");
    });

    return () => sub.subscription.unsubscribe();
  }, [esLogin, router]);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (esLogin) return <>{children}</>;
  if (cargando) return <div className="p-10 font-body">Cargando…</div>;

  return (
    <div className="min-h-screen bg-sand font-body">
      <header className="border-b border-moss/15 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <Link href="/admin" className="flex items-center gap-2.5 mr-2 sm:mr-4" aria-label="Panel Relax VR">
              <Image
                src="/images/logo.png"
                alt="Relax VR 360°"
                width={120}
                height={49}
                className="h-8 w-auto object-contain"
              />
              <span className="text-xs bg-moss/15 text-moss-dark font-medium px-2 py-0.5 rounded-md">
                Admin
              </span>
            </Link>
            <Link
              href="/admin/citas"
              className={`hover:text-moss-dark transition-colors ${pathname === "/admin/citas" ? "text-moss-dark font-semibold" : "text-ink/70"}`}
            >
              Citas
            </Link>
            <Link
              href="/admin/servicios"
              className={`hover:text-moss-dark transition-colors ${pathname === "/admin/servicios" ? "text-moss-dark font-semibold" : "text-ink/70"}`}
            >
              Servicios
            </Link>
            <Link
              href="/admin/productos"
              className={`hover:text-moss-dark transition-colors ${pathname === "/admin/productos" ? "text-moss-dark font-semibold" : "text-ink/70"}`}
            >
              Productos doTERRA
            </Link>
            <Link
              href="/admin/clientes"
              className={`hover:text-moss-dark transition-colors ${pathname === "/admin/clientes" ? "text-moss-dark font-semibold" : "text-ink/70"}`}
            >
              Clientes
            </Link>
          </nav>
          <button onClick={cerrarSesion} className="text-sm text-red-600 hover:underline shrink-0">
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
