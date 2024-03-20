
class Socket {
    
        constructor( io ) {
            this.io = io;
    
            this.socketEvents();
        }
    
        socketEvents() {
            this.io.on('connection', ( socket ) => {
                //TODO: validate JWT

                //TODO: Identifiy user by uid

                //TODO: Emit all users online

                //TODO: Socket join, uid

                //TODO: Listen when the client send a message

                //TODO: Disconnect

                //TODO: Emit all users offline
            })

        }        
}


export default Socket