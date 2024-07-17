import { getUsers, setMessage, userConnected, userDisconnected } from "../controllers/sockets-controller.js";
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

                socket.join(uid)

                this.io.emit('list-users', await getUsers(uid))

                socket.on('personal-message', async (payload) => {
                    const message = await setMessage(payload)
                    this.io.to(payload.to).emit('personal-message', message)
                    this.io.to(payload.from).emit('personal-message', message)
                })
                //TODO: Disconnect

                socket.on('disconnect', async () => {
                    await userDisconnected(uid)
                    this.io.emit('list-users', await getUsers(uid))
                })
            })

        }        
}


export default Socket