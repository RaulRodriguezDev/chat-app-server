import jwt from 'jsonwebtoken'

const generateToken = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '2m'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('Something went wrong')
            } else {
                resolve(token)
            }
        })
    })
}

const validateToken = (token = '') => {
    try{
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY)

        return [true, uid]
    }catch(err){
        return [false, null]
    }
}

export { generateToken, validateToken }