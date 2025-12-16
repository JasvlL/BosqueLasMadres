// Script para la página de detalle del ave

document.addEventListener('DOMContentLoaded', function() {
    const playAudioBtn = document.getElementById('play-audio');
    const birdAudio = document.getElementById('bird-audio');

    // Reproducir audio del canto
    if (playAudioBtn && birdAudio) {
        playAudioBtn.addEventListener('click', function() {
            if (birdAudio.paused) {
                birdAudio.play();
                playAudioBtn.querySelector('.audio-text').textContent = 'Reproduciendo...';
            } else {
                birdAudio.pause();
                birdAudio.currentTime = 0;
                playAudioBtn.querySelector('.audio-text').textContent = 'Escuchar Canto';
            }
        });

        birdAudio.addEventListener('ended', function() {
            playAudioBtn.querySelector('.audio-text').textContent = 'Escuchar Canto';
        });
    }

    // Cargar datos del ave desde URL o API
    const urlParams = new URLSearchParams(window.location.search);
    const birdId = urlParams.get('id');
    
    if (birdId) {
        loadBirdData(birdId);
    }

    function loadBirdData(id) {
        // Aquí se cargarían los datos del ave desde una API o archivo JSON
        // Por ahora es un placeholder
        console.log('Cargando datos del ave:', id);
    }
});



