// Script para el formulario de voluntariado

document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteer-form');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar formulario
            if (this.checkValidity()) {
                // Recopilar datos del formulario
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);

                // Aquí se enviarían los datos a un servidor
                console.log('Datos del formulario:', data);

                // Mostrar mensaje de éxito
                alert('¡Gracias por tu interés! Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.');

                // Limpiar formulario
                this.reset();
            } else {
                // Mostrar errores de validación
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
});



