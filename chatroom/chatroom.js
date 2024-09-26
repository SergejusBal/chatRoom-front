var url = "http://localhost:8080";

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = './chatroom/chatroom.css'; 
document.head.appendChild(link);

import { setCookie, getCookie, deleteCookie } from '../Login_register/cookies.js';
import { createLoginContainer } from '../Login_register/login.js';
import { connectUser, sendNameNotification, sendLoginNotification, sendMessage } from './websockets.js';


export async function createChatRoom(containerID){

    const main_containter = document.getElementById(containerID);
    main_containter.innerHTML = "";
    
 
    const chatroom = document.createElement('div');
    chatroom.className = "chatroom-container";
    chatroom.id = "chatroom-container";

        const userPanelDiv = document.createElement('div');
        userPanelDiv.className = "user-panel";

            const userHeaderDiv = document.createElement('div');
            userHeaderDiv.className = "userHeader";

                const userHeader = document.createElement('h1');
                userHeader.textContent = "Users";

                userHeaderDiv.append(userHeader);

            const userContainderDiv = document.createElement('div');
            userContainderDiv.className = "user-container";
            userContainderDiv.id = "user-container";

            const logoutDiv = document.createElement('div');
            logoutDiv.className = "loguot";

                const logoutButton = document.createElement('button');
                logoutButton.id = "logout";
                logoutButton.textContent = "Log Off";
                logoutButton.onclick = async function(){
                    deleteCookie("JWT");
                    createLoginContainer(containerID);
                }

            logoutDiv.appendChild(logoutButton);

        userPanelDiv.appendChild(userHeaderDiv);
        userPanelDiv.appendChild(userContainderDiv);
        userPanelDiv.appendChild(logoutDiv);
        
        
    chatroom.appendChild(userPanelDiv);

        const messagePanelDiv = document.createElement('div');
        messagePanelDiv.className = "message-panel";

            const messageContainerDiv = document.createElement('div');
            messageContainerDiv.className = "message-container";
            messageContainerDiv.id = "message-container";

            const messageCreationPanel = document.createElement('div');
            messageCreationPanel.className = "messageCreation-panel";

                const sendMessagetextArea = document.createElement('textArea'); 
                sendMessagetextArea.id = "sendMessageInput";
                sendMessagetextArea.placeholder = "Message...."

                const sendMessageButton = document.createElement('button');
                sendMessageButton.id = "sendMessage";
                sendMessageButton.textContent = "Send";
                sendMessageButton.onclick = async function(){
                    let message = document.getElementById("sendMessageInput").value;
                    sendMessage(message);    
                    document.getElementById("sendMessageInput").value = "";               
                }
            
            messageCreationPanel.appendChild(sendMessagetextArea);    
            messageCreationPanel.appendChild(sendMessageButton);
                

            messagePanelDiv.appendChild(messageContainerDiv);
            messagePanelDiv.appendChild(messageCreationPanel);


    chatroom.appendChild(messagePanelDiv);
    main_containter.appendChild(chatroom);   
    
    await connectUser(); 
    sendNameNotification();   
    sendLoginNotification();    
}


export async function modifyUserCoitainer(names){

    const user_containter = document.getElementById("user-container");
    user_containter.innerHTML = "";

    names.forEach(name => {
        
            const userNameDiv = document.createElement('div');
            userNameDiv.className = "userNameDiv-container";
            userNameDiv.id = "User" + name;

                const userLabel = document.createElement('label');
                userLabel.textContent = name;

            userNameDiv.appendChild(userLabel);

            user_containter.appendChild(userNameDiv);

        });


}