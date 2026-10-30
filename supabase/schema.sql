-- =============================================================
-- Relax VR 360° Montería S.A.S. — esquema de base de datos (Supabase)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------
-- Tabla: servicios (catálogo de experiencias)
-- ---------------------------------------------------------------
create table if not exists servicios (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  linea text not null default '', -- ej: "Línea Inmersiva VR 360°"
  descripcion text default '',
  duracion_minutos integer not null default 60,
  precio numeric not null default 0,
  activo boolean not null default true,
  orden integer not null default 0,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Tabla: citas
-- ---------------------------------------------------------------
create table if not exists citas (
  id uuid primary key default gen_random_uuid(),
  cliente_nombre text not null,
  cliente_telefono text not null,
  cliente_email text,
  cliente_fecha_nacimiento date,
  servicio_id uuid references servicios(id) on delete set null,
  modalidad text not null default 'individual' check (modalidad in ('individual','pareja')),
  fecha date not null,
  hora time not null,
  estado text not null default 'pendiente'
    check (estado in ('pendiente','confirmada','cancelada','completada')),
  notas text,
  creado_en timestamptz not null default now(),
  unique (fecha, hora)
);

create index if not exists idx_citas_fecha on citas (fecha);
create index if not exists idx_citas_telefono on citas (cliente_telefono);
create index if not exists idx_citas_nacimiento on citas (cliente_fecha_nacimiento);

-- ---------------------------------------------------------------
-- Tabla: suscriptores_cumpleanos (Club Preferencial de Cumpleaños)
-- Registro independiente de las citas: da derecho al 15% OFF durante
-- todo el mes de cumpleaños, sin necesidad de reservar de inmediato.
-- ---------------------------------------------------------------
create table if not exists suscriptores_cumpleanos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text not null unique,
  email text,
  dia_nacimiento integer not null check (dia_nacimiento between 1 and 31),
  mes_nacimiento integer not null check (mes_nacimiento between 1 and 12),
  creado_en timestamptz not null default now()
);

create index if not exists idx_suscriptores_mes on suscriptores_cumpleanos (mes_nacimiento);

-- ---------------------------------------------------------------
-- Tabla: cotizaciones_empresariales (formulario de empresas)
-- ---------------------------------------------------------------
create table if not exists cotizaciones_empresariales (
  id uuid primary key default gen_random_uuid(),
  empresa text not null,
  solicitante text not null,
  cargo text,
  telefono text not null,
  email text,
  numero_experiencias text, -- '5 a 9' | '10 a 25' | '+25'
  modalidad text,           -- 'Tarjetas de Regalo' | 'Jornada In-Site' | 'Convenio en Sede'
  mensaje text,
  atendido boolean not null default false,
  creado_en timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Tabla: admins (correos autorizados para el panel /admin)
-- ---------------------------------------------------------------
create table if not exists admins (
  email text primary key
);
-- insert into admins (email) values ('tuequipo@relaxvr360.com');

-- ---------------------------------------------------------------
-- Tabla: productos_doterra (Catálogo de aceites y productos doTERRA CPTG)
-- ---------------------------------------------------------------
create table if not exists productos_doterra (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  categoria text not null default 'Aceites Simples', -- 'Aceites Simples' | 'Mezclas Patentadas' | 'Difusores & Bienestar' | 'Cuidado Terapéutico'
  descripcion text default '',
  beneficios text default '',
  tamano text default '15 ml',
  precio numeric not null default 0,
  imagen_url text default '',
  activo boolean not null default true,
  destacado boolean not null default false,
  orden integer not null default 0,
  creado_en timestamptz not null default now()
);

create index if not exists idx_productos_doterra_cat on productos_doterra (categoria);
create index if not exists idx_productos_doterra_activo on productos_doterra (activo);

-- ---------------------------------------------------------------
-- Tabla: mensajes_enviados (registro de WhatsApp enviados, evita duplicados)
-- ---------------------------------------------------------------
create table if not exists mensajes_enviados (
  id uuid primary key default gen_random_uuid(),
  cliente_telefono text not null,
  tipo text not null, -- 'cumpleanos' | 'confirmacion_cita' | 'chatbot'
  referencia text,
  enviado_en timestamptz not null default now(),
  unique (cliente_telefono, tipo, referencia)
);
-- =============================================================
-- Función auxiliar de administrador (evita recursión infinita en RLS)
-- =============================================================
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = (auth.jwt() ->> 'email')
  );
$$;

-- =============================================================
-- Row Level Security
-- =============================================================
alter table servicios enable row level security;
alter table citas enable row level security;
alter table suscriptores_cumpleanos enable row level security;
alter table cotizaciones_empresariales enable row level security;
alter table admins enable row level security;
alter table productos_doterra enable row level security;
alter table mensajes_enviados enable row level security;

-- Limpiar policies previas si existen
drop policy if exists "servicios_lectura_publica" on servicios;
drop policy if exists "servicios_admin_todo" on servicios;
drop policy if exists "citas_insertar_publico" on citas;
drop policy if exists "citas_leer_publico" on citas;
drop policy if exists "citas_cancelar_publico" on citas;
drop policy if exists "citas_admin_eliminar" on citas;
drop policy if exists "suscriptores_insertar_publico" on suscriptores_cumpleanos;
drop policy if exists "suscriptores_admin_leer" on suscriptores_cumpleanos;
drop policy if exists "cotizaciones_insertar_publico" on cotizaciones_empresariales;
drop policy if exists "cotizaciones_admin_leer" on cotizaciones_empresariales;
drop policy if exists "admins_solo_admin" on admins;
drop policy if exists "productos_doterra_lectura_publica" on productos_doterra;
drop policy if exists "productos_doterra_admin_todo" on productos_doterra;

create policy "servicios_lectura_publica"
  on servicios for select
  using (activo = true);

create policy "servicios_admin_todo"
  on servicios for all
  using (is_admin())
  with check (is_admin());

create policy "citas_insertar_publico"
  on citas for insert
  with check (true);

create policy "citas_leer_publico"
  on citas for select
  using (true);

create policy "citas_cancelar_publico"
  on citas for update
  using (true)
  with check (true);

create policy "citas_admin_eliminar"
  on citas for delete
  using (is_admin());

-- Club de cumpleaños: cualquiera puede registrarse (insert); solo admins leen
create policy "suscriptores_insertar_publico"
  on suscriptores_cumpleanos for insert
  with check (true);

create policy "suscriptores_admin_leer"
  on suscriptores_cumpleanos for select
  using (is_admin());

-- Cotizaciones empresariales: cualquiera puede enviar el formulario; solo admins leen/gestionan
create policy "cotizaciones_insertar_publico"
  on cotizaciones_empresariales for insert
  with check (true);

create policy "cotizaciones_admin_leer"
  on cotizaciones_empresariales for all
  using (is_admin())
  with check (is_admin());

create policy "admins_solo_admin"
  on admins for all
  using (is_admin())
  with check (is_admin());

-- Productos doTERRA: lectura pública de activos, administración total solo admins
create policy "productos_doterra_lectura_publica"
  on productos_doterra for select
  using (activo = true);

create policy "productos_doterra_admin_todo"
  on productos_doterra for all
  using (is_admin())
  with check (is_admin());

-- mensajes_enviados: sin policies públicas (solo service role de Edge Functions)

-- =============================================================
-- Catálogo real de experiencias (Relax VR 360° Montería S.A.S.)
-- =============================================================
insert into servicios (nombre, linea, descripcion, duracion_minutos, precio, orden)
values
  ('Experiencia Relax Gold', 'Línea Inmersiva VR 360°',
   'Restauración sensorial: confort térmico, gemas volcánicas y entorno inmersivo de Realidad Virtual 360° para un descanso profundo. Ideal para tu primera inmersión de bienestar.',
   40, 150000, 1),

  ('Experiencia Relax Gold Premium', 'Línea Inmersiva VR 360°',
   'Desconexión profunda y exclusividad: técnicas corporales de presión profunda, percusión y entornos VR 360° a tu medida. Ideal para ejecutivos y celebraciones en pareja.',
   60, 220000, 2),

  ('Experiencia Relax Ritual', 'Línea Tradicional & Rituales Corporales',
   'Pausa tradicional focalizada: calor térmico y gemas volcánicas en espalda, cuello y hombros para liberar la sobrecarga muscular del día a día.',
   40, 120000, 3),

  ('Experiencia Relax Ritual Premium', 'Línea Tradicional & Rituales Corporales',
   'Renovación corporal completa de pies a cabeza: cobertura corporal total con envolvimiento térmico profundo y ritual sensorial integrado.',
   60, 180000, 4),

  ('Experiencia Relax Facial', 'Línea Express & Cuidado Facial',
   'Cuidado y frescura sensorial: yoga facial, criosferas tonificantes y aromaterapia botánica para liberar la tensión acumulada en el rostro.',
   30, 90000, 5)
on conflict do nothing;

-- =============================================================
-- Catálogo oficial de productos doTERRA CPTG
-- =============================================================
insert into productos_doterra (nombre, categoria, descripcion, beneficios, tamano, precio, imagen_url, activo, destacado, orden)
values
  ('Aceite Esencial Lavanda (Lavender)', 'Aceites Simples',
   'El aceite esencial más versátil y apreciado en el mundo. Pureza terapéutica CPTG certificada.',
   'Promueve el sueño profundo, calma el sistema nervioso, alivia irritaciones de la piel y reduce la ansiedad.',
   '15 ml', 125000, '', true, true, 1),

  ('Aceite Esencial Menta (Peppermint)', 'Aceites Simples',
   'Frescura revitalizante instantánea de grado terapéutico puro.',
   'Alivia la tensión en la cabeza y cuello, refresca las vías respiratorias y promueve un estado de alerta y energía.',
   '15 ml', 115000, '', true, true, 2),

  ('Mezcla Protectora On Guard®', 'Mezclas Patentadas',
   'La legendaria mezcla de doTERRA con naranja silvestre, clavo, canela, eucalipto y romero.',
   'Refuerza las defensas naturales del sistema inmunológico, purifica el aire y brinda un aroma cálido y energizante.',
   '15 ml', 170000, '', true, true, 3),

  ('Mezcla Calmante Deep Blue®', 'Mezclas Patentadas',
   'Formulación calmante perfecta para un masaje reconfortante después de una larga jornada.',
   'Alivia la tensión muscular y articular, reconforta la espalda cansada y brinda sensación de frescura y calor.',
   '5 ml', 165000, '', true, true, 4),

  ('Aceite Esencial Incienso (Frankincense)', 'Aceites Simples',
   'Conocido como el "Rey de los Aceites". Uno de los compuestos botánicos más preciados desde la antigüedad.',
   'Favorece la renovación celular, induce estados de meditación profunda y promueve una piel tersa y luminosa.',
   '15 ml', 340000, '', true, true, 5),

  ('Mezcla Respiratoria doTERRA Breathe®', 'Mezclas Patentadas',
   'Mezcla extraordinaria con laurel, menta, eucalipto, árbol de té y cardamomo.',
   'Mantiene la sensación de vías respiratorias despejadas y facilita una respiración profunda y serena.',
   '15 ml', 110000, '', true, false, 6),

  ('Aceite Esencial Árbol de Té (Tea Tree)', 'Aceites Simples',
   'Poderoso purificante botánico con más de 90 compuestos activos naturales.',
   'Efecto purificante en la piel y uñas, promueve un cutis limpio y fresco, y purifica ambientes cerrados.',
   '15 ml', 105000, '', true, false, 7),

  ('Aceite Esencial Limón (Lemon)', 'Aceites Simples',
   'Extraído en frío de la cáscara del limón. Aroma cítrico estimulante y purificador.',
   'Eleva el estado de ánimo, purifica el aire de contaminantes y favorece la digestión saludable al diluir en agua.',
   '15 ml', 65000, '', true, false, 8),

  ('Crema Calmante Deep Blue Rub®', 'Cuidado Terapéutico',
   'Crema tópica enriquecida con la mezcla de aceites Deep Blue y extractos botánicos naturales.',
   'Alivio focalizado instantáneo para cuello, hombros, espalda y articulaciones cargadas de tensión.',
   '120 ml', 185000, '', true, true, 9),

  ('Difusor Ultrasónico Petal 2.0', 'Difusores & Bienestar',
   'Difusor ultrasónico compacto y de alta tecnología. Cobertura de hasta 30 m² con luz ambiental nocturna.',
   'Genera una niebla ultrafina que preserva todas las propiedades terapéuticas de los aceites esenciales.',
   'Unidad', 260000, '', true, true, 10)
on conflict do nothing;

