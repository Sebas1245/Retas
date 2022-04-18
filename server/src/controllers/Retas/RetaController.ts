import Reta, { IReta } from "../../models/Reta";
import { Request, Response } from 'express';
import User from "../../models/User";
import { Types } from 'mongoose';

class RetaController {
    public create() {
        return async (req: Request, res: Response) => {
            const retaRequest : IReta = req.body.reta;
            console.log(retaRequest);
            const creatorId = req.body.user_id;
            const creatorUser = await User.findOne({_id: creatorId}).exec();
            if (!creatorUser) return Promise.reject( new Error()); // change to custom Error
            // we assume that the creator is confirmed for the Reta
            retaRequest.confirmed_users = [];
            retaRequest.confirmed_users.push(creatorUser);
            retaRequest.admin = creatorUser._id;
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
            const retaId : Types.ObjectId = req.body.retaId;
            console.log(retaId)
            const reta = await Reta.findOne({_id: retaId, is_active: true}).populate('admin confirmed_users').exec();
            if (!reta) return Promise.reject( new Error("Reta not found")); // change to custom error
            res.status(200).json({reta});
        }
    }

    public readAll() {
        return async (req: Request, res: Response) => {
            const allRetas = await Reta.find({is_active: true}).populate('admin confirmed_users').sort({createdAt: -1}).exec();
            res.status(200).json({allRetas});
        }
    }

    public delete() {
        return async (req: Request, res: Response) => {
            const retaId : Types.ObjectId = req.body.retaId
            const deletedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: false}).exec();
            res.status(200).json({deletedReta})
        }
    }

    public update() {
        return async (req: Request, res: Response) => {
            const updatedRetaReq : IReta = req.body.updatedReta;
            const retaId : Types.ObjectId = req.body.retaId;
            const updatedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true}, updatedRetaReq, {new: true}).exec();
            if(!updatedReta) return Promise.reject(new Error("Reta not found"))
            res.status(201).json({updatedReta});
        }
    }


}

// export singleton instance of controller
export default new RetaController();