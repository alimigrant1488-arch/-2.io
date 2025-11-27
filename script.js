// Конфигурация
const CONFIG = {
    images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMbvlqmdo47rspOJy-V28rn7dclXNcM2Cg&s',
        'https://grizly.club/uploads/posts/2023-02/1675341865_grizly-club-p-pokemon-klipart-21.png',
        'https://i.pinimg.com/originals/97/cd/58/97cd58a2eb316cff7fbe32dc6dbf2eaa.png',
        'https://www.pngplay.com/wp-content/uploads/11/Jirachi-Pokemon-PNG-Clip-Art-HD-Quality.png',
        'https://i.pinimg.com/originals/a9/a6/c8/a9a6c8ccb7c798ff67413118220c7bc3.png',
        'https://www.pngplay.com/wp-content/uploads/12/Weezing-Pokemon-Transparent-File.png',
        'https://www.pngplay.com/wp-content/uploads/12/Togepi-Pokemon-PNG-HD-Photos.png',
        'https://i.pinimg.com/originals/ed/ad/50/edad5063022cf0bc0f69a86cf9716164.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgBjVtLbbL3VNcTDYYOEDQLPMjgE5neqiHLg&s',
        'https://i.pinimg.com/originals/80/6d/ea/806dea7c71b5c02affd2b051784a3647.png',
        'https://i.pinimg.com/originals/8e/2f/55/8e2f55a5086f968e884f4dea6884eea4.png',
        'https://i.pinimg.com/originals/0b/b3/73/0bb3733e365dec2685c56edb6fa53e36.png',
        'https://i.pinimg.com/originals/95/64/7e/95647e00efbf5f91e700257c9217e001.png',
        'https://swoproductions.com/wp-content/uploads/2022/03/image-14.png?w=982',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/927.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQWaLiiIuJJurqUVObPX9vFRGuUMOGNJs4g&s',
        'https://i.pinimg.com/originals/b4/09/0c/b4090c3df1a0f1dda0ed7c3134752b5d.png',
        'https://i.pinimg.com/originals/b3/c1/4f/b3c14f04b9d21c6ff6f338794e9b2657.png',
        'https://img.pokemondb.net/artwork/vector/large/togetic.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVzxoYndgArt3R4F2FqjdZ9TeA-LSxkGY2A&s',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/686.png',
        'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-scarlet-violet/9/9f/Umbreon.png',
        'https://i.pinimg.com/originals/1d/e8/f8/1de8f839ad2fcb539a6550bb6a9fdc25.png',
        'https://i.pinimg.com/originals/10/11/e1/1011e18c43f46a6d23dc42c7ee2807fd.png',
        'https://i.pinimg.com/originals/97/4c/02/974c02bd9c69ba10fb808cc65bebd1a6.png',
        'https://i.pinimg.com/originals/1a/1d/f9/1a1df95cc629b9e679c30a29cec074c7.png',
        'https://i.pinimg.com/originals/94/ad/ac/94adac8399764cf5631e12a4e761139a.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOg4ISNEkZbfzNfS1aMc3ahuVkxkTMtleEA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRjCWoxh-W0s9Xz3u4NckOXbKKsBVnDqxIA&s'
    ],
    sounds: [
        'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
        'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3',
        'https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3'
    ],
    maxFloatingImages: 8,
    movementSpeed: 2
};

// Глобальные переменные
let currentSlide = 0;
let totalSlides = 0;
let isScrolling = false;
let scrollTimeout;
let rightPanelTimeout;
let leftPanelTimeout;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initHorizontalScroll();
    createFloatingImages();
    setupEventListeners();
});

// Инициализация горизонтального скролла
function initHorizontalScroll() {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    // Установка фоновых изображений
    slides.forEach((slide, index) => {
        const bgUrl = slide.getAttribute('data-bg');
        slide.style.backgroundImage = `url(${bgUrl})`;
    });
}

// Создание летающих изображений
function createFloatingImages() {
    const container = document.getElementById('floating-images-container');
    
    for (let i = 0; i < CONFIG.maxFloatingImages; i++) {
        setTimeout(() => {
            createFloatingImage(container);
        }, i * 1000);
    }
}

function createFloatingImage(container) {
    const img = document.createElement('img');
    const randomImage = CONFIG.images[Math.floor(Math.random() * CONFIG.images.length)];
    
    img.src = randomImage;
    img.className = 'floating-image';
    img.style.width = `${30 + Math.random() * 50}px`;
    
    // Начальная позиция
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    img.style.left = `${startX}px`;
    img.style.top = `${startY}px`;
    
    // Случайное направление движения
    let directionX = (Math.random() - 0.5) * CONFIG.movementSpeed;
    let directionY = (Math.random() - 0.5) * CONFIG.movementSpeed;
    
    container.appendChild(img);
    
    // Обработчик клика
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        handleImageClick(this);
    });
    
    // Анимация движения
    function moveImage() {
        if (!img.parentNode) return;
        
        let x = parseFloat(img.style.left);
        let y = parseFloat(img.style.top);
        
        // Отскок от границ
        if (x <= 0 || x >= window.innerWidth - img.offsetWidth) {
            directionX *= -1;
        }
        if (y <= 0 || y >= window.innerHeight - img.offsetHeight) {
            directionY *= -1;
        }
        
        x += directionX;
        y += directionY;
        
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        
        requestAnimationFrame(moveImage);
    }
    
    moveImage();
}

// Обработка клика по изображению
function handleImageClick(imgElement) {
    // Воспроизведение случайного звука
    const randomSound = new Audio(CONFIG.sounds[Math.floor(Math.random() * CONFIG.sounds.length)]);
    randomSound.play();
    
    // Анимация увеличения и центрирования
    const rect = imgElement.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;
    const targetX = window.innerWidth / 2 - rect.width / 2;
    const targetY = window.innerHeight / 2 - rect.height / 2;
    
    imgElement.style.transition = 'all 1s ease';
    imgElement.style.position = 'fixed';
    imgElement.style.left = `${targetX}px`;
    imgElement.style.top = `${targetY}px`;
    imgElement.style.transform = 'scale(3)';
    imgElement.style.zIndex = '1000';
    
    // Эффекты через 3 секунды
    setTimeout(() => {
        createMosaicEffect();
        createFireworks();
        setTimeout(() => {
            imgElement.remove();
            createFloatingImage(document.getElementById('floating-images-container'));
        }, 1000);
    }, 3000);
}

// Эффект мозаики
function createMosaicEffect() {
    const mosaic = document.createElement('div');
    mosaic.className = 'mosaic';
    document.getElementById('effects-container').appendChild(mosaic);
    
    setTimeout(() => {
        mosaic.remove();
    }, 1000);
}

// Эффект фейерверка
function createFireworks() {
    const container = document.getElementById('effects-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${window.innerWidth / 2}px`;
        particle.style.top = `${window.innerHeight / 2}px`;
        
        container.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        function animate() {
            x += vx;
            y += vy;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity || 1) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Горизонтальный скролл
    window.addEventListener('wheel', handleScroll, { passive: false });
    
    // Боковые панели
    setupSidePanels();
    
    // Адаптация к изменению размера окна
    window.addEventListener('resize', handleResize);
}

// Обработка скролла
function handleScroll(e) {
    if (isScrolling) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
        // Скролл вниз - двигаемся вправо
        navigateToSlide(currentSlide + 1);
    } else {
        // Скролл вверх - двигаемся влево
        navigateToSlide(currentSlide - 1);
    }
}

// Навигация по слайдам
function navigateToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides || isScrolling) return;
    
    isScrolling = true;
    currentSlide = slideIndex;
    
    const scrollContainer = document.querySelector('.horizontal-scroll');
    scrollContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// Настройка боковых панелей
function setupSidePanels() {
    const rightPanel = document.querySelector('.right-panel');
    const leftPanel = document.querySelector('.left-panel');
    const pinRight = document.getElementById('pin-right');
    const pinLeft = document.getElementById('pin-left');
    
    // Правая панель
    document.addEventListener('mousemove', (e) => {
        if (e.clientX >= window.innerWidth - 50 && !pinRight.checked) {
            clearTimeout(rightPanelTimeout);
            rightPanel.classList.add('visible');
            
            rightPanelTimeout = setTimeout(() => {
                if (!pinRight.checked) {
                    rightPanel.classList.remove('visible');
                }
            }, 5000);
        }
    });
    
    // Левая панель
    document.addEventListener('mousemove', (e) => {
        if (e.clientX <= 50 && !pinLeft.checked) {
            clearTimeout(leftPanelTimeout);
            leftPanel.classList.add('visible');
            
            leftPanelTimeout = setTimeout(() => {
                if (!pinLeft.checked) {
                    leftPanel.classList.remove('visible');
                }
            }, 5000);
        }
    });
    
    // Закрепление панелей
    [pinRight, pinLeft].forEach(pin => {
        pin.addEventListener('change', function() {
            if (this.checked) {
                clearTimeout(rightPanelTimeout);
                clearTimeout(leftPanelTimeout);
            }
        });
    });
}

// Обработка изменения размера окна
function handleResize() {
    // Обновляем позиции летающих изображений
    document.querySelectorAll('.floating-image').forEach(img => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
    });
}

// Глобальные функции для отладки
window.debug = {
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides,
    navigateToSlide: navigateToSlide
};
