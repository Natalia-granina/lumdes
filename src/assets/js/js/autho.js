  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";*/



async function loginUser() {
    const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email==='' || password ==='')
  {
    Swal.fire({
    icon:"error",
    title:"Ошибка...",
    text:"Введите логин и пароль!",
  });
  return;
  }
  else if (email==='')
    {
        Swal.fire({
    icon:"error",
    title:"Ошибка...",
    text:"Введите логин!",
  });
  return;
    }
    else if (password===''){
        Swal.fire({
    icon:"error",
    title:"Ошибка...",
    text:"Введите пароль!",
  });
  return;
    }


    try {
        const snapshot = await get(ref(database, 'Authorization'));
        
        if (!snapshot.exists()) {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "База данных пользователей не найдена!",
            });
            return;
        }
        const users = snapshot.val();
        
        const filteredUsers = Object.values(users).filter(u => u);
        const user = filteredUsers.find(u => u.Login.toLowerCase() === email.toLowerCase() && u.Password === password);

        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('isLoggedIn', 'true');

            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            
               Swal.fire({
                icon: "success",
                title: "Успех!",
                text: "Вы успешно вошли в систему!",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                if (user.Login === "admin.Lum.Des@mail.ru" && user.Password === "admin123") {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'profile.html';
                }
            });
            
        } else {
            Swal.fire({
                icon: "error",
                title: "Ошибка...",
                text: "Некорректный логин или пароль!",
            });
        }
    } catch (error) {
        console.error("Ошибка входа:", error);
        Swal.fire({
            icon: "error",
            title: "Ошибка",
            text: "Произошла ошибка при входе. Пожалуйста, попробуйте позже.",
        });
    }


}
// Добавление обработчика события для кнопки входа
document.getElementById('loginbutton').addEventListener('click', loginUser);



document.getElementById('goBackButton').addEventListener('click', function() {
      window.history.back();
    });




