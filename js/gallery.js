// Script para la galería fotográfica

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Filtros de categorías
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar imágenes
            galleryItems.forEach(item => {
                if (category === 'todas' || item.getAttribute('data-category') === category) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox
    const galleryLinks = document.querySelectorAll('.gallery-link');
    let currentImageIndex = 0;
    const visibleImages = [];

    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption')?.textContent || '';

            // Actualizar lista de imágenes visibles
            updateVisibleImages();

            currentImageIndex = visibleImages.indexOf(index);
            if (currentImageIndex === -1) currentImageIndex = 0;

            showLightbox(img.src, caption);
        });
    });

    function updateVisibleImages() {
        visibleImages.length = 0;
        galleryItems.forEach((item, index) => {
            if (item.style.display !== 'none') {
                visibleImages.push(index);
            }
        });
    }

    function showLightbox(src, caption) {
        if (lightbox && lightboxImage && lightboxCaption) {
            lightboxImage.src = src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function showNextImage() {
        if (visibleImages.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            const link = galleryLinks[visibleImages[currentImageIndex]];
            const img = link.querySelector('img');
            const caption = link.querySelector('.gallery-caption')?.textContent || '';
            showLightbox(img.src, caption);
        }
    }

    function showPrevImage() {
        if (visibleImages.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            const link = galleryLinks[visibleImages[currentImageIndex]];
            const img = link.querySelector('img');
            const caption = link.querySelector('.gallery-caption')?.textContent || '';
            showLightbox(img.src, caption);
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', hideLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });
    }

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                hideLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
});



