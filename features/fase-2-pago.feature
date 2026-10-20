# language: es
Característica: Pago
  Se puede pagar una guía y el dueño ve el pedido pagado en el Sheet.

  @fase-2
  Escenario: Pedir el correo antes de pagar
    Dado que estoy en la ficha de "CV que sí llama"
    Cuando presiono "Comprar" y escribo "correo-malo"
    Entonces veo "Escribe un correo válido" y no paso a Mercado Pago

  @fase-2
  Escenario: Pago aprobado
    Dado que compro "CV que sí llama" con el correo "ana@ejemplo.com"
    Cuando Mercado Pago aprueba el pago y llega su notificación firmada
    Entonces la página de gracias muestra "Pedido #1 · Pagado"

  @fase-2
  Escenario: Pago rechazado
    Dado que compro "CV que sí llama"
    Cuando Mercado Pago rechaza el pago
    Entonces veo "Tu pago fue rechazado" y el botón "Intentar de nuevo"

  @fase-2
  Escenario: Pago pendiente
    Dado que compro "CV que sí llama"
    Cuando Mercado Pago deja el pago pendiente
    Entonces la página de gracias muestra "Pedido #1 · Estamos confirmando tu pago"

  @fase-2
  Escenario: La página de gracias no marca el pago
    Dado que compro "CV que sí llama" y todavía no llega la notificación de Mercado Pago
    Cuando abro la página de gracias del pedido #1
    Entonces veo "Estamos confirmando tu pago" y no veo el enlace de descarga

  @fase-2
  Escenario: Notificación con firma falsa
    Dado que el pedido #1 está pendiente
    Cuando llega una notificación de pago con una firma inválida
    Entonces la página de gracias del pedido #1 sigue mostrando "Estamos confirmando tu pago"

  @fase-2
  Escenario: El precio lo pone la tienda
    Dado que "CV que sí llama" cuesta S/ 15 en el Sheet
    Cuando intento comprarla enviando un precio de S/ 1 desde el navegador
    Entonces el resumen de pago muestra "S/ 15"
