import User from '../../models/User';
import { Request, Response } from 'express';

class UserController {
    public async register(req: Request, res: Response) {
        const { username, password, confirmPassword } = req.body;
        if (!username) return Promise.reject( new Error()); // change to Custom Error 
        if (password != confirmPassword) return Promise.reject(new Error()) // change to Custom Error 
        console.log(username, password, confirmPassword); 
        const user = new User({username, password});
        await user.save();
        const token = await user.generateToken();
        res.status(201).json({
            success: true, 
            message: 'User created successfully',
            user,
            token,
        });
    }

    public async login(req: Request, res: Response) {
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

export default UserController;