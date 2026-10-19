document.addEventListener("DOMContentLoaded", () => {
  const recursoIdStr = localStorage.getItem("recursoSeleccionadoId");

  if (!recursoIdStr) {
    mostrarErrorRecurso("No se seleccionó ningún recurso previo.");
    return;
  }

  const recursoId = parseInt(recursoIdStr, 10);
  cargarDetalleRecurso(recursoId);
});

// Variable global para almacenar el recurso actualmente seleccionado en la modal
let recursoActualModal = null;

// Catálogo completo con la propiedad 'stock' integrada
const catalogoCompleto = [
  {
    id: 1,
    nombre: "Cancha de Tenis N° 1",
    categoria: "Cancha",
    tipo: "Cancha de Tenis",
    sede: "San Joaquín",
    bloque: "1-2 (08:15 - 09:25)",
    imagen: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Uso exclusivo con calzado de suela lisa o tenis. Mantener la cancha limpia.",
    materialesAsociados: [{ nombre: "Red de Tenis Profesional", cantidad: 1 }]
  },
  {
    id: 2,
    nombre: "Cancha de Tenis N° 2",
    categoria: "Cancha",
    tipo: "Cancha de Tenis",
    sede: "San Joaquín",
    bloque: "3-4 (09:35 - 10:45)",
    imagen: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Uso exclusivo con calzado de suela lisa o tenis.",
    materialesAsociados: [{ nombre: "Red de Tenis Profesional", cantidad: 1 }]
  },
  {
    id: 3,
    nombre: "Cancha de Fútbol Principal",
    categoria: "Cancha",
    tipo: "Cancha de Fútbol",
    sede: "San Joaquín",
    bloque: "5-6 (10:55 - 12:05)",
    imagen: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Obligatorio el uso de canilleras y zapatillas de fútbol.",
    materialesAsociados: [{ nombre: "Arcos Oficiales", cantidad: 2 }]
  },
  {
    id: 4,
    nombre: "Pack de 5 Balones de Básquetbol",
    categoria: "Material",
    tipo: "Balones de Básquetbol",
    sede: "Casa Central",
    bloque: "7-8 (12:15 - 13:25)",
    imagen: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Verificar nivel de inflado al retirar en pañol.",
    stock: 8, // Stock máximo disponible
    materialesAsociados: []
  },
  {
    id: 5,
    nombre: "Gimnasio Multiuso N° 1",
    categoria: "Cancha",
    tipo: "Gimnasio Multiuso",
    sede: "Casa Central",
    bloque: "9-10 (14:30 - 15:40)",
    imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Uso de zapatillas bajitas de suela blanca.",
    materialesAsociados: [{ nombre: "Arcos móviles", cantidad: 2 }]
  },
  {
    id: 6,
    nombre: "Set de Raquetas de Tenis (Par)",
    categoria: "Material",
    tipo: "Raquetas de Tenis",
    sede: "San Joaquín",
    bloque: "11-12 (15:50 - 17:00)",
    imagen: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80",
    indicaciones: "Manipular con cuidado para evitar daños en cuerdas.",
    stock: 4, // Stock máximo disponible
    materialesAsociados: []
  }
];

function cargarDetalleRecurso(id) {
  const contenedor = document.getElementById("contenedorDetalle");
  if (!contenedor) return;

  const recurso = catalogoCompleto.find(r => Number(r.id) === Number(id));

  if (!recurso) {
    mostrarErrorRecurso(`El recurso seleccionado (ID: ${id}) no existe en el catálogo.`);
    return;
  }

  recursoActualModal = recurso; // Guardamos la referencia para la modal
  const esCancha = recurso.categoria === "Cancha";

  const ladoIzquierdoHTML = `
    <div class="col-md-6 border-end pe-md-4">
      <h2 class="fw-bold text-dark mb-3">${recurso.nombre}</h2>
      
      <div class="mb-3 text-center">
        <img src="${recurso.imagen}" alt="${recurso.nombre}" class="img-fluid rounded-3 shadow-sm w-100" style="max-height: 280px; object-fit: cover;">
      </div>

      <div class="bg-light p-3 rounded-3 mb-4 border">
        <p class="mb-1 text-muted"><strong>Sede:</strong> ${recurso.sede}</p>
        <p class="mb-0 text-primary"><strong>Bloque Horario:</strong> ${recurso.bloque}</p>
      </div>

      <div>
        ${
          esCancha 
            ? `<button class="btn btn-success btn-lg w-100 fw-bold shadow-sm" onclick="reservarCanchaDirecta('${recurso.nombre}')">
                 <i class="bi bi-check-circle-fill me-2"></i> Reservar Cancha
               </button>`
            : `<button class="btn btn-primary btn-lg w-100 fw-bold shadow-sm" data-bs-toggle="modal" data-bs-target="#modalReservaMaterial" onclick="prepararModalMaterial()">
                 <i class="bi bi-arrow-right-circle-fill me-2"></i> Solicitar Reserva de Material
               </button>`
        }
      </div>
    </div>
  `;

  let listaMaterialesHTML = "";
  if (esCancha && recurso.materialesAsociados.length > 0) {
    const itemsLista = recurso.materialesAsociados
      .map(m => `<li class="list-group-item d-flex justify-content-between align-items-center">
                   <span><i class="bi bi-box-seam me-2 text-primary"></i>${m.nombre}</span>
                   <span class="badge bg-primary rounded-pill">Cantidad: ${m.cantidad}</span>
                 </li>`)
      .join("");

    listaMaterialesHTML = `
      <div class="mt-4 pt-3 border-top">
        <h4 class="fw-bold text-dark mb-3">
          <i class="bi bi-tools me-2 text-primary"></i>Materiales asociados
        </h4>
        <ul class="list-group shadow-sm">
          ${itemsLista}
        </ul>
      </div>
    `;
  }

  const ladoDerechoHTML = `
    <div class="col-md-6 ps-md-4 d-flex flex-column justify-content-between">
      <div>
        <h4 class="fw-bold text-dark mb-3">
          <i class="bi bi-exclamation-triangle-fill me-2 text-warning"></i>Indicaciones de Uso
        </h4>
        <div class="alert alert-warning border-0 shadow-sm text-dark fs-6">
          ${recurso.indicaciones}
        </div>
        ${listaMaterialesHTML}
      </div>
    </div>
  `;

  contenedor.innerHTML = ladoIzquierdoHTML + ladoDerechoHTML;
}

function prepararModalMaterial() {
  if (!recursoActualModal) return;

  document.getElementById("nombreMaterialModal").textContent = recursoActualModal.nombre;
  document.getElementById("stockDisponibleModal").textContent = `Stock máximo disponible: ${recursoActualModal.stock} unidades`;
  document.getElementById("inputCantidadDeseada").value = 1;
  document.getElementById("errorStock").classList.add("d-none");
}

function confirmarReservaMaterial() {
  const cantidadInput = document.getElementById("inputCantidadDeseada");
  const alertaError = document.getElementById("errorStock");
  const cantidadDeseada = parseInt(cantidadInput.value, 10);

  if (cantidadDeseada > recursoActualModal.stock) {
    // Muestra el mensaje exigido por el criterio de aceptación
    alertaError.classList.remove("d-none");
    return;
  }

  alertaError.classList.add("d-none");
  alert(`¡Reserva de ${cantidadDeseada} unidad(es) de "${recursoActualModal.nombre}" registrada con éxito! (Cumple HU02)`);
  
  // Cerrar modal y redirigir
  const modalEl = document.getElementById('modalReservaMaterial');
  const modalObj = bootstrap.Modal.getInstance(modalEl);
  modalObj.hide();

  window.location.href = "hu01-disponibilidad.html";
}

function mostrarErrorRecurso(mensaje) {
  const contenedor = document.getElementById("contenedorDetalle");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <h3 class="text-danger fw-bold"><i class="bi bi-exclamation-octagon me-2"></i>Recurso no encontrado</h3>
      <p class="text-muted">${mensaje}</p>
      <a href="hu01-disponibilidad.html" class="btn btn-primary mt-3">
        <i class="bi bi-arrow-left me-1"></i> Volver a Disponibilidad
      </a>
    </div>
  `;
}

function reservarCanchaDirecta(nombreCancha) {
  alert(`¡Reserva de ${nombreCancha} realizada con éxito! (Cumple HU02)`);
  window.location.href = "hu01-disponibilidad.html";
}