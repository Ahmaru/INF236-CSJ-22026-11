// Simulación del usuario actual (puedes cambiar 'sancionado' a true para probar la restricción)
const usuarioActual = {
  nombre: "Juan Pérez",
  correo: "juan.perez@usm.cl",
  tipo: "estudiante",
  sancionado: false, // Cambiar a true para probar el bloqueo por sanción (HU01 - Criterio 3)
  motivoSancion: "No presentarse a una reserva confirmada el bloque anterior."
};

document.addEventListener("DOMContentLoaded", () => {
  const hoy = new Date().toISOString().split('T')[0];
  const inputFecha = document.getElementById("filtroFecha");
  if (inputFecha) inputFecha.value = hoy;

  // Validar si el usuario está sancionado al cargar la vista
  verificarSancionUsuario();

  aplicarFiltros();
});

function verificarSancionUsuario() {
  const alerta = document.getElementById("alertaSancion");
  const textoMensaje = document.getElementById("textoMensajeSancion");

  if (usuarioActual.sancionado) {
    if (alerta) alerta.classList.remove("d-none");
    if (textoMensaje) {
      textoMensaje.innerHTML = `<strong>Acción restringida:</strong> ${usuarioActual.motivoSancion}`;
    }
  }
}

// Catálogo exacto con IDs del 1 al 6 (el mismo que ya tienes)
const catalogoRecursos = [
  { id: 1, nombre: "Cancha de Tenis N° 1", tipo: "Cancha de Tenis", categoria: "Cancha", sede: "San Joaquín", bloque: "1-2", horario: "08:15 - 09:25", disponible: true, stock: 1 },
  { id: 2, nombre: "Cancha de Tenis N° 2", tipo: "Cancha de Tenis", categoria: "Cancha", sede: "San Joaquín", bloque: "3-4", horario: "09:35 - 10:45", disponible: false, stock: 0 },
  { id: 3, nombre: "Cancha de Fútbol Principal", tipo: "Cancha de Fútbol", categoria: "Cancha", sede: "San Joaquín", bloque: "5-6", horario: "10:55 - 12:05", disponible: true, stock: 1 },
  { id: 4, nombre: "Pack de 5 Balones de Básquetbol", tipo: "Balones de Básquetbol", categoria: "Material", sede: "Casa Central", bloque: "7-8", horario: "12:15 - 13:25", disponible: true, stock: 8 },
  { id: 5, nombre: "Gimnasio Multiuso N° 1", tipo: "Gimnasio Multiuso", categoria: "Cancha", sede: "Casa Central", bloque: "9-10", horario: "14:30 - 15:40", disponible: false, stock: 0 },
  { id: 6, nombre: "Set de Raquetas de Tenis (Par)", tipo: "Raquetas de Tenis", categoria: "Material", sede: "San Joaquín", bloque: "11-12", horario: "15:50 - 17:00", disponible: true, stock: 4 }
];

function aplicarFiltros() {
  const sedeSelect = document.getElementById("filtroSede");
  const recursoSelect = document.getElementById("filtroRecurso");
  const bloqueSelect = document.getElementById("filtroBloque");

  const sede = sedeSelect ? sedeSelect.value : "";
  const recurso = recursoSelect ? recursoSelect.value : "";
  const bloque = bloqueSelect ? bloqueSelect.value : "";

  const filtrados = catalogoRecursos.filter(item => {
    const coincideSede = sede === "" || item.sede === sede;
    const coincideRecurso = recurso === "" || item.categoria === recurso || item.tipo === recurso;
    const coincideBloque = bloque === "" || item.bloque === bloque;
    
    return coincideSede && coincideRecurso && coincideBloque && item.disponible;
  });

  renderizarResultados(filtrados);
}

function renderizarResultados(lista) {
  const contenedor = document.getElementById("contenedorRecursos");
  const mensajeNoDisponible = document.getElementById("mensajeNoDisponible");
  const contador = document.getElementById("contadorResultados");

  if (!contenedor) return;

  contenedor.innerHTML = "";
  if (contador) contador.textContent = `${lista.length} disponibles`;

  if (lista.length === 0) {
    contenedor.classList.add("d-none");
    if (mensajeNoDisponible) mensajeNoDisponible.classList.remove("d-none");
    return;
  }

  if (mensajeNoDisponible) mensajeNoDisponible.classList.add("d-none");
  contenedor.classList.remove("d-none");

  lista.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";
    
    // Si está sancionado, cambiamos el botón para que al hacer clic notifique y bloquee el paso
    let botonAccion = "";
    if (usuarioActual.sancionado) {
      botonAccion = `
        <button onclick="notificarSancion()" class="btn btn-outline-danger btn-sm fw-semibold">
          <i class="bi bi-slash-circle me-1"></i> Sancionado
        </button>
      `;
    } else {
      botonAccion = `
        <button onclick="verDetalle(${item.id})" class="btn btn-outline-primary btn-sm fw-semibold">
          <i class="bi bi-eye me-1"></i> Seleccionar
        </button>
      `;
    }

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i>Disponible</span>
            <span class="badge bg-light text-dark border">${item.categoria}</span>
          </div>
          <h5 class="card-title fw-bold text-dark">${item.nombre}</h5>
          <p class="card-text text-muted mb-1"><i class="bi bi-geo-alt-fill me-1 text-danger"></i>${item.sede}</p>
          <p class="card-text text-muted mb-3"><i class="bi bi-clock-fill me-1 text-primary"></i>Bloque ${item.bloque} (${item.horario})</p>
          
          <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
            <small class="text-muted">${item.categoria === 'Material' ? 'Stock: ' + item.stock : 'Cancha individual'}</small>
            ${botonAccion}
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

function verDetalle(id) {
  localStorage.setItem("recursoSeleccionadoId", id);
  window.location.href = "detalle-recurso.html";
}

function notificarSancion() {
  alert("⚠️ No puedes avanzar: Tienes una sanción activa en el sistema DEFIDER que te restringe realizar reservas.");
}

function limpiarFiltros() {
  document.getElementById("filtroSede").value = "";
  document.getElementById("filtroRecurso").value = "";
  document.getElementById("filtroBloque").value = "";
  aplicarFiltros();
}