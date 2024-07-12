import { validationResult } from "express-validator"

const validateFields = (req, res, next) => {
    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: result.mapped()
        })
    }

    next()
}

export { validateFields }