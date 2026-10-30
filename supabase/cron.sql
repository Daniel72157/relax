-- =============================================================
-- Alternativa a "Scheduled Triggers" desde el Dashboard: programar el
-- envío de cumpleaños directamente en la base de datos con pg_cron + pg_net.
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- =============================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Se ejecuta el día 1 de cada mes a las 9:00 a.m. (hora del servidor, UTC)
select cron.schedule(
  'enviar-mensajes-cumpleanos',
  '0 9 1 * *',
  $$
  select net.http_post(
    url := 'https://TU-PROYECTO.functions.supabase.co/birthday-notifier',
    headers := jsonb_build_object(
      'Authorization', 'Bearer TU_SERVICE_ROLE_KEY',
      'Content-Type', 'application/json'
    )
  );
  $$
);

-- Para ver los trabajos programados:
-- select * from cron.job;

-- Para eliminarlo si algo cambia:
-- select cron.unschedule('enviar-mensajes-cumpleanos');
