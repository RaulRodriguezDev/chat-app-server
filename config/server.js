import express from "express"
import Http from "http"
import dotenv from "dotenv"
import { dbConnection } from "./db.js"

dotenv.config({ path: ".env" })
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.httpServer = Http.createServer(this.app)

        dbConnection()
    }

    init() {
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

export default Server