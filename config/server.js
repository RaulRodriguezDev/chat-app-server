import express from "express"
import Http from "http"
import dotenv from "dotenv"
import { dbConnection } from "./db.js"
import authRouter from "../routes/auth.js"

dotenv.config({ path: ".env" })
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.httpServer = Http.createServer(this.app)
        this.authRouter = authRouter

        dbConnection()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use('/api/auth/', this.authRouter)
        
    }
    init() {
        this.middlewares()
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

export default Server