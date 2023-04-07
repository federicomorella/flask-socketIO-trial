import React from 'react'

export function WSTest({socket}){
    const sendMessage=()=>{
        console.log('send MyMessage')
        socket.emit("MyMessage",{pp:'hola'})
    }
    console.log(socket)
    return (
        <div>
            <h2>This is my SocketIO test app</h2>
            <button onClick={sendMessage}>Send message </button>
        </div>
    )
}
