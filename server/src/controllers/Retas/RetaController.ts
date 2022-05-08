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
            const creatorId = req.user?._id;
            const creatorUser = await User.findOne({_id: creatorId}).exec();
            if (!creatorUser) return Promise.reject( new CustomError(404, "¡El usuario no existe en la base de datos!"));
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
            if (!reta) return Promise.reject( new CustomError(404, "¡Esta reta no existe!"));
            res.status(200).json({reta});
        }
    }

    public readAll() {
        return async (req: Request, res: Response) => {
            const allRetas = await Reta.find({is_active: true, is_private: false}).populate('admin confirmed_users').sort({date: 1}).exec();
            res.status(200).json({allRetas});
        }
    }

    public delete() {
        return async (req: RequestWithAuth, res: Response) => {
            const retaId : Types.ObjectId = req.body.retaId
            const deletedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true }, {is_active: false}, {new: true});
            if (!deletedReta) return Promise.reject(new CustomError(500, "¡Ocurió un error inesperado al eliminar esta reta!"))
            res.status(200).json({deletedReta})
        }
    }

    public update() {
        return async (req: RequestWithAuth, res: Response) => {
            console.log(req.body);
            const updatedRetaReq : IReta = req.body.updatedRetaReq;
            const retaId : Types.ObjectId = req.body.retaId;
            const userId : Types.ObjectId = req.user?._id;
            const isUserAdmin = await Reta.findOne({_id: retaId, admin: userId, is_active: true}).exec();
            console.log(updatedRetaReq);
            if (!isUserAdmin) return Promise.reject(new CustomError(401, "!Alguien que no es el administrador no puede editar la reta!"));
            const updatedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true}, updatedRetaReq, {new: true}).exec();
            if(!updatedReta) return Promise.reject(new CustomError(404, "¡Esta reta no existe!"))
            console.log('updatedReta ', updatedReta);
            res.status(201).json({updatedReta});
        }
    }

    public getRetasByCategory() {
        return async (req: Request, res: Response) => {
            const category : string = req.params.category;
            const retasWithCategory = await Reta.find({category, is_active: true, is_private: false}).populate('admin').sort({date: 1}).exec();
            if (!retasWithCategory) return Promise.reject(new CustomError(404, '¡No hay retas con esta categoría!'));
            res.status(200).json(retasWithCategory);
        }
    }

    // this controller queries by getting anything that is like the text input by the user 
    // on all string values in the model
    // a more appropriate way to implement this controller could be to use text indices
    public getRetasBySearchBarQuery() {
        return async (req: Request, res: Response) => {
            const textQuery : string = req.query.textQuery as string;
            const retasLikeQuery = await Reta.find({
                $or: [
                    {name: {$regex: textQuery, $options: 'i'}},
                    {description: {$regex: textQuery, $options: 'i'}},
                    {location: {$regex: textQuery, $options: 'i'}},
                    {category: {$regex: textQuery, $options: 'i'}},
                ],
                is_active: true
            }).exec();
            if (!retasLikeQuery) return Promise.reject(new CustomError(500, "Ocurrió un error inesperado al intentar procesar la búsqueda."));
            res.status(200).json(retasLikeQuery);

        }
    }

}

// export singleton instance of controller
export default new RetaController();