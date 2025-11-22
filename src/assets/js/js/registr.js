// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

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
const db = getDatabase(firebaseApp);

const clientRef = ref(db, 'Authorization');

async function addDataToDataBase(Email, Name, Password, Surname) {
    try {
        const snapshot = await get(clientRef);
        let maxNumber = 0;
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            Object.keys(data).forEach((key) => {
                const num = parseInt(key);
                if (!isNaN(num) && num > maxNumber) {
                    maxNumber = num;
                }
            });
        }
        
        const newNumber = maxNumber + 1;
        const newClientRef = ref(db, `Authorization/${newNumber}`);
        
        await set(newClientRef, { 
            Email, 
            ID: newNumber, 
            Name, 
            Password, 
            Surname ,
            DateofReg: new Date().toISOString().split('T')[0] // Текущая дата
        });
        
        return { success: true, id: newNumber };
        
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
        return { success: false, error: error.message };
    }
}

function validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: "Пароли не совпадают!"
        };
    }
    
    if (password.length < 6) {
        return {
            isValid: false,
            message: "Пароль должен содержать минимум 6 символов!"
        };
    }
    
    return { isValid: true };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return /^[A-Za-zА-Яа-яЁё\s-]+$/.test(name);
}

async function registerUser(event) {
    event.preventDefault(); // Предотвращает отправку формы
    
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();  
    const confirmPassword = document.getElementById('confirmPassword').value;  
    if (!email || !password || !name || !surname || !confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Пожалуйста, заполните все поля!"
        });
        return;
    }

    if (!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Введите корректный email адрес!"
        });
        return;
    }

    if (!validateName(name) || !validateName(surname)) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: "Имя и фамилия должны содержать только буквы!"
        });
        return;
    }

    const passwordValidation = validatePasswords(password, confirmPassword);
    if (!passwordValidation.isValid) {
        Swal.fire({
            icon: "error",
            title: "Ошибка...",
            text: passwordValidation.message
        });
        return;
    }

    try {
        const snapshot = await get(clientRef);
        if (snapshot.exists()) {
            const users = snapshot.val();
            const userExists = Object.values(users).some(user => 
                user && user.Email && user.Email.toLowerCase() === email.toLowerCase()
            );
            
            if (userExists) {
                Swal.fire({
                    icon: "error",
                    title: "Ошибка...",
                    text: "Пользователь с таким email уже существует!"
                });
                return;
            }
        }

        const result = await addDataToDataBase(email, name, password, surname);
        
        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Успех!",
                text: "Регистрация прошла успешно!",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                
                window.location.href = 'index.html';
            });
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Произошла ошибка при регистрации. Пожалуйста, попробуйте позже."
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('login-btn');
    const loginForm = document.getElementById('loginForm');
    
    if (registerButton && loginForm) {
        loginForm.addEventListener('submit', registerUser);
        
        registerButton.addEventListener('click', function(event) {
            event.preventDefault();
            registerUser(event);
        });
    }
});

document.getElementById('goBackButton').addEventListener('click', function() {
      window.history.back();
    });
