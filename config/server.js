import express from "express"
import Http from "http"
import dotenv from "dotenv"
import socketio from 'socket.io'
import { dbConnection } from "./db.js"
import authRouter from "../routes/auth.js"
import messagesRouter from "../routes/messages.js"
import Socket from "./socket.js"

dotenv.config({ path: ".env" })
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.httpServer = Http.createServer(this.app)
        this.authRouter = authRouter
        this.messagesRouter = messagesRouter
        this.io = socketio(this.httpServer)

        dbConnection()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use('/api/auth/', this.authRouter)
        this.app.use('/api/messages/', this.messagesRouter)
        
    }

    initSockets(){
        new Socket(this.io)
    }

    init() {
        this.middlewares()
        this.initSockets()
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

export default Server