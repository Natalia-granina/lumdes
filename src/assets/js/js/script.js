document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    let slideInterval = setInterval(nextSlide, 5000);
    
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 5000);
    });
});



    



/*class AuthManager {
    constructor() {
        this.isLoginMode = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthStatus();
    }

    bindEvents() {
        // Элементы DOM
        this.loginBtn = document.getElementById('loginBtn');
        this.userProfile = document.getElementById('userProfile');
        this.profileImage = document.getElementById('profileImage');
        this.authModal = document.getElementById('authModal');
        this.authForm = document.getElementById('authForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.submitAuth = document.getElementById('submitAuth');
        this.switchAuth = document.getElementById('switchAuth');
        this.switchLink = document.getElementById('switchLink');
        this.userGreeting = document.getElementById('userGreeting');

        Обработчики событий
        this.loginBtn.addEventListener('click', () => this.openAuthModal());
        document.querySelector('.close').addEventListener('click', () => this.closeAuthModal());
        this.authForm.addEventListener('submit', (e) => this.handleAuth(e));
        this.switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchAuthMode();
        });
    }

    checkAuthStatus() {
        // Проверяем, есть ли сохраненные данные пользователя
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }


    resetForm() {
        this.authForm.reset();
    }

    async handleAuth(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            if (this.isLoginMode) {
                await this.login(email, password);
            } else {
                await this.register(email, password);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async login(email, password) {
        // Здесь должна быть реальная логика авторизации
        // Для демонстрации используем localStorage
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Неверный email или пароль');
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateUI();
        this.closeAuthModal();
    }

    async register(email, password) {
        // Здесь должна быть реальная логика регистрации
        // Для демонстрации используем localStorage
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const newUser = {
            id: Date.now(),
            email: email,
            password: password, // В реальном приложении пароль должен хэшироваться
            avatar: this.generateAvatar(email)
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.updateUI();
        this.closeAuthModal();
    }

    generateAvatar(email) {
        // Генерируем простой аватар на основе email
        const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0', '#ff9ff3'];
        const color = colors[email.length % colors.length];
        return `https://via.placeholder.com/40/${color.replace('#', '')}/ffffff?text=${email[0].toUpperCase()}`;
    }

    updateUI() {
        if (this.currentUser) {
            this.loginBtn.classList.add('hidden');
            this.userProfile.classList.remove('hidden');
            this.profileImage.src = this.currentUser.avatar;
            this.profileImage.alt = this.currentUser.email;
            this.userGreeting.textContent = `Добро пожаловать, ${this.currentUser.email}!`;
        } else {
            this.loginBtn.classList.remove('hidden');
            this.userProfile.classList.add('hidden');
            this.userGreeting.textContent = '';
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
    }
}


// Инициализация при загрузке страницы
let authManager;

document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});*/