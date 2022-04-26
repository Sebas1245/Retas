import User from '../../models/User';
import Reta from '../../models/Reta';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import CustomError from '../../middleware/customError';
import { RequestWithAuth } from '../../middleware/checkAuth';

// Class that holds the methods that create individual handler functions for each route
// Follows the builder pattern
class UserController {
    public register() {
        return async (req: Request, res: Response) => {
            const { username, email, password, confirmPassword, name, phoneNumber } = req.body;
            if (!username) return Promise.reject( new CustomError(400, "You need a username to signup!"));
            if (password != confirmPassword) return Promise.reject(new CustomError(400, "Password does not match confirm password"))
            const user = new User({username, email, password, name, phoneNumber});
            await user.save();
            const token = await user.generateToken();
            res.status(201).json({
                success: true, 
                message: 'User created successfully',
                user,
                token,
            });
        }
    }

    public login() {
        return async (req: Request, res: Response) => {
            const { username, password } = req.body;
            const user = await User.findOne({username}).select('+password +tokens').exec();
            if (!user) return Promise.reject(new CustomError(401, "Username or password incorrect, please try again.")) // change to Custom Error
            const matches = await user.comparePassword(password);
            if (!matches) return Promise.reject(new CustomError(401, "Username or password incorrect, please try again.")) // change to Custom Error
            const token = await user.generateToken();
            res.status(201).json({
                success: true,
                message: 'Login successful',
                user,
                token,
            });
        }
    }

    public toggleAttendance() {
        return async (req: RequestWithAuth, res: Response) => {
            const retaId : Types.ObjectId = req.body.retaId; 
            const userId : Types.ObjectId = req.user?._id;
            const reta = await Reta.findOne({_id: retaId, active: true}).populate('admin').exec();
            const reqUser = await User.findOne({_id: userId}).exec()
            if (!reta) return Promise.reject(new CustomError(404, "Reta not found!"))
            if (!reqUser) return Promise.reject(new CustomError(404, "User not found!"))
            if (reta.confirmed_users.length > reta.max_participants) {
                // max participants has been reached
                // later on, this would be handled by adding on a waitlist
                return Promise.reject(new Error("Event has reached maximum amount of participants!"))
            } else if (userId == reta.admin._id) {
                return Promise.reject("Event admin may not opt out!")
            } else {
                const confirmedUser = await User.findOne({ $and: [{_id: reqUser._id }, { _id: { $in: reta.confirmed_users }}]}).exec()
                if (confirmedUser) {
                    const updatedReta = await Reta.findOneAndUpdate({_id: retaId, active: true}, {$pull: { confirmed_users: reqUser._id } }, {new: true}).exec()
                    if (!updatedReta) return Promise.reject(new CustomError(406, "Error updating reta"))
                    res.status(201).json(updatedReta);
                } else {
                    const updatedReta = await Reta.findOneAndUpdate({_id: retaId, active: true}, {$push: {confirmed_users: reqUser}}, {new: true}).exec()
                    if (!updatedReta) return Promise.reject(new CustomError(406, "Error updating reta"));
                    res.status(201).json({updatedReta, updatedUser: reqUser});
                }
            }

        }
    }

    public getAllRetasForUser() {
        return async (req: RequestWithAuth, res: Response) => {
            const userId : Types.ObjectId = req.user?._id;
            const retasForUser = await Reta.find({is_active: true, confirmed_users: userId}).exec();
            if (!retasForUser) return Promise.reject(new CustomError(404, "No Retas found for this user!"))
            res.status(201).json(retasForUser);
        }
    }
}

// Singleton instance is exported for external use
export default new UserController();