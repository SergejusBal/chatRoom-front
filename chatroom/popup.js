var link = document.createElement("link");
link.rel = "stylesheet";
link.href = './chatroom/popup.css'; 
document.head.appendChild(link);


export function createPopUp(containerID, textContent){

    const main_containter = document.getElementById(containerID);

    if(document.getElementById("popWindow") === null){
        const popWindow = document.createElement('div');
        popWindow.className = "mainDiv";
        popWindow.id = "popWindow";

            const popUp = document.createElement('div');
            popUp.className = "popup";

                const info = document.createElement('label');
                info.textContent = textContent;
                info.id = "popupID"

                popUp.append(info);
            
            popWindow.appendChild(popUp);

        main_containter.appendChild(popWindow);
    }
    else{
        document.getElementById("popWindow").style.display = "flex";  
        document.getElementById("popupID").textContent = textContent;
    }


    setTimeout(function() {  
        document.getElementById("popWindow").style.display = "none";  
    }, 2000);    

}





