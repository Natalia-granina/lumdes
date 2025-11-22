import { checkAuthStatus, getUserInitials, logout } from './isautho.js';

export async function updateHeader() {
    const headerElement = document.getElementById('main-header');
    if (!headerElement) return;
    
    const { isLoggedIn, user } = await checkAuthStatus();
    
    if (isLoggedIn) {
        headerElement.innerHTML = `
            <div class="user-info">
                <span class="user-initials">${getUserInitials(user)}</span>
                <span class="user-name">${user.user_metadata?.name} ${user.user_metadata?.surname}</span>
                <button id="logoutBtn" class="logout-btn">Выйти</button>
            </div>
        `;
        
        // выход
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            await logout();
            updateHeader();
            window.location.reload(); // на главную
        });
    } else {
        headerElement.innerHTML = `
            <a href="autho.html" class="login-btn">Войти</a>
        `;
    }
}
