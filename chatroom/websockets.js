// let message ={};
// message.name = "jonas";
// await connectUser();
// stompClient.send("/app/chat", { 'Authorization': getCookie("JWT")}, JSON.stringify(message));


import { setCookie, getCookie, deleteCookie } from '../Login_register/cookies.js';
import { modifyUserCoitainer } from './chatroom.js';
import { writeAComment } from './comment.js';
import { createPopUp } from './popup.js';

var stompClient = null;
var url = "http://localhost:8080";


export async function connectUser() {
return new Promise((resolve, reject) => {
    let JWT = getCookie("JWT");

    var socket = new SockJS(url + '/websocket?' + JWT);
    stompClient = Stomp.over(socket);

   
    stompClient.connect({        
    }, function (frame) {  
        
        stompClient.subscribe('/topic/name', function (message) {

        modifyUserMeniu(message.body);

        }, {
            'Authorization': JWT
        });

        stompClient.subscribe('/topic/chat', function (message) {       
        modifyChatWindow(message.body);
        }, {
            'Authorization': JWT
        });

        stompClient.subscribe('/user/topic/oldMessages', function (message) {       
            loadOldMessages(message.body);
            }, {
                'Authorization': JWT
            });

        
        resolve(frame);
    }, function (error) {
        console.log('Error: ' + error);                                
        reject(error);
    });
});
}

export function sendNameNotification(){
    stompClient.send("/app/name", { 'Authorization': getCookie("JWT")}, JSON.stringify({'name': getCookie("Name")}));
}

export function sendLoginNotification(){
    stompClient.send("/app/chat", { 'Authorization': getCookie("JWT")}, JSON.stringify({'name': getCookie("Name"), "type":"SYSTEM"}));
}

export function sendMessage(message){
    let messageBody = {};
    messageBody.name = getCookie("Name");
    messageBody.type = "REGULAR";
    messageBody.localDateTime = getDate();    
    messageBody.message = message;
    stompClient.send("/app/chat", { 'Authorization': getCookie("JWT")}, JSON.stringify(messageBody));
}

export function getOldMessages(){
    stompClient.send("/app/oldMessages", { 'Authorization': getCookie("JWT")}, {});
}


function modifyUserMeniu(usersJSonString){
    let names = JSON.parse(usersJSonString);      
    modifyUserCoitainer(names);
}

function modifyChatWindow(messageJSonString){

    let message = JSON.parse(messageJSonString); 
    let shifted = message.name == getCookie("Name");

    if(message.type == "SYSTEM") createPopUp("message-container",message.message);
    else if (message.type == "REGULAR") writeAComment("message-container", message, shifted);

}

function loadOldMessages(oldMessageJSonStrings){
    let messages = JSON.parse(oldMessageJSonStrings); 
    messages.forEach(message => {
        let shifted = message.name == getCookie("Name");
        writeAComment("message-container", message, shifted)
    });
}


function getDate(){
    const now = new Date();
    return now.getFullYear() + '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
    ('0' + now.getDate()).slice(-2) + ' ' +
    ('0' + now.getHours()).slice(-2) + ':' +
    ('0' + now.getMinutes()).slice(-2) + ':' +
    ('0' + now.getSeconds()).slice(-2);

}
