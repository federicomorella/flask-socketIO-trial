import { WS_URL } from "../../config"

let socket=null
/***
 * create websocket, connect and return the created socket
 */
export default function ws_connect(token){
    //if socket already exists return
    if(socket?.connected)
        return socket

    console.log('Connecting websocket...')
    try{
        socket = io(WS_URL,
            {
                auth: {
                    token:token
                },
                transports:['websocket','polling'],
                reconnectionDelayMax: 5000
            });
        console.log('websocket connected...')


        socket.on('connect', function() {
            socket.emit('my event', {data: 'I\'m connected!'});
        });

        socket.on('room_enter', function(data) {
            console.log(data)
        });

        socket.on('room_leave', function(data) {
            console.log(data)
        });

        socket.on('server_message', function(data) {
            console.log('server message received: ',data)
            alert(`Message received from  ${data.user}`)
        });
  
    

        return socket
    }
    catch(err){
        console.log('Failed o connect:' , err)
    }



} 

