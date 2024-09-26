var link = document.createElement("link");
link.rel = "stylesheet";
link.href = './chatroom/comment.css'; 
document.head.appendChild(link);

export async function writeAComment(containerID, comment, shifted){

    const chatDiv = document.getElementById(containerID);

    if(document.getElementById("commentCointainer") === null){
        const commentCointainer = document.createElement("div");
        commentCointainer.id = "commentCointainer";
        commentCointainer.className = "commentCointainer";
        chatDiv.appendChild(commentCointainer);
    }

    addCommenbt(comment,shifted);

}

async function addCommenbt(comment, shifted) {

    const commentCointainer = document.getElementById("commentCointainer");    
        const commentDiv = document.createElement("div");  
        commentDiv.className = "commentDiv"; 
        
        if(shifted) commentDiv.style.marginLeft = "18%";      

            const infoDiv = document.createElement("div");
            infoDiv.className = "infoDiv"; 

                const nameLabel = document.createElement("label"); 
                nameLabel.textContent = comment.name;
                const timeLabel = document.createElement("label"); 
                timeLabel.style.textAlign = "right";
                timeLabel.textContent = comment.localDateTime.replace("T", " ");               
            
            infoDiv.appendChild(nameLabel);
            infoDiv.appendChild(timeLabel);

        commentDiv.appendChild(infoDiv);

           const commentLabel = document.createElement("label"); 
           commentLabel.textContent = comment.message;

        commentDiv.appendChild(commentLabel);

    commentCointainer.appendChild(commentDiv);
    scrollToBottom();
    
} 

function scrollToBottom() {
    var container = document.getElementById('commentCointainer'); 
    container.scrollTop = container.scrollHeight;  
}