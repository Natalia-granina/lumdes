// Функционал для фильтрации портфолио
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Функция для фильтрации проектов
    function filterPortfolio(category) {
        portfolioItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category').includes(category)) {
                item.style.display = 'block';
                // Добавляем анимацию появления
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.display = 'none';
            }
        });
        
        // Перестраиваем masonry grid после фильтрации
        setTimeout(() => {
            if (typeof Masonry !== 'undefined') {
                masonry.layout();
            }
        }, 300);
    }
    
    // Обработчики событий для кнопок фильтров
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс к текущей кнопке
            this.classList.add('active');
            // Фильтруем проекты
            const filterValue = this.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });
    
    // Инициализация Masonry (если используется библиотека)
    function initMasonry() {
        if (typeof Masonry !== 'undefined') {
            const grid = document.querySelector('.masonry-grid');
            masonry = new Masonry(grid, {
                itemSelector: '.portfolio-item',
                columnWidth: '.portfolio-item',
                percentPosition: true,
                transitionDuration: '0.3s'
            });
        } else {
            // Fallback для браузеров без поддержки Masonry
            adjustMasonryFallback();
        }
    }
    
    // Fallback функция для браузеров без Masonry
    function adjustMasonryFallback() {
        const items = document.querySelectorAll('.portfolio-item');
        let maxHeight = 0;
        
        items.forEach(item => {
            const height = item.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
        // Устанавливаем минимальную высоту для элементов
        items.forEach(item => {
            item.style.minHeight = maxHeight + 'px';
        });
    }
    
    // Инициализация при загрузке страницы
    initMasonry();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        if (typeof Masonry !== 'undefined' && masonry) {
            masonry.layout();
        } else {
            adjustMasonryFallback();
        }
    });
    
    // Анимация появления элементов при загрузке
    function animatePortfolioItems() {
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Запускаем анимацию после загрузки страницы
    setTimeout(animatePortfolioItems, 500);
});