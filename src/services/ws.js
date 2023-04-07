import { WS_URL } from "./config"


export default function ws_connect(token){
    console.log('Connecting websocket...')
    try{
        let socket = io(WS_URL,
            {
                auth: {
                    token:token
                }
            });
        console.log('websocket connected...')


        socket.on('connect', function() {
            socket.emit('my event', {data: 'I\'m connected!'});
        });
    

        return socket
    }
    catch(err){
        console.log('Failed o connect:' , err)
    }



} 

