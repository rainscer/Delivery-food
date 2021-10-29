const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", function(event){
    modal.classList.add("is-open");
});

close.addEventListener("click", function(event){
    modal.classList.remove("is-open");
});

new WOW().init();

// --------------------------------------------------

const authButton  = document.querySelector("#button-auto");
const modalauth   = document.querySelector(".modal-auto");
const logInInput = document.querySelector("#login");
const PasswordInput = document.querySelector("#password");
const authcloseButton  = document.querySelector(".auto-close");
const logInForm  = document.querySelector(".form-auto");
const logOutButton = document.querySelector('.button-logout');
const userName  = document.querySelector('.username');

const body = document.body;

let login = localStorage.getItem('gloDelivery'); 


function toggleModalAuth(){
        modalauth.classList.toggle("is-open");
        body.classList.toggle("scroll-off");
}

function authorized(){

    function logOut(){
        login = null;

        authButton.style.display="block";
        logOutButton.style.display="none";
        userName.style.display="none";

        logOutButton.removeEventListener('click', logOut);

        localStorage.removeItem('gloDelivery');
        checkauth();
    }

    console.log('Авторизирован');

    userName.textContent = login;

    authButton.style.display="none";
    logOutButton.style.display="block";
    userName.style.display="block";

    logOutButton.addEventListener('click', logOut)
}

function notAuthorized(){
    console.log('Не авторизирован');
    modalauth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')){
            toggleModalAuth();
        }
    })

    function logIn(event){
        event.preventDefault();
        // Отсутствует логин и пароль
	        if (!logInInput.value.trim() && !PasswordInput.value.trim()) {
                logInInput.style.borderColor = '#ff0000';
                PasswordInput.style.borderColor = '#ff0000';
                logInInput.value = '';
                PasswordInput.value = '';
                alert('Не указан логин и пароль!')
            }
        // Отсутствует логин 
            else if (!logInInput.value.trim()){            
                logInInput.style.borderColor = '#ff0000';
                PasswordInput.style.borderColor = '';
                logInInput.value = '';
                alert('Не указан логин!')
            }
        // Отсутствует пароль
            else if(!PasswordInput.value.trim()){
                logInInput.style.borderColor = '';
                PasswordInput.style.borderColor = '#ff0000';
                PasswordInput.value = '';
                alert('Не указан пароль!')
            }
        // Всё на месте, можно логинить
            else{
                login= logInInput.value;
            
                localStorage.setItem('gloDelivery', login);
            
                toggleModalAuth();            
                authButton.removeEventListener('click',toggleModalAuth);
                authcloseButton.removeEventListener('click', toggleModalAuth);
                logInForm.removeEventListener('submit',logIn);
                logInForm.reset();
                checkauth();
            }
        }

    authButton.addEventListener('click',toggleModalAuth);
    authcloseButton.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit',logIn)
}

function checkauth(){
    if (login){
        authorized();
    }
    else{
        notAuthorized();
    }
}

checkauth();