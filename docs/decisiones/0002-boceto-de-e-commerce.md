# 0002. Boceto con aspecto de e-commerce profesional

- **Fecha:** 2026-10-20
- **Estado:** Propuesta

## Contexto

El primer boceto de T1 (PR #19) se veía básico. El dueño pidió, en el mismo PR, que se vea como
un e-commerce profesional que vende, y sumó una sección «Cómo funciona» y un footer mínimo.

## Decisión

- **Todo en SVG propio**, sin imágenes externas ni fuentes descargadas: ilustración del banner,
  portadas de ebook (título, subtítulo, marca Chamba) y logos de pago.
- **Portadas de ebook:** lomo, sombra y un giro 3D con CSS (`PortadaLibro`).
- **Logos de pago** (Mercado Pago, Yape, Visa, Mastercard): marcas simplificadas de marcador de
  posición; se reemplazan por los activos oficiales antes de publicar.
- **Oferta:** etiqueta «-N %» (calculada de precio y precio antes) y «Ahorras S/ N».
- **Botón «Comprar»:** color de marca fuerte (`compra`, contraste AA con texto blanco), con
  `aria-disabled` en vez de `disabled`: se ve activo pero no hace nada hasta la Fase 2.
- **Ficha en escritorio:** dos columnas, portada a la izquierda y bloque de compra fijo (sticky)
  a la derecha; en celular el botón sigue fijo abajo. Un solo botón en el DOM.
- **Nuevos elementos de la Fase 1:** «Cómo funciona» (3 pasos) y footer mínimo.
- Se mantienen los umbrales de la ADR 0001 (320 px, texto ≥ 16 px, tocables ≥ 44×44 px).

## Segunda iteración (2026-10-20): que no parezca hecho con IA

- **Paleta sobria:** azul marino de base y un solo acento (`acento`, naranja quemado) solo para
  los botones de compra; se quitan verde, ámbar y rojo. La etiqueta de oferta va en azul marino.
- **Sin ilustración en el banner:** el banner muestra las portadas de las guías. Las fotos reales
  (Unsplash/Pexels, en `public/fotos/`, créditos en `docs/creditos.md`) quedan pendientes: el
  entorno de la nube no pudo descargarlas.
- **Cabecera y pie de negocio:** logo de marcador, WhatsApp y correo de prueba (`lib/contacto.ts`)
  y pie en columnas (guías, ayuda, contacto).
- **Menos tarjetas:** secciones que alternan fondo oscuro y claro; sin círculos con íconos ni
  tarjetas redondeadas con sombra.
- **Botón fijo del celular:** el botón queda en su sitio y solo se fija abajo cuando el visitante
  ya lo pasó (IntersectionObserver), así no tapa el título. Sigue siendo un solo botón en el DOM.

## Por qué

«Profesional» se acuerda viendo el boceto. Mantener Tailwind + shadcn/ui y SVG propios deja el
costo en S/ 0 y sin dependencias nuevas.
