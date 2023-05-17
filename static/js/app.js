const roomName=JSON.parse(document.getElementById("room-name").textContent)
const conversation=document.getElementById("conversation")
const user=JSON.parse(document.getElementById("user").textContent)
const sendButton =document.getElementById("send")
const inputField =document.getElementById("comment")

const chatSocket=new WebSocket("ws://"+window.location.host+"/ws/chat/"+roomName+"/")

document.getElementById("hiddeninput").addEventListener("change",handleFileSelect,false)

var isRecord=false

function handleFileSelect(){
    var file=document.getElementById("hiddeninput").files[0];
    getBase64(file,file.type)
}

function getBase64(file,fileType){
    var type=fileType.split("/")[0]
    var reader=new FileReader()
    reader.readAsDataURL(file)

    reader.onload=function (){
        chatSocket.send(JSON.stringify({
            "what_is_it":type,
            "message":reader.result
        }))
    }
}


conversation.scrollTop=conversation.scrollHeight

const startStop=document.getElementById("record")

startStop.onclick=()=>{

    if(isRecord){
        stopRecord()
        startStop.style=""
        isRecord=false
    }else {
        startRecord()
        startStop.style="color:red"
        isRecord=true
    }
}

function startRecord(){
    navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {
            mediaRecoder=new MediaRecorder(stream)
            mediaRecoder.start()
            dataArray=[]

            mediaRecoder.ondataavailable=function (e){
                dataArray.push(e.data)
            }

            mediaRecoder.onstop=function (ev) {
                audioData=new Blob(dataArray,{type:'audio/mp3'})
                dataArray=[]
                getBase64(audioData,audioData.type)

                stream.getTracks().forEach(function (track) {
                    if(track.readyState=='live' && track.kind==='audio'){
                        track.stop()
                    }
                })

            }

        })
}

function stopRecord(){
    mediaRecoder.stop()
}




// navigator.mediaDevices.getUserMedia({audio:true})
//     .then(function (mediaStreamOjbect){
//
//         const startStop=document.getElementById("record")
//
//         const mediaRecorder=new MediaRecorder(mediaStreamOjbect)
//
//         startStop.addEventListener('click',function (ev){
//             if(isRecord){
//                 startStop.style=""
//                 isRecord=false
//                 mediaRecorder.stop()
//             }else {
//                 startStop.style="color:red"
//                 isRecord=true
//                 mediaRecorder.start()
//             }
//         })
//
//         mediaRecorder.ondataavailable=function (ev){
//             dataArray.push(ev.data)
//         }
//
//         var dataArray=[]
//
//         mediaRecorder.onstop=function (ev){
//             let audioData=new Blob(dataArray,{'type':'audio/mp3'})
//             dataArray=[]
//             getBase64(audioData,audioData.type)
//         }
//
//     })





chatSocket.onmessage=function (ev) {
    const data=JSON.parse(ev.data)
    const message_type=data.what_is_it
    if(message_type==="text"){
        var message=data.message
    } else if(message_type==="image"){
        var message = `<img src="${data.message}" style="max-width: 100%;">`;
    } else if(message_type==="audio"){
        var message=`<audio style="width: 200px" controls>
                      <source src="${data.message}">
                    </audio>`
    } else if(message_type==="video"){
        var message=`<video width="250" height="250" controls>
                      <source src="${data.message}">
                    </video>`
    }

    if(user === data.user){
        var message=`<div class="row message-body">
                    <div class="col-sm-12 message-main-sender">
                        <div class="sender">
                            <div class="message-text">
                                ${message}
                            </div>
                            <span class="message-time pull-right">
                            ${data.time_zone}
                          </span>
                        </div>
                    </div>
                 </div>`
    } else {
        var message= `<div class="row message-body">
                    <div class="col-sm-12 message-main-receiver">
                        <div class="receiver">
                            <div class="message-text">
                                ${message}
                            </div>
                            <span class="message-time pull-right">
                            ${data.time_zone}
                          </span>
                        </div>
                    </div>
                 </div>`
    }
    conversation.innerHTML += message
    conversation.scrollTop=conversation.scrollHeight
};

chatSocket.onclose=function (ev){
    console.error("Socket is closed")
};

inputField.focus()
inputField.onkeyup=function (ev) {
    if(ev.keyCode===13){
        sendButton.click()
    }
}

sendButton.onclick= function (ev) {
    const message=inputField.value
    chatSocket.send(JSON.stringify({
        "what_is_it":"text",
        "message": message,

    }))
    inputField.value=''
}