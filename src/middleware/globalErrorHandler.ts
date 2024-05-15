
import {NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const globalErrorHandler = (
    err:HttpError,
    req: Request,
    res:Response,
    next:NextFunction
) => {
    
    const errorCode = err.statusCode || 500
    // throw err
    console.log("Error: ",err.stack)
    res.status(errorCode).json({
        status: errorCode,
        message: err.message, 
        errorStack: err.stack
        
    })
}

export=globalErrorHandler