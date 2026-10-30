# Imágenes pendientes

El sitio se entrega con espacios reservados (cajas con textura punteada) en
lugar de fotos, para que las reemplaces cuando tengas el material real.

| Dónde aparece | Componente | Sugerencia | Estado |
|---|---|---|---|
| Logo en el encabezado y sitio | `components/Header.tsx`, `Footer.tsx`, etc. | Logo horizontal oficial (`logo.png`) | ✅ Configurado |
| Imagen principal (hero) | `components/Hero.tsx` | Sesión Relax Gold VR (`relajacion.jpg`) | ✅ Configurado |
| Sala de relajación ("Sobre nosotros") | `components/SobreNosotros.tsx` | Foto cuadrada del local | Pendiente |
| Nota en Chica Noticias | `components/Medios.tsx` | Captura o miniatura del video |
| Mapa / fachada del local | `components/Horario.tsx` | Foto del local o mapa embebido |

## Cómo reemplazar un espacio de imagen

1. Guarda el archivo en `public/images/` (ej: `public/images/hero.jpg`).
2. En el componente correspondiente, cambia el `<div className="img-placeholder …">`
   por una etiqueta de Next.js:

```tsx
import Image from "next/image";

<Image src="/images/hero.jpg" alt="Sesión de relajación Relax VR 360°" fill className="object-cover rounded-2xl" />
```

3. Si el contenedor no tiene `position: relative`, agrégalo (usa `relative` de Tailwind)
   ya que `fill` de `next/image` lo requiere.
