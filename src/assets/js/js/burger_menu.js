 document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    
    
    // Открытие мобильного меню
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    }
    
    // Закрытие мобильного меню
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }
    
    // Закрытие меню при клике на ссылку
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие меню при клике вне его области
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


        // Функции для выпадающего меню при авторизации
    window.goToProfile = function() {
        console.log("Переход в профиль");
    };
    
    window.goToSettings = function() {
        console.log("Переход в настройки");
    };
    
    window.logout = function() {
        console.log("Выход из системы");
    };
});



// Функции для выпадающего меню
function goToProfile() {
    alert('Переход в профиль пользователя');
    window.location.href = 'profile.html';
}

function goToSettings() {
    alert('Переход в настройки');
    window.location.href = 'settings.html';
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        authManager.logout();
    }
}



