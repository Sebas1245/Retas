import Reta from "../../models/Reta";
import { Request, Response } from 'express';
import User from "../../models/User";
import CustomError from "../../middleware/customError";
import { RequestWithAuth } from "../../middleware/checkAuth";
import ConfirmedRetas from "../../models/ConfirmedRetas";
import {Op} from "sequelize";

class RetaController {
    public create() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const retaRequest : Reta = req.body.reta;
            const creatorId = req.user.id;
            const creatorUser = await User.findByPk(creatorId);
            if (!creatorUser) return Promise.reject( new CustomError(404, "¡El usuario no existe en la base de datos!"));
            // we assume that the creator is confirmed for the Reta
            retaRequest.adminId = creatorUser.id;
            const newReta = await Reta.create(retaRequest);
            await ConfirmedRetas.create({retaId: newReta.id, userId: creatorUser.id, })
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
            const reta = await Reta.findByPk(retaId)
            if (!reta) return Promise.reject( new CustomError(404, "¡Esta reta no existe!"));
            res.status(200).json({reta});
        }
    }

    public readAll() {
        return async (req: Request, res: Response) => {
            const allRetas = await Reta.findAll({where: {is_active: true, is_private: false}, order: [['date', 'ASC']], include: [User]});
            res.status(200).json({allRetas});
        }
    }

    public delete() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const retaId : number = req.body.retaId
            const deletedReta = await Reta.update({is_active: false}, {where: {id: retaId, is_active: true}});
            if (!deletedReta) return Promise.reject(new CustomError(500, "¡Ocurió un error inesperado al eliminar esta reta!"))
            res.status(200).json({deletedReta})
        }
    }

    public update() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const updatedRetaReq : Reta = req.body.updatedRetaReq;
            const retaId : number = req.body.retaId;
            const userId : number = req.user.id;
            const isUserAdmin = await Reta.findOne({where: {id: retaId, adminId: userId, is_active: true}});
            console.log(updatedRetaReq);
            if (!isUserAdmin) return Promise.reject(new CustomError(401, "!Alguien que no es el administrador no puede editar la reta!"));
            // const updatedReta = await Reta.findOneAndUpdate({_id: retaId, is_active: true}, updatedRetaReq, {new: true}).exec();
            const updatedReta = await Reta.update(updatedRetaReq, {where: {id: retaId, is_active: true}});
            if(!updatedReta) return Promise.reject(new CustomError(404, "¡Esta reta no existe!"))
            console.log('updatedReta ', updatedReta);
            res.status(201).json({updatedReta});
        }
    }

    public getRetasByCategory() {
        return async (req: Request, res: Response) => {
            const category : string = req.params.category;
            const retasWithCategory = await Reta.findAll({where: {category, is_active: true, is_private: false}, order: [['date', 'ASC']], include: [User]});
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
            const tokens = textQuery.split(/(\s+)/).filter(e =>  e.trim().length > 0);
            const queriesPerToken = tokens.map(async token => await Reta.findAll({
                where: {
                    is_active: true,
                    [Op.or] : {
                        name: {[Op.like]: token},
                        description: {[Op.like]: token},
                        location: {[Op.like]: token},
                        category: {[Op.like]: token}
                    }
                }
            }));
            const searchBarQueryResults = (await Promise.all(queriesPerToken)).flat();
            if (!searchBarQueryResults) return Promise.reject(new CustomError(500, "Ocurrió un error inesperado al intentar procesar la búsqueda."));
            res.status(200).json(searchBarQueryResults);

        }
    }

}

// export singleton instance of controller
export default new RetaController();