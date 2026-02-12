// Script para la galería de aves - Sistema mejorado con carga dinámica

document.addEventListener('DOMContentLoaded', async function() {
    const searchForm = document.getElementById('bird-search-form');
    const birdsContainer = document.getElementById('birds-container');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const loadingIndicator = document.getElementById('loading-indicator');
    const resultsCount = document.getElementById('results-count');

    // Cargar datos de aves
    await birdsDataManager.loadBirds();
    
    // Cargar filtros dinámicamente
    populateFilters();
    
    // Renderizar todas las aves inicialmente
    renderBirds(birdsDataManager.getAllBirds());

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
        // Búsqueda en tiempo real
        const nameInput = document.getElementById('search-name');
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                applyFilters();
            });
        }

        // Filtros con cambio inmediato
        ['filter-color', 'filter-size', 'filter-habitat', 'filter-orden', 'filter-familia'].forEach(filterId => {
            const filterElement = document.getElementById(filterId);
            if (filterElement) {
                filterElement.addEventListener('change', applyFilters);
            }
        });

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });

        searchForm.addEventListener('reset', function() {
            resetFilters();
        });
    }

    function populateFilters() {
        // Llenar filtro de colores
        const colorFilter = document.getElementById('filter-color');
        if (colorFilter) {
            const colors = birdsDataManager.getUniqueColors();
            colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color;
                option.textContent = capitalizeFirst(color);
                colorFilter.appendChild(option);
            });
        }

        // Llenar filtro de órdenes
        const ordenFilter = document.getElementById('filter-orden');
        if (ordenFilter) {
            const orders = birdsDataManager.getUniqueOrders();
            orders.forEach(orden => {
                const option = document.createElement('option');
                option.value = orden;
                option.textContent = orden;
                ordenFilter.appendChild(option);
            });
        }

        // Llenar filtro de familias
        const familiaFilter = document.getElementById('filter-familia');
        if (familiaFilter) {
            const families = birdsDataManager.getUniqueFamilies();
            families.forEach(familia => {
                const option = document.createElement('option');
                option.value = familia;
                option.textContent = familia;
                familiaFilter.appendChild(option);
            });
        }
    }

    function applyFilters() {
        const filters = {
            nombre: document.getElementById('search-name')?.value || '',
            color: document.getElementById('filter-color')?.value || '',
            tamaño: document.getElementById('filter-size')?.value || '',
            habitat: document.getElementById('filter-habitat')?.value || '',
            orden: document.getElementById('filter-orden')?.value || '',
            familia: document.getElementById('filter-familia')?.value || ''
        };

        const filteredBirds = birdsDataManager.filterBirds(filters);
        renderBirds(filteredBirds);
        
        if (resultsCount) {
            resultsCount.textContent = `${filteredBirds.length} especie${filteredBirds.length !== 1 ? 's' : ''} encontrada${filteredBirds.length !== 1 ? 's' : ''}`;
        }
    }

    function resetFilters() {
        if (searchForm) {
            searchForm.reset();
        }
        const allBirds = birdsDataManager.getAllBirds();
        renderBirds(allBirds);
        
        if (resultsCount) {
            resultsCount.textContent = `${allBirds.length} especie${allBirds.length !== 1 ? 's' : ''} en total`;
        }
    }

    function renderBirds(birds) {
        if (!birdsContainer) return;

        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Limpiar contenedor
        birdsContainer.innerHTML = '';

        if (birds.length === 0) {
            birdsContainer.innerHTML = '<p class="no-results">No se encontraron aves con los criterios seleccionados.</p>';
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            return;
        }

        // Renderizar cada ave
        birds.forEach(bird => {
            const birdCard = createBirdCard(bird);
            birdsContainer.appendChild(birdCard);
        });

        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    function createBirdCard(bird) {
        const card = document.createElement('a');
        card.href = `ave-detalle.html?id=${bird.id}`;
        card.className = 'bird-card';
        
        // Atributos de datos para filtros legacy
        if (bird.colores && bird.colores.length > 0) {
            card.setAttribute('data-color', bird.colores[0]);
        }
        card.setAttribute('data-size', bird.tamaño || '');
        if (bird.habitat && bird.habitat.length > 0) {
            card.setAttribute('data-habitat', bird.habitat[0]);
        }

        // Imagen
        const img = document.createElement('img');
        img.src = bird.imagen || 'assets/images/aves/placeholder.jpg';
        img.alt = bird.nombreComun;
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'assets/images/aves/placeholder.jpg';
        };

        // Información
        const info = document.createElement('div');
        info.className = 'bird-info';

        const title = document.createElement('h3');
        title.textContent = bird.nombreComun;
        
        const scientific = document.createElement('p');
        scientific.className = 'scientific-name';
        scientific.innerHTML = `<em>${bird.nombreCientifico}</em>`;

        // Badge emblemática
        if (bird.emblematica) {
            const badge = document.createElement('span');
            badge.className = 'emblematic-badge';
            badge.textContent = '⭐ Emblemática';
            info.appendChild(badge);
        }

        info.appendChild(title);
        info.appendChild(scientific);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Mostrar contador inicial
    if (resultsCount) {
        const totalBirds = birdsDataManager.getAllBirds().length;
        resultsCount.textContent = `${totalBirds} especie${totalBirds !== 1 ? 's' : ''} en total`;
    }
});



