/*
  SEÇÕES:
    1) initModal()       - pré-visualização da foto do perfil
    2) initCardAnimation() - animação de entrada dos cards
    3) initCarousel()    - carrossel do portfólio
    4) initAudioPlayer() - player (island) + visualizador
    5) initClock()       - relógio ao vivo na barra de status
*/

/* ------------------------------------------------------------------
   Inicialização (DOM pronto)
   ------------------------------------------------------------------ */
// #region Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initCardAnimation();
    initCarousel();
    initAudioPlayer();
    initClock();
});
// #endregion

/* ---------- Modal (pré-visualização da foto) ---------- */
// #region Modal
function initModal() {
    const bioPhoto = document.getElementById('bioPhoto');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    if (!bioPhoto || !modal || !modalImg || !closeModal) return;

    bioPhoto.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = bioPhoto.src;
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}
// #endregion

/* ---------- Animação de entrada dos cards ---------- */
// #region Animação dos cards
function initCardAnimation() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}
// #endregion

/* ---------- Carrossel (portfólio) ---------- */
// #region Carrossel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    if (!track || !nextButton || !prevButton) return;

    const slides = Array.from(track.children);
    let currentSlideIndex = 0;

    const updateSlide = () => {
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    };

    const nextSlide = () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide();
    };

    const prevSlide = () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide();
    };

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    let autoplayInterval = setInterval(nextSlide, 4000);

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 4000);
    }
}
// #endregion

/* ---------- Player de áudio (music island) ---------- */
// #region Player de áudio
function initAudioPlayer() {
    const audio = document.getElementById('main-audio');
    const visualizer = document.getElementById('visualizer');
    const vinyl = document.getElementById('vinyl-img');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const volumeSlider = document.getElementById('volume-control');
    const playBtn = document.getElementById('play-btn');

    if (!audio || !visualizer || !vinyl || !playIcon || !pauseIcon || !volumeSlider || !playBtn) return;

    const setPlayingState = (playing) => {
        if (playing) {
            visualizer.classList.add('playing');
            vinyl.classList.add('spinning');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            visualizer.classList.remove('playing');
            vinyl.classList.remove('spinning');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    };

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
                .then(() => setPlayingState(true))
                .catch((error) => {
                    console.error('Erro ao tocar áudio:', error);
                    alert('Erro ao carregar o som. Verifique sua conexão ou o link do Drive.');
                });
        } else {
            audio.pause();
            setPlayingState(false);
        }
    });

    volumeSlider.addEventListener('input', (event) => {
        audio.volume = event.target.value;
    });

    audio.addEventListener('ended', () => setPlayingState(false));
}
// #endregion

/* ---------- Relógio ao vivo (barra de status) ---------- */
// #region Relógio ao vivo
function initClock() {
    const clockElement = document.getElementById('real-time-clock');
    if (!clockElement) return;

    const updateClock = () => {
        const options = {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const now = new Intl.DateTimeFormat('pt-BR', options).format(new Date());
        clockElement.textContent = now;
    };

    updateClock();
    setInterval(updateClock, 1000);
}
// #endregion
