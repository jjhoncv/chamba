# language: es
Característica: Vitrina que vende
  La tienda está publicada, se ve profesional y el dueño cambia textos, guías y precios desde el Sheet.

  @fase-1
  Escenario: Ver el catálogo
    Dado que el Sheet tiene las guías "CV que sí llama" a S/ 15 y "Tu primera entrevista" a S/ 20
    Cuando entro a la portada
    Entonces veo las dos guías con su título, portada y precio

  @fase-1
  Escenario: Ver la ficha de una guía
    Dado que el Sheet tiene la guía "CV que sí llama" a S/ 15
    Cuando entro a su ficha
    Entonces veo su descripción, el precio "S/ 15" y el botón "Comprar"

  @fase-1
  Escenario: Catálogo vacío
    Dado que el Sheet no tiene guías
    Cuando entro a la portada
    Entonces veo "Pronto tendremos guías"

  @fase-1
  Escenario: Banner principal
    Dado que la pestaña Portada tiene el titular "Consigue tu primera chamba"
    Cuando entro a la portada
    Entonces veo el titular "Consigue tu primera chamba" y el botón "Ver guías"

  @fase-1 @smoke
  Escenario: Señales de confianza
    Cuando entro a la portada
    Entonces veo "Pago seguro con Mercado Pago", "Yape y tarjeta" y "Descarga al instante"

  @fase-1
  Escenario: Precio de oferta
    Dado que "CV que sí llama" cuesta S/ 15 y antes costaba S/ 25
    Cuando entro a la portada
    Entonces veo "S/ 15" y "S/ 25" tachado

  @fase-1
  Escenario: Ficha de venta
    Dado que "CV que sí llama" tiene sus logros, para quién es y qué incluye en el Sheet
    Cuando entro a su ficha
    Entonces veo las secciones "Qué vas a lograr", "Para quién es", "Qué incluye" y "Preguntas frecuentes"

  @fase-1
  Escenario: Comprar siempre a mano en el celular
    Dado que entro a la ficha de "CV que sí llama" desde un celular
    Cuando bajo hasta las preguntas frecuentes
    Entonces sigo viendo el botón "Comprar · S/ 15"

  @fase-1
  Escenario: La portada se ve como la aprobada
    Dado que aprobé cómo se ve la portada en celular y en escritorio
    Cuando un cambio altera cómo se ve
    Entonces el PR queda en rojo y me muestra la diferencia antes de fusionar

  @fase-1
  Escenario: La ficha se ve como la aprobada
    Dado que aprobé cómo se ve la ficha de "CV que sí llama" en celular y en escritorio
    Cuando un cambio altera cómo se ve
    Entonces el PR queda en rojo y me muestra la diferencia antes de fusionar

  @fase-1
  Escenario: Se lee bien en un celular chico
    Cuando entro a la portada y a una ficha desde un celular chico
    Entonces no hay que moverse hacia los costados y todo se lee y se toca bien
