// Script para la página de otras especies

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const speciesSections = document.querySelectorAll('.species-section');

    // Tabs de categorías
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remover active de todos los botones y secciones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            speciesSections.forEach(section => section.classList.remove('active'));

            // Agregar active al botón y sección seleccionados
            this.classList.add('active');
            const targetSection = document.getElementById(category);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});



