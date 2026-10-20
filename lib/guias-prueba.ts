// Datos inventados del boceto (T1). Después los reemplaza el Sheet.
export type Guia = {
  slug: string;
  titulo: string;
  descripcion: string;
  precio: number;
  precioAntes?: number;
  portada: string;
  logros: string[];
  paraQuien: string[];
  incluye: string[];
  preguntas: { pregunta: string; respuesta: string }[];
};

export const portada = {
  titular: "Consigue tu primera chamba",
  subtitulo: "Guías cortas y prácticas, hechas para Lima: arma un CV que llama y llega listo a tu entrevista.",
};

export const senalesDeConfianza = ["Pago seguro con Mercado Pago", "Yape y tarjeta", "Descarga al instante"];

export const mediosDePago = [
  { nombre: "Mercado Pago", logo: "/logos/mercadopago.svg" },
  { nombre: "Yape", logo: "/logos/yape.svg" },
  { nombre: "Visa", logo: "/logos/visa.svg" },
  { nombre: "Mastercard", logo: "/logos/mastercard.svg" },
];

export const pasos = [
  { titulo: "Elige tu guía", texto: "Mira la que va con lo que buscas: CV o entrevista." },
  { titulo: "Paga fácil", texto: "Con Yape o tarjeta, por Mercado Pago. Tus datos de tarjeta no pasan por aquí." },
  { titulo: "Recibe tu PDF", texto: "Lo bajas en el acto y también te llega por correo." },
];

export const ahorro = (precio: number, antes: number) => antes - precio;
export const descuento = (precio: number, antes: number) => Math.round((ahorro(precio, antes) / antes) * 100);

export const guias: Guia[] = [
  {
    slug: "cv-que-si-llama",
    titulo: "CV que sí llama",
    descripcion: "Arma un CV de una página que pasa los filtros y consigue entrevistas en el mercado limeño.",
    precio: 15,
    precioAntes: 25,
    portada: "/portadas/cv.svg",
    logros: ["Un CV de una sola página", "Palabras clave que pasan los filtros", "Un perfil de LinkedIn alineado"],
    paraQuien: ["Universitarios de últimos ciclos", "Recién egresados sin experiencia", "Quien lleva meses sin respuesta"],
    incluye: ["PDF de 30 páginas", "Plantilla de CV editable", "Lista de verificación final"],
    preguntas: [
      { pregunta: "¿Cómo recibo la guía?", respuesta: "Al pagar, descargas el PDF al instante." },
      { pregunta: "¿Puedo pagar con Yape?", respuesta: "Sí, con Yape o tarjeta, vía Mercado Pago." },
      { pregunta: "¿Sirve si no tengo experiencia?", respuesta: "Sí, hay un capítulo para primer empleo." },
    ],
  },
  {
    slug: "tu-primera-entrevista",
    titulo: "Tu primera entrevista",
    descripcion: "Prepara las preguntas típicas, la conversación sobre sueldo y cómo hacer seguimiento.",
    precio: 20,
    portada: "/portadas/entrevista.svg",
    logros: ["Responder con calma las preguntas típicas", "Hablar de sueldo sin miedo", "Hacer seguimiento"],
    paraQuien: ["Quien tiene su primera entrevista", "Quien se bloquea al hablar de sí mismo"],
    incluye: ["PDF de 25 páginas", "40 preguntas con respuestas modelo"],
    preguntas: [{ pregunta: "¿Cómo recibo la guía?", respuesta: "Al pagar, descargas el PDF al instante." }],
  },
];

export const buscarGuia = (slug: string) => guias.find((g) => g.slug === slug);
export const soles = (n: number) => `S/ ${n}`;
