// Horario real de atención: Lunes a Sábado, 8:00 a.m. – 5:30 p.m.
// Domingos y festivos cerrado (atención corporativa solo con reserva previa).
type Rango = { inicio: string; fin: string };

const HORARIO_SEMANA: Record<number, Rango[]> = {
  0: [], // domingo: cerrado
  1: [{ inicio: "08:00", fin: "17:30" }],
  2: [{ inicio: "08:00", fin: "17:30" }],
  3: [{ inicio: "08:00", fin: "17:30" }],
  4: [{ inicio: "08:00", fin: "17:30" }],
  5: [{ inicio: "08:00", fin: "17:30" }],
  6: [{ inicio: "08:00", fin: "17:30" }]
};

function aMinutos(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function aHHMM(minutos: number) {
  const h = Math.floor(minutos / 60).toString().padStart(2, "0");
  const m = (minutos % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/** Formatea una hora HH:MM a formato amigable de 12h (ej: "09:00" -> "9:00 AM", "13:00" -> "1:00 PM") */
export function formatearHora12(hhmm: string): string {
  if (!hhmm) return "";
  const [hStr, mStr] = hhmm.split(":");
  let h = Number(hStr);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return mStr === "00" ? `${h}:00 ${ampm}` : `${h}:${mStr} ${ampm}`;
}

/** Devuelve los horarios posibles en intervalos de cada hora exacta (8:00, 9:00, 10:00, 11:00, etc.) */
export function generarSlotsDelDia(fechaISO: string, duracionMinutos: number = 60): string[] {
  const fecha = new Date(`${fechaISO}T00:00:00`);
  const rangos = HORARIO_SEMANA[fecha.getDay()] ?? [];
  const slots: string[] = [];

  for (const rango of rangos) {
    let cursor = aMinutos(rango.inicio);
    const fin = aMinutos(rango.fin);
    // Cada hora exacta (step de 60 minutos)
    while (cursor + Math.min(duracionMinutos, 60) <= fin) {
      slots.push(aHHMM(cursor));
      cursor += 60;
    }
  }
  return slots;
}

export function estaAbierto(fechaISO: string): boolean {
  const fecha = new Date(`${fechaISO}T00:00:00`);
  return (HORARIO_SEMANA[fecha.getDay()] ?? []).length > 0;
}
