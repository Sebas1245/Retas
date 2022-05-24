import User from '../../models/User';
import Reta from '../../models/Reta';
import { Request, Response } from 'express';
import CustomError from '../../middleware/customError';
import { RequestWithAuth } from '../../middleware/checkAuth';
import ConfirmedRetas from '../../models/ConfirmedRetas';
import { Op } from 'sequelize';

// Class that holds the methods that create individual handler functions for each route
// Follows the builder pattern
class UserController {
    public register() {
        return async (req: Request, res: Response) => {
            const { username, email, password, confirmPassword, name, phoneNumber } = req.body;
            if (!username) return Promise.reject( new CustomError(400, "¡Es necesario contar con un usuario!"));
            if (password != confirmPassword) return Promise.reject(new CustomError(400, "Las contraseñas no son iguales"))
            const hashedPassword = await User.hashPassword(password)
            const user = await User.create({username, email, password: hashedPassword, name, phoneNumber}); 
            const token = await user.generateToken();
            res.setHeader("authorization", token);
            res.status(201).json({
                success: true, 
                message: 'User created successfully',
                user,
            });
        }
    }

    public login() {
        return async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const user = await User.findOne({where: {username}});
            if (!user) return Promise.reject(new CustomError(401, "El nombre de usuario y/o contraseña es incorrecto, por favor intente nuevamente.")) // change to Custom Error
            const matches = await user.comparePassword(password);
            if (!matches) return Promise.reject(new CustomError(401, "El nombre de usuario y/o contraseña es incorrecto, por favor intente nuevamente.")) // change to Custom Error
            const token = await user.generateToken();
            res.setHeader("authorization", token);
            res.status(201).json({
                success: true,
                message: 'Login successful',
                user,
            });
        }
    }

    public update() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const updateUserQuery = req.body;
            const user = req.user;
            if (updateUserQuery.password) {
                await user.changePassword(updateUserQuery.password)
                delete updateUserQuery.password;
            } 
            const updatedUser = await user.update(updateUserQuery);
            console.log(updatedUser.password);
            res.status(200).json(updatedUser)
        }
    }
    
    public getUser() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const userId = req.user.id;
            const loggedInUser = await User.findByPk(userId);
            if (!loggedInUser) return Promise.reject(new CustomError(404, "¡Este usuario no existe!"));
            res.status(200).json(loggedInUser);
        }
    }

    public toggleAttendance() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const retaId : number = req.body.retaId; 
            const user : User = req.user;
            const reta = await Reta.findOne({where: {id: retaId, is_active: true}, include: [User]});
            const confirmedUsersInRetaCount = (await ConfirmedRetas.findAndCountAll({where: {retaId}})).count;
            if (!reta) return Promise.reject(new CustomError(404, "¡Esta reta no existe!"))
            if (confirmedUsersInRetaCount > reta.max_participants) {
                // max participants has been reached
                // later on, this would be handled by adding on a waitlist
                return Promise.reject(new Error("¡El evento ya alcanzó su cupo máximo!"))
            } else if (user.id == reta.adminId) {
                return Promise.reject("Event admin may not opt out!")
            } else {
                const confirmedUser = await ConfirmedRetas.findOne({where: {userId: user.id}});
                if (confirmedUser) {
                    await ConfirmedRetas.destroy({where: {userId: user.id, retaId}});
                    res.status(201).json({msg: 'Confirmación eliminada exitosamente', createdConfirmation: false});
                } else {
                    const newConfirmation = await ConfirmedRetas.create({userId: user.id, retaId});
                    if (!newConfirmation) return Promise.reject(new CustomError(406, "Ocurrió un error inesperado al generar la confirmación de asistencia a esta reta."));
                    res.status(201).json({newConfirmation, createdConfirmation: true});
                }
            }

        }
    }

    public getAllRetasForUserAsAdmin() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const userId : number = req.user.id;
            const retasAsAdmin = await Reta.findAll({
                where: {
                    is_active: true, 
                    adminId: userId
                }, 
                order: [['date', 'ASC']], 
                include: [User]
            });
            if (!retasAsAdmin) return Promise.reject(new CustomError(404, "No hay retas para este usuario"))
            res.status(201).json(retasAsAdmin);
        }
    }

    public getAllRetasForUserAsParticipant() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const userId : number = req.user.id;
            const retaConfirmationsForUser= await ConfirmedRetas.findAll({where: {userId}})
            const retasAsParticipantQueries = retaConfirmationsForUser.map(async (confirmation) => 
                await Reta.findOne({
                    where: {
                        id: confirmation.retaId,
                        adminId: {
                            [Op.ne]: confirmation.userId
                        },
                        is_active: true
                    },
                    order: [['date', 'ASC']],
                    include: [User]
                }));
            // check if removing null results is necessary
            const retasAsParticipant = await Promise.all(retasAsParticipantQueries)
            if (!retasAsParticipant) return Promise.reject(new CustomError(404, "No hay retas para este usuario"))
            res.status(201).json(retasAsParticipant);
        }
    }

    public isUserInReta() {
        return async (req: RequestWithAuth, res: Response) => {
            if (!req.user) return Promise.reject(new CustomError(403, "Permisos insuficientes"));
            const retaId : string = req.params.retaId; 
            const reqUser = req.user;
            const reta = await Reta.findOne({where: {id: retaId, is_active: true}, include: [User]});
            if (!reta) return Promise.reject(new CustomError(404, "Reta not found!"))
            const confirmedUser = await ConfirmedRetas.findOne({where: {userId: reqUser.id, retaId}});
            if (reqUser.id == reta.adminId || confirmedUser) {
                res.status(200).json({inReta: true});
            } else {
                res.status(200).json({inReta: false});
            }
        }
    }
}

// Singleton instance is exported for external use
export default new UserController();
