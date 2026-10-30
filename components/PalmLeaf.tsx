type PalmLeafProps = {
  className?: string;
  variant?: "single" | "fan" | "frond";
  color?: string;
};

/**
 * Hoja de palma dibujada a línea (line-art), 100% CSS/SVG — sin imágenes.
 * Se usa como acento decorativo repetido a lo largo del sitio para reforzar
 * la identidad botánica de la marca sin recargar visualmente las secciones.
 */
export default function PalmLeaf({ className = "", variant = "single", color = "currentColor" }: PalmLeafProps) {
  if (variant === "fan") {
    return (
      <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
        <g stroke={color} strokeWidth="1.4" strokeLinecap="round">
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = -70 + i * 22;
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.sin(rad) * 90;
            const y = 190 - Math.cos(rad) * 90;
            const cx = 100 + Math.sin(rad) * 45;
            const cy = 190 - Math.cos(rad) * 45 - 12;
            return <path key={i} d={`M100,190 Q${cx},${cy} ${x},${y}`} />;
          })}
          <path d="M100,190 L100,140" strokeWidth="2" />
        </g>
      </svg>
    );
  }

  if (variant === "frond") {
    return (
      <svg viewBox="0 0 300 120" fill="none" className={className} aria-hidden="true">
        <g stroke={color} strokeWidth="1.3" strokeLinecap="round">
          <path d="M10,100 Q150,10 290,60" strokeWidth="1.8" />
          {Array.from({ length: 11 }).map((_, i) => {
            const t = i / 10;
            const x = 10 + t * 280;
            const y = 100 - t * 40 + Math.sin(t * Math.PI) * -10;
            const len = 22 - Math.abs(t - 0.5) * 20;
            return (
              <path
                key={i}
                d={`M${x},${y} q${len * 0.4},${-len * 0.6} ${len},${-len * 0.2}`}
                opacity={0.85}
              />
            );
          })}
        </g>
      </svg>
    );
  }

  // "single": una sola hoja alargada, tipo helecho tropical
  return (
    <svg viewBox="0 0 120 260" fill="none" className={className} aria-hidden="true">
      <g stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <path d="M60,255 C55,180 65,90 60,10" strokeWidth="2" />
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const y = 240 - t * 220;
          const len = 26 - Math.abs(t - 0.45) * 22;
          return (
            <g key={i}>
              <path d={`M60,${y} q${len},${-len * 0.35} ${len * 1.4},${-len * 0.9}`} opacity={0.85} />
              <path d={`M60,${y} q${-len},${-len * 0.35} ${-len * 1.4},${-len * 0.9}`} opacity={0.85} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
