import { Request, Response } from 'express';
import CustomError from './customError'

const sendAsJson = () => async (err: CustomError, req: Request, res: Response) => {
    console.log('err: ', err);
    if (err.statusCode !== 500 ) {
        return res.status(err.statusCode).json({ code: err.statusCode, name: err.name, message: err.message });
    } else {
        return res.status(500).send("SERVER ERROR");
    }
}

export default sendAsJson;