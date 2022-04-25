import CustomError from "./customError";
import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { JsonWebTokenError } from "jsonwebtoken";

const errorHandler = () => (
    err: CustomError | MongoError | Error | MongooseError.CastError | MongooseError.ValidationError | undefined, 
    req: Request, 
    res: Response, 
    next: NextFunction ) => {
    if (err instanceof MongoError){
        console.log("MONGOERROR");
        if (err.code  === 11000) {
            next(new CustomError(409, 'Credentials were already used.'));
        } else {
            next(err);
        }
    } else if (err instanceof MongooseError.CastError) {
        console.log("CASTERROR");
        next(new CustomError(400, 'Value "' + err.value + '" is not accepted for the field: ' + err.kind))
    } else if (err instanceof MongooseError.ValidationError) {
        let msg = '';
        for (const type in err.errors) {
            if (msg.length > 0) {
                msg += " ";
            }
            msg += err.errors[type].message;
        }
        next(new CustomError(409, err.message));
    } else if (err instanceof ReferenceError) {
        console.log("REFERENCEERROR")
        console.log(err.message)
        next(new CustomError(400, "There was an error on: " + err.message.split(' ')[0]));
    } else if (err instanceof CustomError) {
        console.log("Caught error at errorHandler");
        next(err);
    } else if (err instanceof JsonWebTokenError) {
        console.log('err jwt :>> ', err);
        next(new CustomError(401, 'You need to be logged in to do that.'))
    } else {
        console.log('err :', err);
        console.log('=============================')
        if (process.env.NODE_ENV === 'prod') {
            next(new CustomError(500, "SERVER ERROR"));
        }
    }
}

export default errorHandler;