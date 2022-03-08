import User from '../../models/User';
import { Request, Response } from 'express';

// Class that holds the methods that create individual handler functions for each route
// Follows the builder pattern
class UserController {
    public register() {
        return async (req: Request, res: Response) => {
            const { username, email, password, confirmPassword } = req.body;
            if (!username) return Promise.reject( new Error()); // change to Custom Error 
            if (password != confirmPassword) return Promise.reject(new Error()) // change to Custom Error 
            const user = new User({username, email, password});
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
}

// Singleton instance is exported for external use
export default new UserController();