var url = "http://localhost:8080";

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = './Login_register/login.css'; 
document.head.appendChild(link);

import { setCookie, getCookie, deleteCookie } from './cookies.js';
import { createRegisterContainer} from './register.js';
import { createChatRoom } from '../chatroom/chatroom.js';


export async function createLoginContainer(containerID){

    const main_containter = document.getElementById(containerID);
    main_containter.innerHTML = "";
    
 
    const loginDiv = document.createElement('div');
    loginDiv.className = "login-container";
    loginDiv.id = "login-container";

        const heading = document.createElement('h1');
        heading.textContent = "Login";
        loginDiv.appendChild(heading);

        const usernameForm = document.createElement('div');
        usernameForm.className = "login-form";

            const usernameLabel = document.createElement('label');
            usernameLabel.setAttribute('for', 'username');
            usernameLabel.textContent = "Username:";

            const usernameInput = document.createElement('input');
            usernameInput.type = "text";
            usernameInput.id = "username";
            usernameInput.name = "username";            
            

        usernameForm.appendChild(usernameLabel);
        usernameForm.appendChild(usernameInput);
        
    loginDiv.appendChild(usernameForm);

            const passwordForm = document.createElement('div');
            passwordForm.className = "login-form";

            const passwordLabel = document.createElement('label');
            passwordLabel.setAttribute('for', 'password');
            passwordLabel.textContent = "Password:";

            const passwordInput = document.createElement('input');
            passwordInput.type = "password";
            passwordInput.id = "password";
            passwordInput.name = "password";
            

        passwordForm.appendChild(passwordLabel);
        passwordForm.appendChild(passwordInput);

    loginDiv.appendChild(passwordForm);

        const loginButtonDiv = document.createElement('div');
        loginButtonDiv.className = "login-form";

        const loginButton = document.createElement('button');
        loginButton.id = "login";
        loginButton.textContent = "Login";
        loginButton.onclick = async function(){
            let user = getUserData();            
            if(await login(user)) {
                createChatRoom("main-container");                
            }
        }

        loginButtonDiv.appendChild(loginButton);
    
    loginDiv.appendChild(loginButtonDiv);   

        
        const registerButtonDiv = document.createElement('div');
        registerButtonDiv.className = "login-form";

        const registerButton = document.createElement('button');
        registerButton.id = "register";
        registerButton.textContent = "Register";
        registerButton.onclick = async function(){
            createRegisterContainer(containerID);
        }

        registerButtonDiv.appendChild(registerButton);

    loginDiv.appendChild(registerButtonDiv);  
       
        const errorMessage = document.createElement('p');
        errorMessage.id = "errorMessage";

    loginDiv.appendChild(errorMessage);

    main_containter.appendChild(loginDiv);
    
    let autoLoginFlag = await autologin();   
    if(autoLoginFlag) createChatRoom("main-container");

   
}


async function login(user) {     

    clearUserData();

    try{   
        let response = await fetch(url + '/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                                        
            },
            body: JSON.stringify({
            "name": user.name,           
            "password":user.password                  
            }),        
        })


        if (response.status == 500){
            document.getElementById("errorMessage").innerHTML  = "Database connection failed";
            return;
        }        
        if (response.status == 401){
            document.getElementById("errorMessage").innerHTML  = "Invalid username or password";
            return;
        } 
        if (response.status == 400){
            document.getElementById("errorMessage").innerHTML  = "Invalid data";
            return;
        }
        if (response.status == 200) {            
            setCookie("JWT", await response.text(),7);
            setCookie("Name", user.name);           
            return true;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function autologin(){
    let jwttoken =  getCookie("JWT");    
    if(!jwttoken) return false;

    try{
        let response = await fetch(url +"/user/autoLogin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': jwttoken
            },                                 
        });

        if (response.status == 401){
            return false;
        }
        if (response.status == 200){
            return true;
        }          
        
    }    
    catch(error){
        return false;
    }          
    
}


function getUserData(){
    let user = {};
    user.name = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    return user;
}

function clearUserData(){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

