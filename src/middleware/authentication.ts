

import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { verify } from "jsonwebtoken"
import configs from "../config/config"


export interface AuthRequest extends Request {
    userID: string
}


const authentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let token = req.header("Authorization")?.split(' ')[1]
        // console.log("token: ", token)

        if (!token) {
            let error = createHttpError(401, ` Authorised Token is required`)
            return next(error)
        }

        let decode = verify(token, configs.jwt_secret as string)
        // console.log("decode: ", decode)

        let _req = req as AuthRequest
        _req.userID = decode.sub as string
        next()
    }
    catch (error) {
        let err = createHttpError(500, { error } || `Token is Expired or Invalid`)
        return next(err)
    }
}

export default authentication