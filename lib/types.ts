export type Servicio = {
  id: string;
  nombre: string;
  linea: string;
  descripcion: string;
  duracion_minutos: number;
  precio: number;
  activo: boolean;
  orden: number;
};

export type Cita = {
  id: string;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string | null;
  cliente_fecha_nacimiento: string | null; // YYYY-MM-DD
  servicio_id: string;
  modalidad: "individual" | "pareja";
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
  estado: "pendiente" | "confirmada" | "cancelada" | "completada";
  notas: string | null;
  creado_en: string;
};

export type SuscriptorCumpleanos = {
  id: string;
  nombre: string;
  telefono: string;
  email: string | null;
  dia_nacimiento: number;
  mes_nacimiento: number;
  creado_en: string;
};

export type CotizacionEmpresarial = {
  id: string;
  empresa: string;
  solicitante: string;
  cargo: string | null;
  telefono: string;
  email: string | null;
  numero_experiencias: string | null;
  modalidad: string | null;
  mensaje: string | null;
  atendido: boolean;
  creado_en: string;
};

export type ProductoDoterra = {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  beneficios: string;
  tamano: string;
  precio: number;
  imagen_url: string;
  activo: boolean;
  destacado: boolean;
  orden: number;
  creado_en?: string;
};

// Tipado mínimo para que supabase-js infiera bien las consultas.
// Si generas tipos automáticos con `supabase gen types typescript`, reemplaza este archivo.
export type Database = {
  public: {
    Tables: {
      servicios: {
        Row: Servicio;
        Insert: Partial<Servicio>;
        Update: Partial<Servicio>;
      };
      citas: {
        Row: Cita;
        Insert: Partial<Cita>;
        Update: Partial<Cita>;
      };
      suscriptores_cumpleanos: {
        Row: SuscriptorCumpleanos;
        Insert: Partial<SuscriptorCumpleanos>;
        Update: Partial<SuscriptorCumpleanos>;
      };
      cotizaciones_empresariales: {
        Row: CotizacionEmpresarial;
        Insert: Partial<CotizacionEmpresarial>;
        Update: Partial<CotizacionEmpresarial>;
      };
      productos_doterra: {
        Row: ProductoDoterra;
        Insert: Partial<ProductoDoterra>;
        Update: Partial<ProductoDoterra>;
      };
    };
  };
};

