import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import CustomError from './customError';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { IUserDocument } from '../models/User';

interface VerifiedUserPayload extends JwtPayload {
    _id: Types.ObjectId
}

export interface RequestWithAuth extends Request {
    user?: IUserDocument
}
// TODO: 
// check if ALL of this is still valid after changes
export async function isLoggedIn(req: RequestWithAuth, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
        // return Promise.reject(new CustomError(401, "You need to be logged in to do that")); 
        res.redirect("/login");
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    // TODO: redirect to error page
    if (!jwtSecret) return Promise.reject(new CustomError(500, "No JWT Secret has been set."));
    const data : VerifiedUserPayload = jwt.verify(token.split(' ')[1], jwtSecret) as VerifiedUserPayload;
    const user = await User.findById(data._id).select('+tokens')
    if (user && !user.tokens?.includes(token.split(' ')[1])) {
        // TODO: redirect to login with message
        return Promise.reject(new CustomError(405, 'Session has expired, login again.'))
    }

    if (user) {
        req.user = user;
        delete user.tokens
        next()
    } else {
        res.redirect("/login");
        return;
    }
}