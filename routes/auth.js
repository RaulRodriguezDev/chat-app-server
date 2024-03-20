import express from "express";
import { createUser, getToken, loginUser } from "../controllers/auth-controller.js";
import { body } from "express-validator";
import { validateFields } from "../middleware/validate-fields.js";
import { validateToken } from "../middleware/validate-token.js";

const authRouter = express.Router()

authRouter.post('/login/new-user',[
    body('email', 'The email is required').isEmail(),
    body('password','Password is required').not().isEmpty(),
    body('name','Name is required').not().isEmpty()
], validateFields , createUser)

authRouter.post('/login',[
    body('email', 'The email is required').isEmail(),
    body('password','Password is required').not().isEmpty()
], validateFields , loginUser)

authRouter.get('/token', validateToken, getToken)

export default authRouter