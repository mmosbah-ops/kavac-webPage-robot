// Carrusel Arrastrable
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('funcionesCarousel');
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.funcion-card');
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let currentIndex = 0;
    
    // Función para centrar una tarjeta específica
    function setActiveCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }
    
    // Inicializar con la primera tarjeta activa
    setActiveCard(0);
    
    // Eventos de arrastre
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para velocidad
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Efecto de resaltado al hacer clic en una tarjeta
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            setActiveCard(index);
        });
    });
    
    // Rotación automática cada 5 segundos
    let autoRotate = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        setActiveCard(nextIndex);
        
        // Desplazar suavemente hacia la tarjeta activa
        const card = cards[nextIndex];
        const cardLeft = card.offsetLeft;
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollTo = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }, 5000);
    
    // Pausar rotación al interactuar
    container.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    container.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            setActiveCard(nextIndex);
            
            const card = cards[nextIndex];
            const cardLeft = card.offsetLeft;
            const containerWidth = container.offsetWidth;
            const cardWidth = card.offsetWidth;
            const scrollTo = cardLeft - (containerWidth / 2) + (cardWidth / 2);
            
            container.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }, 5000);
    });
});