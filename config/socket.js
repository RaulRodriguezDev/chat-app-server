import { userConnected, userDisconnected } from "../controllers/sockets-controller.js";
import { validateToken } from "../helpers/jwt.js";

class Socket {
    
        constructor( io ) {
            this.io = io;
    
            this.socketEvents();
        }
    
        socketEvents() {
            this.io.on('connection', async ( socket ) => {
                
                const [ isValid, uid ] = validateToken(socket.handshake.query['x-token'])

                if(!isValid){
                    console.log('Unknow socket connected')
                    return socket.disconnect()
                }

                await userConnected(uid)
                //TODO: validate JWT

                //TODO: Identifiy user by uid

                //TODO: Emit all users online

                //TODO: Socket join, uid

                //TODO: Listen when the client send a message

                //TODO: Disconnect

                //TODO: Emit all users offline
                socket.on('disconnect', async () => {
                    await userDisconnected(uid)
                })
            })

        }        
}


export default Socket