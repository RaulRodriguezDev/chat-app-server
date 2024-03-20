import { generateToken } from '../helpers/jwt.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'

const createUser = async (req, res) => {
    const { email, password } = req.body

    try {

        const userExists = await User.findOne({ email })

        if(userExists){
            return res.status(400).json({
                ok: false,
                message: "User already exists"
            })
        }

        const user = new User(req.body)
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        user.save()

        const token = await generateToken(user.id)

        return res.json({
            ok: true,
            message: "User created",
            user,
            token
        }).status(201)

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error creating user",
            e : error
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const userStored = await User.findOne({ email })
        const isValidPassword = userStored == null ? false : bcrypt.compareSync(password, userStored.password)

        if(!userStored || !isValidPassword){
            return res.status(400).json({
                ok: false,
                message: "Email or password incorrect"
            })
        }

        const token = await generateToken(userStored.id)

        res.json({
            ok: true,
            user: userStored,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error while login user",
            e : error
        })
    }
}

const getToken = async (req, res) => {
    const { uid } = req

    const token = await generateToken(uid)

    const user = await User.findById(uid)

    res.json({
        ok: true,
        user,
        token
    })
}

export { createUser, loginUser, getToken }