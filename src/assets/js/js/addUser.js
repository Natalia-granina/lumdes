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
        
        const userData = {
            Email: Email,
            ID: newNumber,
            Name: Name,
            Password: Password,
            Surname: Surname,
            DateofReg: new Date().toISOString().split('T')[0] // Текущая дата
        };
        
        await set(newClientRef, userData);
        
        return { success: true, id: newNumber };
        
    } catch (error) {
        console.error("Ошибка при добавлении данных:", error);
        return { success: false, error: error.message };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addbtn');

    addBtn.addEventListener('click', async () => {
        const Name = document.getElementById('name').value.trim();
        const Surname = document.getElementById('surname').value.trim();
        const Email = document.getElementById('email').value.trim();
        const Password = document.getElementById('password').value;

        if (!Name || !Surname || !Email || !Password) {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Пожалуйста, заполните все поля!"
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Введите корректный email адрес!"
            });
            return;
        }

        if (Password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Пароль должен содержать минимум 6 символов!"
            });
            return;
        }

        try {
            const result = await addDataToDataBase(Email, Name, Password, Surname);
            
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Готово',
                    text: 'Пользователь успешно добавлен!'
                });
                
                document.getElementById('name').value = '';
                document.getElementById('surname').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: error.message || 'Произошла ошибка при добавлении пользователя'
            });
        }
    });
});