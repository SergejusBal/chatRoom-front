var url = "http://localhost:8080";

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = './Login_register/register.css'; 
document.head.appendChild(link);

import { createLoginContainer} from './login.js';

export function createRegisterContainer(containerID){

    const main_container = document.getElementById(containerID);
    main_container.innerHTML = "";

    const registerDiv = document.createElement('div');
    registerDiv.className = "register-container";
    registerDiv.id = "register-container";

        const heading = document.createElement('h1');
        heading.textContent = "Register";
        registerDiv.appendChild(heading);

        const usernameForm = document.createElement('div');
        usernameForm.className = "register-form";

            const usernameLabel = document.createElement('label');
            usernameLabel.setAttribute('for', 'username');
            usernameLabel.textContent = "Username:";

            const usernameInput = document.createElement('input');
            usernameInput.type = "text";
            usernameInput.id = "username";
            usernameInput.name = "username";
            usernameInput.required = true;

        usernameForm.appendChild(usernameLabel);
        usernameForm.appendChild(usernameInput);

    registerDiv.appendChild(usernameForm);

            const firstPasswordForm = document.createElement('div');
            firstPasswordForm.className = "register-form";

            const firstPasswordLabel = document.createElement('label');
            firstPasswordLabel.setAttribute('for', 'firstPassword');
            firstPasswordLabel.textContent = "Password:";

            const firstPasswordInput = document.createElement('input');
            firstPasswordInput.type = "password";
            firstPasswordInput.id = "firstPassword";
            firstPasswordInput.name = "firstPassword";
            firstPasswordInput.required = true;

        firstPasswordForm.appendChild(firstPasswordLabel);
        firstPasswordForm.appendChild(firstPasswordInput);

    registerDiv.appendChild(firstPasswordForm);

            const secondPasswordForm = document.createElement('div');
            secondPasswordForm.className = "register-form";

            const secondPasswordLabel = document.createElement('label');
            secondPasswordLabel.setAttribute('for', 'secondPassword');
            secondPasswordLabel.textContent = "Confirm Password:";

            const secondPasswordInput = document.createElement('input');
            secondPasswordInput.type = "password";
            secondPasswordInput.id = "secondPassword";
            secondPasswordInput.name = "secondPassword";
            secondPasswordInput.required = true;

        secondPasswordForm.appendChild(secondPasswordLabel);
        secondPasswordForm.appendChild(secondPasswordInput);

    registerDiv.appendChild(secondPasswordForm);

        const registerButtonDiv = document.createElement('div');
        registerButtonDiv.className = "register-form";

        const registerButton = document.createElement('button');
        registerButton.id = "register";
        registerButton.textContent = "Register";
        registerButton.onclick = async function(){            
            if(!checkData()) return;
            let user = getUserData();
            await register(user);
            clearUserData();
        }

        registerButtonDiv.appendChild(registerButton);

    registerDiv.appendChild(registerButtonDiv);  
        
        const backButtonDiv = document.createElement('div');
        backButtonDiv.className = "register-form";

        const backButton = document.createElement('button');
        backButton.id = "backButton";
        backButton.textContent = "Back";
        backButton.onclick = async function(){
            createLoginContainer(containerID);
        }

        backButtonDiv.appendChild(backButton);

    registerDiv.appendChild(backButtonDiv);   
       
        const errorMessage = document.createElement('p');
        errorMessage.id = "errorMessage";

    registerDiv.appendChild(errorMessage);

    main_container.appendChild(registerDiv);    
}

async function register(user) {     

    try{   
        let response = await fetch(url + '/user/register', {
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
        if (response.status == 409){
            document.getElementById("errorMessage").innerHTML  = "User already exists";
            return;
        } 
        if (response.status == 400){
            document.getElementById("errorMessage").innerHTML  = "Invalid data";
            return;
        }
        if (response.status == 200) { 
            document.getElementById("errorMessage").innerHTML  = "User registration was successful";
            return;
        } 

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

function getUserData(){
    let user = {};
    user.name = document.getElementById("username").value;
    user.password = document.getElementById("firstPassword").value;
    return user;
}

function clearUserData(){
    document.getElementById("username").value = "";
    document.getElementById("firstPassword").value = "";
    document.getElementById("secondPassword").value = "";
}

function checkData(){
    let user = getUserData();
    if(!confirmPassword()){
        document.getElementById("errorMessage").innerHTML  = "Password does not match!";
        return false;
    }
    if(!validateEmail(user.name)){
        document.getElementById("errorMessage").innerHTML  = "Invalid email format!";
        return false;
    }
    if(!validatePassword(user.password)){
        document.getElementById("errorMessage").innerHTML  = "Password is to short!";
        return false;
    }
    return true;
}


function confirmPassword(){
    return document.getElementById("firstPassword").value == document.getElementById("secondPassword").value;
}


function validateEmail(email) {    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return regex.test(email);
}

function validatePassword(password){
    return password.length > 8;
}
