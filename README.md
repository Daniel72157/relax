# Relax VR 360° Montería — sitio web + reservas + WhatsApp

Rediseño del sitio con la misma información del original, más:
- Sistema de citas en línea (Supabase) con verificación de disponibilidad real.
- Chatbot con respuestas predefinidas en el botón de WhatsApp.
- Envío automático de mensaje de cumpleaños por WhatsApp el día 1 del mes correspondiente.
- Panel administrativo para gestionar citas, servicios y clientes.

Stack: **Next.js 14 (App Router) + TypeScript + Tailwind** para el frontend (Vercel),
**Supabase** (Postgres + Auth + Edge Functions) para el backend.

---

## 1. Mapa de rutas del sitio

Con Next.js App Router en Vercel, cada carpeta dentro de `app/` es una ruta real
(no aparece `index.html` en ninguna URL):

| Ruta | Archivo | Descripción |
|---|---|---|
| `/` | `app/page.tsx` | Página principal — ver todas las secciones abajo |
| `/reservar` | `app/reservar/page.tsx` | Formulario de reserva de cita |
| `/reservar/confirmacion` | `app/reservar/confirmacion/page.tsx` | Confirmación tras reservar |
| `/mis-citas` | `app/mis-citas/page.tsx` | Cliente consulta o cancela su cita con su número de WhatsApp |
| `/politica-privacidad` | `app/politica-privacidad/page.tsx` | Tratamiento de datos personales (Ley 1581 de 2012) |
| `/admin/login` | `app/admin/login/page.tsx` | Ingreso del equipo al panel |
| `/admin` | `app/admin/page.tsx` | Resumen (citas de hoy, pendientes) |
| `/admin/citas` | `app/admin/citas/page.tsx` | Listado de citas, cambio de estado |
| `/admin/servicios` | `app/admin/servicios/page.tsx` | Crear/editar servicios y precios |
| `/admin/clientes` | `app/admin/clientes/page.tsx` | Listado de clientes registrados |

## Secciones de la página principal (en orden)

1. **Hero** — propuesta de valor, calificación 5.0, CTA de reserva y de cumpleaños
2. **¿Qué es? (`#que-es`)** — presentación del centro
3. **Distribuidores doTERRA** — catálogo de aceites CPTG
4. **Misión y visión** — propósito de la empresa
5. **Ambiente & protocolos (`#viaje-bienestar`)** — VR 360°, pistola/piedras, aromaterapia
6. **Valores fundamentales** — los 4 pilares de marca
7. **Identidad (`#nosotros`)** — historia, razón social, gerencia
8. **Recorrido multisensorial (`#recorrido`)** — los 4 momentos de la sesión
9. **Catálogo de experiencias (`#experiencias`)** — las 5 experiencias, conectado en vivo a Supabase
10. **Simulador 360° (`#simulador-360`)** — los 4 paisajes inmersivos
11. **Ciencia & neuro-relajación (`#ciencia`)** — estadísticas y beneficios
12. **Test de bienestar interactivo** — recomienda una experiencia según el motivo de consulta
13. **Club de cumpleaños (`#cumpleanos`)** — formulario funcional (guarda en Supabase)
14. **Planes especiales (`#descuentos`)** — pareja/dúo y pase mensual
15. **Los 5 sentidos** — sincronización sensorial de cada sesión
16. **Tarjeta de regalo (`#tarjetas-regalo`)** — formulario que arma el mensaje de WhatsApp
17. **Soluciones corporativas (`#corporativo`)** — 3 módulos + formulario de cotización (Supabase)
18. **Testimonios** — reseñas verificadas
19. **Preguntas frecuentes** — acordeón
20. **Horario y ubicación (`#visitanos`)** — contacto y mapa

Todas las hojas de palma decorativas (esquinas del hero, entre secciones) están
dibujadas 100% en SVG/CSS en `components/PalmLeaf.tsx` — no son imágenes.

---

## 2. Estructura de archivos

```
relax-vr-360/
├─ app/                     → rutas del sitio (ver tabla arriba)
├─ components/              → Header, Footer, Hero, Recorrido, SobreNosotros,
│                              Horario, Medios, BookingForm, WhatsappChatbot,
│                              MisCitasBuscador
├─ lib/                     → supabaseClient.ts, types.ts, horarios.ts,
│                              chatbotResponses.ts (respuestas predefinidas)
├─ public/images/           → espacios de imagen a reemplazar (ver LEEME.md)
├─ supabase/
│  ├─ schema.sql            → tablas, seguridad (RLS) y datos iniciales
│  ├─ cron.sql              → programación del envío de cumpleaños (opcional)
│  └─ functions/
│     ├─ _shared/whatsapp.ts       → helper para llamar la API de WhatsApp
│     ├─ send-whatsapp/            → confirma cada cita nueva por WhatsApp
│     ├─ birthday-notifier/        → envía el saludo de cumpleaños (día 1 de mes)
│     └─ whatsapp-webhook/         → respuestas automáticas reales en WhatsApp (opcional/avanzado)
├─ .env.example
├─ package.json
├─ tailwind.config.ts
└─ next.config.mjs
```

---

## 3. Puesta en marcha local

```bash
npm install
cp .env.example .env.local   # completa las variables (paso 4)
npm run dev                  # http://localhost:3000
```

---

## 4. Configurar Supabase (backend)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y ejecuta, en este orden:
   - `supabase/schema.sql` (crea tablas, seguridad y servicios de ejemplo)
   - Agrega tu correo de administrador:
     ```sql
     insert into admins (email) values ('tu-correo@relaxvr360.com');
     ```
3. Ve a **Authentication → Users** y crea un usuario con ese mismo correo
   (así podrás entrar a `/admin`).
4. En **Project Settings → API**, copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` (**solo** para Edge Functions, nunca en el frontend)

---

## 5. Configurar WhatsApp (chatbot real + cumpleaños automáticos)

El botón flotante de WhatsApp del sitio **ya funciona sin ningún paso adicional**:
es un chatbot en pantalla (`components/WhatsappChatbot.tsx`) con respuestas
predefinidas (`lib/chatbotResponses.ts`) y un botón para pasar a un asesor real
por `wa.me`.

Para que las respuestas automáticas y el mensaje de cumpleaños lleguen **dentro
de WhatsApp de verdad** (no solo en la web), Meta exige usar la **API oficial
de WhatsApp Business (Cloud API)**. Un enlace `wa.me` normal no puede enviar
mensajes automáticos por sí solo. Pasos:

1. Crea una cuenta en [Meta for Developers](https://developers.facebook.com/)
   y una app de tipo "Business".
2. Agrega el producto **WhatsApp** y conecta el número +57 323 505 6242
   (o el número que uses) como número de WhatsApp Business.
3. En **WhatsApp → API Setup**, genera un token permanente y copia:
   - `Access Token` → `WHATSAPP_CLOUD_API_TOKEN`
   - `Phone Number ID` → `WHATSAPP_PHONE_NUMBER_ID`
4. Crea dos plantillas en **Business Manager → Message Templates** (deben ser
   aprobadas por Meta antes de usarse; toma entre minutos y ~1 día):
   - `cita_confirmada`: "Hola {{1}}, tu cita en Relax VR 360° quedó registrada
     para el {{2}} a las {{3}}. Si necesitas cambiarla, escríbenos por este medio."
   - `feliz_cumpleanos`: "¡Feliz mes de cumpleaños, {{1}}! De parte de todo el
     equipo de Relax VR 360° Montería queremos regalarte un momento de
     relajación. Escríbenos y agenda tu sesión especial este mes. 🎉"
5. Despliega las Edge Functions (siguiente sección) y define un
   `WHATSAPP_VERIFY_TOKEN` (una palabra secreta que tú inventes).
6. En Meta, configura el **Webhook**:
   - Callback URL: `https://TU-PROYECTO.functions.supabase.co/whatsapp-webhook`
   - Verify token: el mismo `WHATSAPP_VERIFY_TOKEN`
   - Suscríbete al campo `messages`.

Si prefieres lanzar primero solo con la web y sumar la API de WhatsApp más
adelante, el sitio funciona igual: el chatbot en pantalla y el enlace `wa.me`
ya cubren la reserva y las preguntas frecuentes.

---

## 6. Desplegar las Edge Functions de Supabase

```bash
npm install -g supabase
supabase login
supabase link --project-ref TU-PROYECTO

# Variables secretas que usan las funciones:
supabase secrets set WHATSAPP_CLOUD_API_TOKEN=xxx
supabase secrets set WHATSAPP_PHONE_NUMBER_ID=xxx
supabase secrets set WHATSAPP_VERIFY_TOKEN=xxx
supabase secrets set SITE_URL=https://relaxvr360monteria.vercel.app

supabase functions deploy send-whatsapp
supabase functions deploy birthday-notifier
supabase functions deploy whatsapp-webhook
```

### Confirmación automática de cada cita nueva
En **Database → Webhooks** crea un webhook: tabla `citas`, evento `INSERT`,
destino la función `send-whatsapp`. Así cada reserva nueva dispara un WhatsApp
de confirmación automáticamente.

### Mensaje de cumpleaños el día 1 de cada mes
Dos formas (elige una):
- **Dashboard**: Edge Functions → `birthday-notifier` → Cron → `0 9 1 * *`.
- **SQL** (`supabase/cron.sql`): usa `pg_cron` + `pg_net` directo en la base de datos.

---

## 7. Desplegar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importa el repositorio.
3. Framework detectado automáticamente: **Next.js**.
4. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (ej: `573235056242`)
   - `NEXT_PUBLIC_SITE_URL` (tu dominio final de Vercel o el propio)
5. Deploy. Vercel entrega rutas limpias por defecto (`/reservar`, no
   `/reservar/index.html` ni `/reservar.html`) — así quedó configurado en
   `next.config.mjs` (`trailingSlash: false`).
6. (Opcional) conecta tu dominio propio en **Project → Settings → Domains**.

---

## 8. Pendientes antes de lanzar

- [ ] Reemplazar los espacios de imagen (ver `public/images/LEEME.md`).
- [ ] Confirmar nombres, duración y precio reales de "Relax Ritual" y
      "Relax Gold" en `/admin/servicios` (se cargaron valores de ejemplo).
- [ ] Revisar el texto de `/politica-privacidad` con un abogado.
- [ ] Decidir si activas la API oficial de WhatsApp (paso 5) o lanzas primero
      solo con el chatbot en pantalla + `wa.me`.
- [ ] Crear el usuario administrador en Supabase Auth con el correo del equipo.
