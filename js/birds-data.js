// Sistema de gestión de datos de aves - Conteo 2024
// Carga dinámica desde JSON

class BirdsDataManager {
    constructor() {
        this.birds = [];
        this.loaded = false;
        this.loadPromise = null;
    }

    async loadBirds() {
        if (this.loaded) {
            return this.birds;
        }

        if (this.loadPromise) {
            return this.loadPromise;
        }

        this.loadPromise = fetch('data/birds.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar datos de aves');
                }
                return response.json();
            })
            .then(data => {
                this.birds = data.birds || [];
                this.metadata = data.metadata || {};
                this.loaded = true;
                return this.birds;
            })
            .catch(error => {
                console.error('Error cargando datos:', error);
                this.birds = [];
                return [];
            });

        return this.loadPromise;
    }

    getAllBirds() {
        return this.birds;
    }

    getBirdById(id) {
        return this.birds.find(bird => bird.id === id);
    }

    getBirdsByOrder(orden) {
        return this.birds.filter(bird => bird.orden === orden);
    }

    getBirdsByFamily(familia) {
        return this.birds.filter(bird => bird.familia === familia);
    }

    getBirdsByHabitat(habitat) {
        return this.birds.filter(bird => 
            bird.habitat && bird.habitat.includes(habitat)
        );
    }

    getBirdsByColor(color) {
        return this.birds.filter(bird => 
            bird.colores && bird.colores.includes(color)
        );
    }

    getBirdsBySize(tamaño) {
        return this.birds.filter(bird => bird.tamaño === tamaño);
    }

    searchBirds(query) {
        const lowerQuery = query.toLowerCase();
        return this.birds.filter(bird => 
            bird.nombreComun.toLowerCase().includes(lowerQuery) ||
            bird.nombreCientifico.toLowerCase().includes(lowerQuery) ||
            bird.nombreIngles.toLowerCase().includes(lowerQuery)
        );
    }

    filterBirds(filters) {
        let results = [...this.birds];

        if (filters.nombre) {
            results = this.searchBirds(filters.nombre);
        }

        if (filters.color) {
            results = results.filter(bird => 
                bird.colores && bird.colores.includes(filters.color)
            );
        }

        if (filters.tamaño) {
            results = results.filter(bird => bird.tamaño === filters.tamaño);
        }

        if (filters.habitat) {
            results = results.filter(bird => 
                bird.habitat && bird.habitat.includes(filters.habitat)
            );
        }

        if (filters.orden) {
            results = results.filter(bird => bird.orden === filters.orden);
        }

        if (filters.familia) {
            results = results.filter(bird => bird.familia === filters.familia);
        }

        if (filters.emblematica !== undefined) {
            results = results.filter(bird => bird.emblematica === filters.emblematica);
        }

        return results;
    }

    getUniqueOrders() {
        const orders = [...new Set(this.birds.map(bird => bird.orden))];
        return orders.sort();
    }

    getUniqueFamilies() {
        const families = [...new Set(this.birds.map(bird => bird.familia))];
        return families.sort();
    }

    getUniqueHabitats() {
        const habitats = new Set();
        this.birds.forEach(bird => {
            if (bird.habitat) {
                bird.habitat.forEach(h => habitats.add(h));
            }
        });
        return Array.from(habitats).sort();
    }

    getUniqueColors() {
        const colors = new Set();
        this.birds.forEach(bird => {
            if (bird.colores) {
                bird.colores.forEach(c => colors.add(c));
            }
        });
        return Array.from(colors).sort();
    }

    getEmblematicBirds() {
        return this.birds.filter(bird => bird.emblematica === true);
    }

    getMetadata() {
        return this.metadata;
    }
}

// Instancia global
const birdsDataManager = new BirdsDataManager();

