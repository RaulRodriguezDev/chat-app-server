import express from 'express'
import { validateToken } from '../middleware/validate-token.js'
import { getMessages } from '../controllers/messages-controller.js'

const messagesRouter = express.Router()

messagesRouter.get('/:from', validateToken, getMessages)