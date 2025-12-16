// Script principal - Corredor Biológico Bosque Las Madres

// Menú móvil toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Toggle de Modo Oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Cargar preferencia guardada
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('theme-dark');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            
            // Guardar preferencia
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Cambiar icono
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            themeToggle.setAttribute('title', isDark ? 'Modo claro' : 'Modo oscuro');
        });
    }

    // Validación de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

// Funciones auxiliares
function showMessage(message, type = 'info') {
    // Función para mostrar mensajes al usuario
    console.log(`${type}: ${message}`);
    // Aquí se puede implementar un sistema de notificaciones
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



