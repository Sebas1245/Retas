import User from '../../models/User';
import Reta from '../../models/Reta';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

// Class that holds the methods that create individual handler functions for each route
// Follows the builder pattern
class UserController {
    public register() {
        return async (req: Request, res: Response) => {
            const { username, email, password, confirmPassword, name, phoneNumber } = req.body;
            if (!username) return Promise.reject( new Error()); // change to Custom Error 
            if (password != confirmPassword) return Promise.reject(new Error()) // change to Custom Error 
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
            if (!user) return Promise.reject( new Error()) // change to Custom Error
            const matches = user.comparePassword(password);
            if (!matches) return Promise.reject( new Error()) // change to Custom Error
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
        return async (req: Request, res: Response) => {
            const { userId, retaId } : { userId : Types.ObjectId, retaId : Types.ObjectId }= req.body; 
            const reta = await Reta.findOne({_id: retaId, active: true}).populate('admin').exec();
            const reqUser = await User.findOne({_id: userId}).exec()
            if (!reta) return Promise.reject(new Error("Reta not found!"))
            if (!reqUser) return Promise.reject(new Error("User not found!"))
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
                    res.status(201).json(updatedReta);
                } else {
                    const updatedReta = await Reta.findOneAndUpdate({_id: retaId, active: true}, {$push: {confirmed_users: reqUser}}, {new: true}).exec()
                    res.status(201).json(updatedReta);
                }
            }

        }
    }
}

// Singleton instance is exported for external use
export default new UserController();