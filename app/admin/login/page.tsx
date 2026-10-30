"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setCargando(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center font-body px-6">
      <form onSubmit={manejarEnvio} className="w-full max-w-sm bg-white rounded-2xl border border-moss/15 p-8 space-y-4">
        <h1 className="font-display text-2xl mb-2">Panel administrativo</h1>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-moss/25 px-4 py-3"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-moss/25 px-4 py-3"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-full bg-moss-dark text-sand py-3 hover:bg-moss transition-colors disabled:opacity-50"
        >
          {cargando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
