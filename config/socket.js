import socketio from 'socket.io'
import { server } from '../config/server.js'

const io = socketio( server );

export { io }