

import {NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import user_model from "../model/user.model";
import bcrypt from "bcrypt"


const register = async(
    req:Request,
    res: Response,
    next:NextFunction
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
    
    let hash = await bcrypt.hash(password, 10)
    
    await user_model.create({
        name,
        email,
        password: hash
    })

    res.status(200).send({
            message: `User is Register successfully`, 
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
            
        const error = createHttpError(400, `Please register your self First`)
        return next(error)
    }
    console.log("isUserExist: ",isUserExist)

    const { password: hashedPassword } = isUserExist
    console.log("hashedPassword: ",hashedPassword)
    
    // bcrypt.compare(password, hashedPassword, (err, result) => {
    //     if (err) {
    //         console.error('Error comparing password:', err);
    //         return;
    //     }

        // if (result) {
        //     console.log('Password is valid!');
           
        //     res.status(200).send({
        //     message: `User Login successfully`,
        //     })
        // }
        // else {
        //     console.log('Password is invalid!');
        //     const error = createHttpError(400, `Please enter valid credenials`)
        //     next(error)
        // }
        
        

    // }
if (!password || !hashedPassword) {
    // throw {  };
    const error = createHttpError(400, 'Password or hash is undefined')
    return next(error)
    
    }
    
    const result = await bcrypt.compare(password, hashedPassword)
    console.log("result: ",result)
    if (result) {
            console.log('Password is valid!');
           
            res.status(200).send({
            message: `User Login successfully`,
            })
        }
        else {
            console.log('Password is invalid!');
            const error = createHttpError(400, `Please enter valid credenials`)
            next(error)
        }
}

export { register, login }
