import { json } from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req, res, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            message: "Token is required"
        })
    }

    jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                message: "Invalid token"
            })
        }
        
        const { uid } = decoded
        req.uid = uid
        next()
    
    })

}

export { validateToken }