// Script para la galería de aves

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('bird-search-form');
    const birdsContainer = document.getElementById('birds-container');
    const viewToggles = document.querySelectorAll('.view-toggle');

    // Toggle de vista (grid/list)
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            if (birdsContainer) {
                birdsContainer.className = view === 'grid' ? 'birds-grid' : 'birds-list';
            }
        });
    });

    // Búsqueda y filtros
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterBirds();
        });

        searchForm.addEventListener('reset', function() {
            resetFilters();
        });
    }

    function filterBirds() {
        const name = document.getElementById('search-name')?.value.toLowerCase() || '';
        const color = document.getElementById('filter-color')?.value || '';
        const size = document.getElementById('filter-size')?.value || '';
        const habitat = document.getElementById('filter-habitat')?.value || '';

        const birdCards = document.querySelectorAll('.bird-card');
        
        birdCards.forEach(card => {
            const birdName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const birdColor = card.getAttribute('data-color') || '';
            const birdSize = card.getAttribute('data-size') || '';
            const birdHabitat = card.getAttribute('data-habitat') || '';

            const matchesName = !name || birdName.includes(name);
            const matchesColor = !color || birdColor === color;
            const matchesSize = !size || birdSize === size;
            const matchesHabitat = !habitat || birdHabitat === habitat;

            if (matchesName && matchesColor && matchesSize && matchesHabitat) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function resetFilters() {
        const birdCards = document.querySelectorAll('.bird-card');
        birdCards.forEach(card => {
            card.style.display = '';
        });
    }
});



