# 0001. Cómo se cuida la UI

- **Fecha:** 2026-10-19
- **Estado:** Propuesta

## Contexto

`PROYECTO.md` (decisión del 2026-10-11) pide que la portada y la ficha se vean como el boceto
aprobado, en celular y en escritorio, que un cambio que rompa cómo se ven se detecte antes de
fusionar, y que todo se lea y se toque bien en un celular chico. Faltaba decidir con qué
herramientas y con qué umbrales.

## Decisión

- **Boceto = T1.** La portada y la ficha completas con datos de prueba; su preview es el boceto
  y fusionar el PR es aprobar el diseño.
- **Regresión visual** con `toHaveScreenshot` de Playwright (ya está en el stack), en dos
  tamaños: celular (390 px) y escritorio (1280 px), siempre con datos de prueba (fixtures) y
  animaciones apagadas.
- Las capturas de referencia se generan y comparan en el **contenedor Linux de Playwright** con
  la misma versión del CI, para que las fuentes y el antialiasing no cambien entre máquinas.
- **Umbral:** el check falla si difiere más del **1 %** de los píxeles. El reporte con la
  diferencia se sube como artefacto del run y se enlaza en su resumen.
- Cambiar una captura de referencia entra como archivo en el PR, y GitHub la muestra como
  imagen: **fusionar ese PR es aprobar el cambio visual**.
- **Celular chico:** 320 px de ancho, sin scroll horizontal (`scrollWidth ≤ clientWidth`),
  texto de al menos **16 px** y elementos tocables de al menos **44×44 px**.

## Por qué

Playwright ya corre los E2E: no suma dependencias ni cuentas. Se descartaron los servicios
externos de capturas (Percy, Chromatic) porque cuestan o piden otra cuenta, y el presupuesto es
S/ 0. El 1 % tolera el ruido de render sin dejar pasar un bloque movido. Los 44 px siguen la guía
de Apple y la WCAG 2.5.5, y los 16 px evitan que el celular haga zoom en los campos.
