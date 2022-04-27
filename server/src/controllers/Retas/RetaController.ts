import Reta, { IReta } from "../../models/Reta";
import { Request, Response } from 'express';
import User from "../../models/User";
import { Types } from 'mongoose';
import CustomError from "../../middleware/customError";
import { RequestWithAuth } from "../../middleware/checkAuth";

class RetaController {
    public create() {
        return async (req: RequestWithAuth, res: Response) => {
            const retaRequest : IReta = req.body.reta;
            console.log(retaRequest);
            const creatorId = req.user?._id;
            const creatorUser = await User.findOne({_id: creatorId}).exec();
            if (!creatorUser) return Promise.reject( new CustomError(404, "User attempting to create event was not found."));
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
            const retaId : string = req.params.retaId;
            const reta = await Reta.findOne({_id: retaId, is_active: true}).populate('admin confirmed_users').exec();
            if (!reta) return Promise.reject( new CustomError(404, "Reta not found"));
            res.status(200).json({reta});
        }
    }

    public readAll() {
        return async (req: Request, res: Response) => {
            const allRetas = await Reta.find({is_active: true, is_private: false}).populate('admin confirmed_users').sort({createdAt: -1}).exec();
            res.status(200).json({allRetas});
        }
    }

    public delete() {
        return async (req: RequestWithAuth, res: Response) => {
            const retaId : Types.ObjectId = req.body.retaId
            const deletedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true }, {is_active: false}, {new: true});
            if (!deletedReta) return Promise.reject(new CustomError(500, "There was an unexpected error deleting this event."))
            res.status(200).json({deletedReta})
        }
    }

    public update() {
        return async (req: RequestWithAuth, res: Response) => {
            const updatedRetaReq : IReta = req.body.updatedReta;
            const retaId : Types.ObjectId = req.body.retaId;
            const userId : Types.ObjectId = req.user?._id;
            const isUserAdmin = await Reta.findOne({_id: retaId, admin: userId, is_active: true}).exec();
            if (!isUserAdmin) return Promise.reject(new CustomError(401, "Someone who is not the admin may not modify the event."));
            const updatedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true}, updatedRetaReq, {new: true}).exec();
            if(!updatedReta) return Promise.reject(new CustomError(404, "Reta not found"))
            res.status(201).json({updatedReta});
        }
    }


}

// export singleton instance of controller
export default new RetaController();