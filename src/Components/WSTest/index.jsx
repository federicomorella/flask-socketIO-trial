import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext'
import Contacts from '../Contacts'

export function WSTest({socket}){

    const {user,setUser}=useContext(UserContext)

    const sendMessage=()=>{
        console.log('sent MyMessage from ' + user.username)
        socket.emit("MyMessage",{pp:'hola',user:user.username})
    }
    
    return (
        <div>
            <h2>This is my SocketIO test app</h2>
            <button onClick={sendMessage}>Send message </button>
            <Contacts/>
        </div>
    )
}
