


var stompClient = null;
var url = "http://localhost:8080";

export async function connectUser() {
    return new Promise((resolve, reject) => {

        var socket = new SockJS(url + '/websocket');
        stompClient = Stomp.over(socket);

       
        stompClient.connect({
            Authorization: 'Bearer your_jwt_token_here'
        }, function (frame) {
            console.log('Connected: ' + frame);

            
            stompClient.subscribe('/topic/name', function () {
                
            });

            
            resolve(frame);
        }, function (error) {
            console.log('Error: ' + error);                                
            reject(error);
        });
    });
}