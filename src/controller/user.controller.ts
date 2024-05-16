

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import user_model from "../model/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import configs from "../config/config";


const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {

        const error = createHttpError(400, `Please provide all require details`)
        return next(error)
    }

    const isUserExist = await user_model.findOne({ email })

    if (isUserExist) {
        const error = createHttpError(400, `User is registered already. please Login or Register with other email`)
        return next(error)
    }


    // for hashing the password which is created 
    let hash = await bcrypt.hash(password, 10)

    let New_User = await user_model.create({
        name,
        email,
        password: hash
    })

    // for creating token for access in future
    let token = jwt.sign(
        { sub: New_User._id },
        configs.jwt_secret as string,
        { expiresIn: '7d' }
    );

    console.log("token: ", token)

    res.status(201)
        .send({
            message: `User is Register successfully`,
            hash,
            _id: New_User._id,
            token
        })

}


const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { email, password } = req.body

    if (!email || !password) {

        const error = createHttpError(400, `Please enter login credential`)
        return next(error)
    }

    const isUserExist = await user_model.findOne({ email })

    if (!isUserExist) {

        const error = createHttpError(404, `User Not Found`)
        return next(error)
    }
    console.log("isUserExist: ", isUserExist)


    let { password: hashedPassword } = isUserExist
    console.log("hashedPassword: ", hashedPassword)



    if (!password || !hashedPassword) {

        const error = createHttpError(400, 'Password or hash is undefined')
        return next(error)
    }

    const result = await bcrypt.compare(password, hashedPassword as string)
    console.log("result: ", result)

    if (result) {
        console.log('Password is valid!');

        // for creating token for access in future
        let token = jwt.sign(
            { sub: isUserExist._id },
            configs.jwt_secret as string,
            { expiresIn: '7d' }
        );
        res.status(200).send({
            message: `User Login successfully`,
            token
        })
    }
    else {
        console.log('Password is invalid!');
        const error = createHttpError(400, `Please enter valid credenials`)
        next(error)
    }
}

export { register, login }
