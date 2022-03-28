import Reta, { IReta } from "../../models/Reta";
import { Request, Response } from 'express';
import User from "../../models/User";

class RetaController {
    public create() {
        return async (req: Request, res: Response) => {
            const retaRequest : IReta = req.body.reta;
            const creatorId = req.body.user_id;
            const creatorUser = await User.findById({_id: creatorId}).exec();
            if (!creatorUser) return Promise.reject( new Error()); // change to custom Error
            // we assume that the creator is confirmed for the Reta
            retaRequest.confirmed_users.push(creatorUser);
            const newReta = new Reta(retaRequest);
            await newReta.save();
            res.status(201).json({
                success: true, 
                message: 'Reta created successfully',
                newReta,
            });
        }
    }

    public readOne() {
        return async (req: Request, res: Response) => {
            const retaId : string = req.body.retaId;
            const reta = await Reta.findById({_id: retaId}).exec();
            if (!reta) return Promise.reject( new Error("Reta not found")); // change to custom error
            res.status(200).json({reta});
        }
    }

    public readAll() {
        return async (req: Request, res: Response) => {
            const allRetas = await Reta.find({}).sort({createdAt: -1}).exec();
            res.status(200).json({allRetas});
        }
    }
}

// export singleton instance of controller
export default new RetaController();