import CustomError from "./customError";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { UniqueConstraintError, ValidationError } from "sequelize";

const errorHandler = () => (
    err: CustomError | Error | undefined, 
    req: Request, 
    res: Response, 
    next: NextFunction ) => {
    if (err instanceof ReferenceError) {
        console.log("REFERENCEERROR")
        console.log(err.message)
        next(new CustomError(400, "There was an error on: " + err.message.split(' ')[0]));
    } else if (err instanceof CustomError) {
        console.log("Caught error at errorHandler");
        next(err);
    } else if (err instanceof JsonWebTokenError) {
        console.log('err jwt :>> ', err);
        next(new CustomError(401, 'You need to be logged in to do that.'))
    } else if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
        console.log("ERR", err.errors[0].message);
        console.log(err.message);
        next(new CustomError(406, err.errors[0].message));
    } else {
        console.log('err :', err);
        console.log('=============================')
        if (process.env.NODE_ENV === 'prod') {
            next(new CustomError(500, "SERVER ERROR"));
        } else if (err) {
            next(new CustomError(500, err.message));
        }
    }
}

export default errorHandler;