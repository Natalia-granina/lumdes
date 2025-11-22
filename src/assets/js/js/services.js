// Функционал для табов услуг
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Функция для переключения табов
    function switchTab(tabId) {
        // Скрываем все табы
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Убираем активный класс со всех кнопок
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Показываем выбранный таб
        document.getElementById(tabId).classList.add('active');
        
        // Активируем соответствующую кнопку
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    }
    
    // Обработчики событий для кнопок табов
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Обработчики для кнопок заказа
    const orderBtns = document.querySelectorAll('.order-btn');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {

            window.location.href = 'contacts.html';
        });
    });
});