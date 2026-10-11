# Chamba

> El título de arriba (`# ...`) es el nombre que muestra la página en producción.
> Este documento es el alcance congelado. Lo que no esté aquí va al **Parking lot**.

## 1. Problema

Un universitario o recién egresado de Lima que busca trabajo y no lo encuentra tiene mucho
contenido gratis a mano (videos, posts, blogs), pero disperso, sin orden y pensado para otra
realidad. Le falta una guía corta y práctica, hecha para Lima, que pueda comprar y leer al instante.

## 2. Qué es

Una tienda online, pensada para celular, que vende guías digitales en PDF. El cliente elige una
guía, deja su correo, paga con Mercado Pago y recibe un enlace de descarga que vence, en la
página y por correo. El dueño administra las guías y ve los pedidos en un Google Sheet.
La portada y las fichas están hechas para vender: banner principal, señales de confianza y una
ficha de venta con un botón «Comprar» siempre a mano en el celular.

## 3. Qué NO es

- No tiene carrito: se compra una guía por vez.
- No tiene cuentas de cliente ni biblioteca de compras.
- No tiene panel `/admin` web: el Sheet es el administrador.
- No ve ni guarda datos de tarjeta: eso lo hace Mercado Pago.
- No cobra de verdad en este corte: preview, staging y producción usan llaves de prueba.
  Cobrar de verdad lo decide el dueño después (Parking lot).
- No escribe el contenido real de las guías: las guías del catálogo son de prueba.

## 4. Valor

Para el cliente: una guía útil y local, pagada con lo que ya usa y recibida en el acto.
Para el Guardián: probar que mantiene el alcance, el ritmo y la calidad en un proyecto con
pagos, correos y entregas.

## 5. Cómo sé que funcionó

En **3 semanas**, en staging: compro una guía con una tarjeta de prueba de Mercado Pago, el
pedido queda «pagado» en el Sheet, me llega el correo con el enlace de descarga y el enlace
funciona. Si el Guardián se rompe o se queda corto en el camino, eso también es un resultado
y va a su Parking lot.

## 6. Límites

- **Semanas:** 3
- **Tipo:** producto. Seguridad y pruebas en serio desde el día 1. Diseño **de plantilla con
  aspecto de e-commerce profesional**: bloques listos (shadcn/ui + Tailwind), una paleta y una
  tipografía, y solo los elementos de venta de la Fase 1. Nada de diseño a medida. Antes de
  construir la UI, el dueño aprueba un boceto de la portada y de la ficha, y ese boceto no se
  reabre.
- **Presupuesto:** S/ 0 durante el desarrollo (planes gratis y sandbox). En producción, solo la
  comisión de Mercado Pago por venta. Sin dominio propio (`*.netlify.app`).
- **Cuentas que se van a pedir:**
  - Mercado Pago: solo credenciales **de prueba** (y usuarios de prueba para el sandbox).
  - Resend: correos al cliente y al dueño.
  - Google Cloud: service account con **Sheets API** habilitada, con permiso de escritura en
    la pestaña *Pedidos*.
- **Llaves:** solo en variables secretas de Netlify. Las de prueba van en preview, staging y
  producción; las reales, solo cuando el dueño lo decida.

## 7. Fases

### Fase 1 — Vitrina que vende (≈ 1 semana)
- Antes de construir: boceto de la portada y de la ficha, aprobado por el dueño una vez.
- Portada: banner principal (titular, subtítulo, imagen, botón «Ver guías») desde la pestaña
  *Portada*; franja de confianza («Pago seguro con Mercado Pago · Yape y tarjeta · Descarga
  al instante»); grilla de guías de la pestaña *Productos* (portada, título, precio y precio
  tachado opcional).
- Ficha de venta: «Qué vas a lograr», «Para quién es», «Qué incluye», preguntas frecuentes
  (pestaña *Preguntas*) y botón «Comprar» (todavía inactivo) fijo abajo en el celular.
- La portada y la ficha se ven como el boceto aprobado, en celular y en escritorio, y si un
  cambio rompe cómo se ven, se detecta antes de fusionar.

**Valor:** la tienda está publicada, se ve profesional y el dueño cambia textos, guías y
precios desde el Sheet.

### Fase 2 — Pago (≈ 1 semana) · lo más dudoso
- «Comprar» → correo del cliente → Mercado Pago (sandbox) → «Gracias, pedido #N».
- La tienda anota el pedido en *Pedidos* como «pendiente»; el precio sale del servidor.
- El pedido pasa a «pagado» o «rechazado» **solo** con el webhook de Mercado Pago verificado
  por firma, nunca por la página de gracias.
- E2E de aprobado, rechazado y pendiente con Mercado Pago simulado.

**Valor:** se puede pagar una guía y el dueño ve el pedido pagado en el Sheet.

### Fase 3 — Entrega (≈ 1 semana)
- Con el pedido pagado, la página de gracias muestra un enlace de descarga firmado que vence a
  los 7 días.
- Le llega al cliente un correo con ese enlace y al dueño un aviso de venta.
- Los PDF no son públicos: solo se descargan con un enlace válido.
- Compra de punta a punta en staging contra el sandbox real (criterio de la sección 5).

**Valor:** el cliente recibe su guía y el ciclo de compra queda completo.

## 8. Criterios de aceptación

```gherkin
# Fase 1
Escenario: Ver el catálogo
  Dado que el Sheet tiene las guías "CV que sí llama" a S/ 15 y "Tu primera entrevista" a S/ 20
  Cuando entro a la portada
  Entonces veo las dos guías con su título, portada y precio

Escenario: Ver la ficha de una guía
  Dado que el Sheet tiene la guía "CV que sí llama" a S/ 15
  Cuando entro a su ficha
  Entonces veo su descripción, el precio "S/ 15" y el botón "Comprar"

Escenario: Catálogo vacío
  Dado que el Sheet no tiene guías
  Cuando entro a la portada
  Entonces veo "Pronto tendremos guías"

Escenario: Banner principal
  Dado que la pestaña Portada tiene el titular "Consigue tu primera chamba"
  Cuando entro a la portada
  Entonces veo el titular "Consigue tu primera chamba" y el botón "Ver guías"

Escenario: Señales de confianza
  Cuando entro a la portada
  Entonces veo "Pago seguro con Mercado Pago", "Yape y tarjeta" y "Descarga al instante"

Escenario: Precio de oferta
  Dado que "CV que sí llama" cuesta S/ 15 y antes costaba S/ 25
  Cuando entro a la portada
  Entonces veo "S/ 15" y "S/ 25" tachado

Escenario: Ficha de venta
  Dado que "CV que sí llama" tiene sus logros, para quién es y qué incluye en el Sheet
  Cuando entro a su ficha
  Entonces veo las secciones "Qué vas a lograr", "Para quién es", "Qué incluye" y "Preguntas frecuentes"

Escenario: Comprar siempre a mano en el celular
  Dado que entro a la ficha de "CV que sí llama" desde un celular
  Cuando bajo hasta las preguntas frecuentes
  Entonces sigo viendo el botón "Comprar · S/ 15"

Escenario: La portada se ve como la aprobada
  Dado que aprobé cómo se ve la portada en celular y en escritorio
  Cuando un cambio altera cómo se ve
  Entonces el PR queda en rojo y me muestra la diferencia antes de fusionar

Escenario: La ficha se ve como la aprobada
  Dado que aprobé cómo se ve la ficha de "CV que sí llama" en celular y en escritorio
  Cuando un cambio altera cómo se ve
  Entonces el PR queda en rojo y me muestra la diferencia antes de fusionar

Escenario: Se lee bien en un celular chico
  Cuando entro a la portada y a una ficha desde un celular chico
  Entonces no hay que moverse hacia los costados y todo se lee y se toca bien

# Fase 2
Escenario: Pedir el correo antes de pagar
  Dado que estoy en la ficha de "CV que sí llama"
  Cuando presiono "Comprar" y escribo "correo-malo"
  Entonces veo "Escribe un correo válido" y no paso a Mercado Pago

Escenario: Pago aprobado
  Dado que compro "CV que sí llama" con el correo "ana@ejemplo.com"
  Cuando Mercado Pago aprueba el pago y llega su notificación firmada
  Entonces la página de gracias muestra "Pedido #1 · Pagado"

Escenario: Pago rechazado
  Dado que compro "CV que sí llama"
  Cuando Mercado Pago rechaza el pago
  Entonces veo "Tu pago fue rechazado" y el botón "Intentar de nuevo"

Escenario: Pago pendiente
  Dado que compro "CV que sí llama"
  Cuando Mercado Pago deja el pago pendiente
  Entonces la página de gracias muestra "Pedido #1 · Estamos confirmando tu pago"

Escenario: La página de gracias no marca el pago
  Dado que compro "CV que sí llama" y todavía no llega la notificación de Mercado Pago
  Cuando abro la página de gracias del pedido #1
  Entonces veo "Estamos confirmando tu pago" y no veo el enlace de descarga

Escenario: Notificación con firma falsa
  Dado que el pedido #1 está pendiente
  Cuando llega una notificación de pago con una firma inválida
  Entonces la página de gracias del pedido #1 sigue mostrando "Estamos confirmando tu pago"

Escenario: El precio lo pone la tienda
  Dado que "CV que sí llama" cuesta S/ 15 en el Sheet
  Cuando intento comprarla enviando un precio de S/ 1 desde el navegador
  Entonces el resumen de pago muestra "S/ 15"

# Fase 3
Escenario: Descargar desde la página de gracias
  Dado que el pedido #1 de "CV que sí llama" está pagado
  Cuando abro su página de gracias
  Entonces veo el botón "Descargar tu guía" y al presionarlo se descarga el PDF

Escenario: Correo con la descarga
  Dado que el pedido #1 de "ana@ejemplo.com" está pagado
  Cuando reviso la bandeja de pruebas
  Entonces veo un correo para "ana@ejemplo.com" con el enlace "Descargar tu guía"

Escenario: Aviso de venta al dueño
  Dado que el pedido #1 de "CV que sí llama" está pagado
  Cuando reviso la bandeja de pruebas
  Entonces veo un correo para el dueño con "Nueva venta: CV que sí llama · S/ 15"

Escenario: Enlace vencido
  Dado que el enlace de descarga del pedido #1 se creó hace 8 días
  Cuando lo abro
  Entonces veo "Este enlace venció" y no se descarga el PDF

Escenario: Los PDF no son públicos
  Dado que existe la guía "CV que sí llama"
  Cuando intento abrir su PDF sin un enlace firmado, o con uno alterado
  Entonces veo "Enlace no válido" y no se descarga el PDF
```

## 9. Parking lot

- Cobrar de verdad: llaves reales de Mercado Pago en producción (2026-10-10): lo decide el
  dueño cuando la compra en sandbox funcione.
- Carrito con varias guías por compra (2026-10-10): el primer corte prueba una compra simple.
- Cuenta del cliente con su biblioteca de compras (2026-10-10): el enlace por correo alcanza
  para probar.
- Reenviar el enlace si venció o se perdió (2026-10-10): por ahora lo resuelve el dueño a mano.
- Guía gratis a cambio del correo (2026-10-10): captar clientes viene después de vender.
- Cupones, reseñas y analítica (2026-10-10): crecimiento, no validación.
- Testimonios (2026-10-10): sin clientes reales serían inventados; van con las primeras ventas.
- Contadores de urgencia, «quedan pocas» y popups (2026-10-10): presión de venta que no hace
  falta para validar.
- Carrusel de banners, animaciones y diseño a medida (2026-10-10): la plantilla alcanza; pulir
  no tiene fin.
- Cursos en video y audios (2026-10-10): otro producto.
- `/admin` web (2026-10-10): solo si el Sheet empieza a doler.
- Migrar de Google Sheets a una base de datos real (2026-10-10): solo si la ADR de la Fase 2
  muestra que el Sheet no alcanza; también está en el Parking lot del Guardián.
- Dominio propio (2026-10-10): `*.netlify.app` alcanza mientras no se cobre de verdad.
- Contenido real de las guías (2026-10-10): lo escribe el dueño aparte; no frena el desarrollo.

## 10. Decisiones tomadas

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-10-10 | Nombre: Chamba | Es la palabra local para «trabajo»: dice para quién es |
| 2026-10-10 | Tipo producto, 3 semanas, 3 fases | Es la prueba grande del Guardián: pagos, correos y entregas |
| 2026-10-10 | Compra directa sin carrito | Una guía por compra alcanza para probar el ciclo completo |
| 2026-10-10 | Pagos con Mercado Pago; la tienda nunca ve datos de tarjeta | Yape y tarjeta en Perú, sin responsabilidad sobre datos de tarjeta |
| 2026-10-10 | «Pagado» solo con webhook verificado por firma; precio calculado en el servidor | La página de gracias y el navegador se pueden falsificar |
| 2026-10-10 | Llaves de prueba en todos los ambientes hasta que el dueño decida cobrar | Cobrar de verdad es una decisión posterior |
| 2026-10-10 | E2E de aprobado/rechazado/pendiente con Mercado Pago simulado; compra real en sandbox solo en staging | El checkout de Mercado Pago es externo y frágil en CI; no debe frenar los PR |
| 2026-10-10 | Admin y pedidos en Google Sheet, sin `/admin` web | Visible desde el celular; si no alcanza, ADR en la Fase 2 |
| 2026-10-10 | Dónde guardar los PDF privados y cómo firmar el enlace que vence: ADR en la Fase 3 | Lo decide Claude con opciones (p. ej. Netlify Blobs o Google Drive) y lo aprueba el dueño |
| 2026-10-10 | Fase 1 = vitrina que vende, antes del pago | Deja publicada la base (Sheet, deploy y UI) en una semana; el pago, lo más dudoso, va enseguida |
| 2026-10-10 | UI vendedora con una lista cerrada de elementos, en la Fase 1, sin subir las 3 semanas | El dueño quiere que venda; la lista cerrada evita pulir sin fin. Si hay atraso, el Guardián lo avisa |
| 2026-10-10 | El boceto de la portada y la ficha se aprueba una vez antes de construir | «Profesional» es subjetivo: se acuerda en un boceto, no en iteraciones de código |
| 2026-10-11 | Cómo se ve la UI se cuida con pruebas en cada PR; las herramientas y los umbrales los decide /guardian-planificar con sus ADRs | El alcance dice qué se cuida; el cómo es decisión técnica del proyecto |
