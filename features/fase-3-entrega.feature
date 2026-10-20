# language: es
Característica: Entrega
  El cliente recibe su guía y el ciclo de compra queda completo.

  @fase-3
  Escenario: Descargar desde la página de gracias
    Dado que el pedido #1 de "CV que sí llama" está pagado
    Cuando abro su página de gracias
    Entonces veo el botón "Descargar tu guía" y al presionarlo se descarga el PDF

  @fase-3
  Escenario: Correo con la descarga
    Dado que el pedido #1 de "ana@ejemplo.com" está pagado
    Cuando reviso la bandeja de pruebas
    Entonces veo un correo para "ana@ejemplo.com" con el enlace "Descargar tu guía"

  @fase-3
  Escenario: Aviso de venta al dueño
    Dado que el pedido #1 de "CV que sí llama" está pagado
    Cuando reviso la bandeja de pruebas
    Entonces veo un correo para el dueño con "Nueva venta: CV que sí llama · S/ 15"

  @fase-3
  Escenario: Enlace vencido
    Dado que el enlace de descarga del pedido #1 se creó hace 8 días
    Cuando lo abro
    Entonces veo "Este enlace venció" y no se descarga el PDF

  @fase-3
  Escenario: Los PDF no son públicos
    Dado que existe la guía "CV que sí llama"
    Cuando intento abrir su PDF sin un enlace firmado, o con uno alterado
    Entonces veo "Enlace no válido" y no se descarga el PDF
