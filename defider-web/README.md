- prompt para index.html: 
Primero vamos con la pagina home.
index.html: Borde arriba con un logo de defider. Pagina principal tendra la opcion de iniciar sesion 
 Ahora necesito que en login puedan iniciar sesion 2 tipos de usuario, uno que es el estudiante (usuario comun), y el otro es el administrador. Cuando inicie sesion un estudiante, te llevara a hu01-disponibilidad.html (elimine la pagina intermedia seleccion-recurso.html, ahora al iniciar sesion te lleva directamente a hu01-disponibilidad.html). Si inicia sesion un administrador, te llevara a la pagina inscripcion-calendarizada.html (por el momento no hagas nada para esta ultima pagina). 

- ahora vamos con seleccion-recurso.html:
Borde arriba, a la izquierda con el logo de defider, y a la derecha con el nombre de usuario + opcion de cerrar sesion. Pagina principal tendra un texto que diga "Seleccionar Recurso", y las dos opciones de recursos (Cancha o Material). Cuando se seleccione el recurso, te llevara a la pagina de hu01-disponibilidad.html con option=recurso seleccionado. 

-  ahora con hu01-disponibilidad.html:
Una barra arriba que contenga a la izq el logo de defider, y a la derecha diga el nombre del usuario junto a la opcion de cerrar sesion.
Un titulo que diga "Disponibilidad de horarios"
4 filtros: Fecha, Sede, Recurso, Bloques (estos bloques van de 1-2, 3-4, 5-6 ... 15-16)
Una seccion donde se desplegaran los recursos filtrados disponibles, si no estan disponibles que se muestre algun texto que diga que no esta disponible.
Cuando se despliegue un recurso, pueda seleccionarlo y al seleccionarlo me lleva a otra pagina donde se mostraran los detalles del recurso
Deja el script de js en otro archivo que sera disponibilidad.js

- detalle-recurso.html:
necesito diferenciarlo ademas por categoria, ya que seran 2 tipos de pagina similares pero con una diferencia. Necesito que detalle-recurso este dividida verticalmente en 2, en un lado se vera el nombre del recurso, una foto del recurso, el bloque correspondiente, y abajo un boton de reservar (para canchas solo reservara, para materiales te llevara a reserva.html). Para el lado derecho estara un titulo que dira "Indicaciones de Uso", y abajo un texto con todas las indicaciones de uso. Ahora en el caso de canchas, abajo de las indicaciones de uso ira un titulo que dira "Materiales asociados", y una lista todos los materiales asociados y su cantidad. En el caso de materiales, abajo de indicaciones de uso no ira nada, pero cuando se quiere reservar el material te llevara a reserva-material.html.

-sancion: 
Ahora quisiera ver el criterio de aceptacion respecto a si el estudiante esta sancionado, como lo añado al codigo?