// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJZ_hzPbb237z_lD6ix02SIotmT0C9fnk",
    authDomain: "lumdesproject.firebaseapp.com",
    databaseURL: "https://lumdesproject-default-rtdb.firebaseio.com",
    projectId: "lumdesproject",
    storageBucket: "lumdesproject.firebasestorage.app",
    messagingSenderId: "203844380283",
    appId: "1:203844380283:web:c0c7ac7279e10097a264de",
    measurementId: "G-RCY0B220E7"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Проверка авторизации пользователя
export function checkAuthStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userData = sessionStorage.getItem('user');
    return {
        isLoggedIn: isLoggedIn,
        user: userData ? JSON.parse(userData) : null
    };
}

// Получение инициалов пользователя
export function getUserInitials(user) {
    if (!user) return '';
    const name = user.Name || '';
    const surname = user.Surname || '';
    return (name.charAt(0) + surname.charAt(0)).toUpperCase();
}

// Выход из системы
export function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Обновление хедера
export function updateHeader() {
    const headerElement = document.getElementById('main-header');
    if (!headerElement) return;

    const { isLoggedIn, user } = checkAuthStatus();
    
    if (isLoggedIn && user) {
        // Создаем элемент с инициалами пользователя
        headerElement.innerHTML = `
            <div class="container">
                <div class="header-content">
                    <a href="index.html" class="logo">
                        <img src="images/logo.png" alt="Taurim Design">
                    </a>
                    <nav class="nav">
                        <a href="index.html" class="nav-link">Главная</a>
                        <a href="services.html" class="nav-link">Услуги</a>
                        <a href="portfolio.html" class="nav-link">Портфолио</a>
                        <a href="contacts.html" class="nav-link">Контакты</a>
                        <a href="profile.html" class="nav-link active">Профиль</a>
                    </nav>
                    <div class="user-header-info">
                        <span class="user-initials">${getUserInitials(user)}</span>
                        <span class="user-name">${user.Name} ${user.Surname}</span>
                        <button id="logoutBtn" class="logout-btn-header">Выйти</button>
                    </div>
                </div>
            </div>
        `;
        
        // Обработчик выхода
        document.getElementById('logoutBtn').addEventListener('click', logout);
    } else {
        // Стандартный хедер с кнопкой входа
        headerElement.innerHTML = `
            <div class="container">
                <div class="header-content">
                    <a href="index.html" class="logo">
                        <img src="images/logo.png" alt="Taurim Design">
                    </a>
                    <nav class="nav">
                        <a href="index.html" class="nav-link">Главная</a>
                        <a href="services.html" class="nav-link">Услуги</a>
                        <a href="portfolio.html" class="nav-link">Портфолио</a>
                        <a href="contacts.html" class="nav-link">Контакты</a>
                    </nav>
                    <a href="autho.html"><button class="login-btn">Войти</button></a>
                </div>
            </div>
        `;
    }
}