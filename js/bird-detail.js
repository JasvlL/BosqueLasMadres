// Script para la página de detalle del ave - Sistema mejorado

document.addEventListener('DOMContentLoaded', async function() {
    const playAudioBtn = document.getElementById('play-audio');
    const birdAudio = document.getElementById('bird-audio');

    // Cargar datos de aves
    await birdsDataManager.loadBirds();

    // Obtener ID del ave desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const birdId = urlParams.get('id');
    
    if (birdId) {
        loadBirdData(birdId);
    } else {
        showError('No se especificó un ave para mostrar.');
    }

    function loadBirdData(id) {
        const bird = birdsDataManager.getBirdById(id);
        
        if (!bird) {
            showError('Ave no encontrada.');
            return;
        }

        // Actualizar título de la página
        document.title = `${bird.nombreComun} - Corredor Biológico`;

        // Actualizar breadcrumb
        const breadcrumbName = document.getElementById('breadcrumb-name');
        if (breadcrumbName) {
            breadcrumbName.textContent = bird.nombreComun;
        }

        // Imagen principal
        const mainImage = document.getElementById('bird-main-image');
        if (mainImage) {
            mainImage.src = bird.imagen || 'assets/images/aves/placeholder.jpg';
            mainImage.alt = bird.nombreComun;
            mainImage.onerror = function() {
                this.src = 'assets/images/aves/placeholder.jpg';
            };
        }

        // Nombre común
        const commonName = document.getElementById('bird-common-name');
        if (commonName) {
            commonName.textContent = bird.nombreComun;
        }

        // Nombre científico
        const scientificName = document.getElementById('bird-scientific-name');
        if (scientificName) {
            scientificName.innerHTML = `<em>${bird.nombreCientifico}</em>`;
        }

        // Información rápida
        const sizeBadge = document.getElementById('bird-size');
        if (sizeBadge) {
            sizeBadge.textContent = `Tamaño: ${capitalizeFirst(bird.tamaño || 'No especificado')}`;
        }

        const habitatBadge = document.getElementById('bird-habitat');
        if (habitatBadge && bird.habitat && bird.habitat.length > 0) {
            habitatBadge.textContent = `Hábitat: ${bird.habitat.map(h => capitalizeFirst(h)).join(', ')}`;
        }

        const conservationBadge = document.getElementById('bird-conservation');
        if (conservationBadge) {
            conservationBadge.textContent = `Estado: ${bird.conservacion || 'No especificado'}`;
        }

        // Audio
        if (birdAudio && bird.audio) {
            birdAudio.src = bird.audio;
            birdAudio.load();
        }

        // Descripción
        const description = document.getElementById('bird-description');
        if (description) {
            description.textContent = bird.descripcion || 'Descripción no disponible.';
        }

        // Hábitat detallado
        const habitatDetail = document.getElementById('bird-habitat-detail');
        if (habitatDetail) {
            if (bird.habitat && bird.habitat.length > 0) {
                habitatDetail.textContent = `Esta especie se encuentra principalmente en: ${bird.habitat.map(h => capitalizeFirst(h)).join(', ')}.`;
            } else {
                habitatDetail.textContent = 'Información de hábitat no disponible.';
            }
        }

        // Alimentación
        const diet = document.getElementById('bird-diet');
        if (diet) {
            diet.textContent = bird.dieta || 'Información de alimentación no disponible.';
        }

        // Comportamiento
        const behavior = document.getElementById('bird-behavior');
        if (behavior) {
            behavior.textContent = bird.comportamiento || 'Información de comportamiento no disponible.';
        }

        // Conservación
        const conservationDetail = document.getElementById('bird-conservation-detail');
        if (conservationDetail) {
            conservationDetail.textContent = `Estado de conservación: ${bird.conservacion || 'No especificado'}.`;
        }

        // Características identificables
        const characteristics = document.getElementById('bird-characteristics');
        if (characteristics) {
            characteristics.innerHTML = '';
            if (bird.colores && bird.colores.length > 0) {
                const colorItem = document.createElement('li');
                colorItem.textContent = `Colores: ${bird.colores.map(c => capitalizeFirst(c)).join(', ')}`;
                characteristics.appendChild(colorItem);
            }
            if (bird.orden) {
                const ordenItem = document.createElement('li');
                ordenItem.textContent = `Orden: ${bird.orden}`;
                characteristics.appendChild(ordenItem);
            }
            if (bird.familia) {
                const familiaItem = document.createElement('li');
                familiaItem.textContent = `Familia: ${bird.familia}`;
                characteristics.appendChild(familiaItem);
            }
            if (bird.nombreIngles) {
                const englishItem = document.createElement('li');
                englishItem.textContent = `Nombre en inglés: ${bird.nombreIngles}`;
                characteristics.appendChild(englishItem);
            }
            if (characteristics.children.length === 0) {
                characteristics.innerHTML = '<li>Características no disponibles.</li>';
            }
        }

        // Badge emblemática
        if (bird.emblematica) {
            const headerInfo = document.querySelector('.bird-header-info');
            if (headerInfo) {
                let badge = headerInfo.querySelector('.emblematic-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'emblematic-badge';
                    headerInfo.insertBefore(badge, headerInfo.firstChild);
                }
                badge.textContent = '⭐ Especie Emblemática';
                if (bird.ganadoraConteo2024) {
                    badge.textContent += ' - Ganadora Conteo 2024';
                }
            }
        }
    }

    // Reproducir audio del canto
    if (playAudioBtn && birdAudio) {
        playAudioBtn.addEventListener('click', function() {
            if (birdAudio.paused) {
                birdAudio.play().catch(error => {
                    console.error('Error reproduciendo audio:', error);
                    playAudioBtn.querySelector('.audio-text').textContent = 'Audio no disponible';
                });
                playAudioBtn.querySelector('.audio-text').textContent = 'Reproduciendo...';
                playAudioBtn.classList.add('playing');
            } else {
                birdAudio.pause();
                birdAudio.currentTime = 0;
                playAudioBtn.querySelector('.audio-text').textContent = 'Escuchar Canto';
                playAudioBtn.classList.remove('playing');
            }
        });

        birdAudio.addEventListener('ended', function() {
            playAudioBtn.querySelector('.audio-text').textContent = 'Escuchar Canto';
            playAudioBtn.classList.remove('playing');
        });

        birdAudio.addEventListener('error', function() {
            playAudioBtn.querySelector('.audio-text').textContent = 'Audio no disponible';
            playAudioBtn.disabled = true;
        });
    }

    function showError(message) {
        const mainContent = document.querySelector('.main-content .container');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>Error</h2>
                    <p>${message}</p>
                    <a href="aves.html" class="btn btn-primary">Volver a Galería de Aves</a>
                </div>
            `;
        }
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});



