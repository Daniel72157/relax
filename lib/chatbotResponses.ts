export type ChatbotOpcion = {
  id: string;
  pregunta: string;
  respuesta: string;
  palabrasClave: string[];
};

export const CHATBOT_OPCIONES: ChatbotOpcion[] = [
  {
    id: "horarios",
    pregunta: "¿Cuál es el horario de atención?",
    respuesta:
      "Atendemos de lunes a sábado de 8:00 a.m. a 5:30 p.m. Domingos y festivos permanecemos cerrados (atención corporativa solo con reserva previa).",
    palabrasClave: ["horario", "hora", "abren", "cierran", "atienden"]
  },
  {
    id: "ubicacion",
    pregunta: "¿Dónde están ubicados?",
    respuesta:
      "Estamos en la Calle 42 #10-50, Local 2, Barrio Los Laureles, Montería, Córdoba. 📍 Puedes ver nuestra ubicación exacta y cómo llegar en Google Maps aquí: https://maps.app.goo.gl/L87SZfPKzMmKD3oL6",
    palabrasClave: ["ubicación", "direccion", "dirección", "donde quedan", "llegar", "mapa", "sede", "local"]
  },
  {
    id: "servicios",
    pregunta: "¿Qué experiencias ofrecen?",
    respuesta:
      "Tenemos 5 experiencias: Relax Gold (40 min), Relax Gold Premium (60 min), Relax Ritual (40 min), Relax Ritual Premium (60 min) y Relax Facial (30 min). Todas combinan masaje, aromaterapia doTERRA y Realidad Virtual 360°.",
    palabrasClave: ["servicio", "masaje", "experiencia", "que hacen", "que ofrecen", "ritual", "gold", "facial"]
  },
  {
    id: "precios",
    pregunta: "¿Cuáles son las tarifas y precios de las experiencias?",
    respuesta:
      "✨ *Tarifas Oficiales Relax VR 360° Montería:*\n\n🌟 *Línea Inmersiva VR 360°:*\n• *Relax Gold (40 min):* $150.000 COP\n• *Relax Gold Premium (60 min):* $220.000 COP\n\n🌿 *Línea Tradicional & Rituales:*\n• *Relax Ritual (40 min):* $120.000 COP\n• *Relax Ritual Premium (60 min):* $180.000 COP\n\n🌸 *Línea Facial & Cuidado Express:*\n• *Relax Facial (30 min):* $90.000 COP\n\n🎁 *Descuentos Especiales:*\n• *Cabina Dúo / Parejas:* 10% OFF en sesión para 2 personas.\n• *Club Cumpleaños:* 15% OFF durante todo tu mes de cumpleaños.\n\n¿Deseas agendar tu cita o tienes alguna pregunta sobre alguna de las experiencias?",
    palabrasClave: ["precio", "precios", "tarifa", "tarifas", "cuesta", "cuestan", "vale", "valen", "costo", "costos", "valor", "valores"]
  },
  {
    id: "reservar",
    pregunta: "¿Cómo agendo una cita?",
    respuesta:
      "Puedes reservar en línea desde el botón 'Reservar cita' de esta página, eligiendo experiencia, modalidad (individual o pareja), fecha y hora disponibles.",
    palabrasClave: ["reservar", "agendar", "cita", "turno", "disponibilidad"]
  },
  {
    id: "pareja",
    pregunta: "¿Tienen planes para parejas?",
    respuesta:
      "Sí, nuestra cabina dúo privada climatizada tiene 10% de descuento para 2 personas. Ideal para aniversarios, cumpleaños o una cita de desconexión.",
    palabrasClave: ["pareja", "dúo", "duo", "descuento pareja", "cabina dúo"]
  },
  {
    id: "cumpleanos",
    pregunta: "¿Cómo obtengo el descuento de cumpleaños?",
    respuesta:
      "Regístrate en nuestro Club Preferencial de Cumpleaños en la página de inicio y recibe 15% de descuento durante todo tu mes de cumpleaños, válido en cualquiera de nuestras experiencias.",
    palabrasClave: ["cumpleaños", "cumpleanos", "15%", "descuento cumpleaños"]
  },
  {
    id: "empresarial",
    pregunta: "¿Tienen planes para empresas?",
    respuesta:
      "Sí, ofrecemos jornadas in-site, convenios corporativos preferenciales y paquetes institucionales a partir de 5 experiencias. Cuéntanos el tamaño de tu equipo y armamos una propuesta.",
    palabrasClave: ["empresa", "empresarial", "corporativo", "equipo", "pausas activas", "convenio"]
  },
  {
    id: "asesor",
    pregunta: "Quiero hablar con una persona",
    respuesta:
      "Con gusto. Te conectamos ahora mismo con nuestro equipo por WhatsApp para resolver cualquier otra duda.",
    palabrasClave: ["asesor", "persona", "humano", "hablar con alguien"]
  }
];

export const CHATBOT_SALUDO =
  "¡Hola! Soy el asistente virtual de Relax VR 360° Montería. Elige una opción o escribe tu pregunta:";

export const CHATBOT_NO_ENTENDIDO =
  "No tengo una respuesta predefinida para eso todavía. Te conecto con nuestro equipo por WhatsApp para ayudarte mejor.";
