document.getElementById('form-inscripcion')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const rut = document.getElementById('rutEstudiante').value;
  alert(`Inscripción calendarizada especial registrada para el RUT: ${rut}`);
});