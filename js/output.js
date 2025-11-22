import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, set} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const clientRef = ref(db,'Authorization');
const clientSnapshot = await get(clientRef);

const clientData = [];

clientSnapshot.forEach((childSnapshot)=>{
    const SurNameRef = ref(db, `Authorization/${childSnapshot.key}/Surname`);
    const NameRef = ref(db, `Authorization/${childSnapshot.key}/Name`);
    const mailRef = ref(db, `Authorization/${childSnapshot.key}/Email`);
    const DateofregRef = ref(db, `Authorization/${childSnapshot.key}/DateofReg`);
    const PasswRef = ref(db, `Authorization/${childSnapshot.key}/Password`);

    clientData.push({
        SurNameRef,
        NameRef,
        DateofregRef,
        mailRef,
        PasswRef
    })
})

async function createClientBlock(data){
    try{
        const ClientList = document.getElementById('UserList');
        const ClientBlock = document.createElement('tbody');
        ClientBlock.className = "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:bordeg-gray-700 p-4 xl:w-1/3 md:w-1/2";

        ClientBlock.innerHTML = `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td class="px-6 py-4 NameOne">
                </td>
                <td class="px-6 py-4 SurnameOne">
                </td>
                <td class="px-6 py-4 MailOne">
                </td>
                <td class="px-6 py-4 PasswOne">
                </td>
                <td class="px-6 py-4 DateofRegOne">
                </td>
                <td class="px-6 py-4">
                    <a href="#" id="red" class="font-medium text-[#800020] hover:text-[#fa0240]">Редактировать</a>
                </td>
                <td class="px-6 py-4">
                    <a href="#" id="del" class="font-medium text-[#800020] hover:text-[#fa0240]">Удалить</a>
                </td>
            </tr>
        `;

        ClientList.appendChild(ClientBlock);

        const mail = ClientBlock.querySelector('.MailOne');
        const Name = ClientBlock.querySelector('.NameOne');
        const Surname = ClientBlock.querySelector('.SurnameOne');
        const Passw = ClientBlock.querySelector('.PasswOne');
        const Dateofreg = ClientBlock.querySelector('.DateofRegOne');
        if (Surname && Name && Passw && Dateofreg && mail){
            const mailSnapshot = await get(data.mailRef);
            const NameSnapshot = await get(data.NameRef);
            const SurNameSnapshot = await get(data.SurNameRef);
            const PasswSnapshot= await get(data.PasswRef);
            const DateofregSnapshot = await get(data.DateofregRef);
            
            Surname.textContent = SurNameSnapshot.val();
            Name.textContent = NameSnapshot.val();
            Passw.textContent = PasswSnapshot.val();
            Dateofreg.textContent = DateofregSnapshot.val();
            mail.textContent = mailSnapshot.val();
        }
    }
    catch{

    }
}
clientData.forEach(createClientBlock);