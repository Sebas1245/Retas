import mongoose, { Schema, Document, models } from "mongoose";
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser {
    username: string, 
    email: string, 
    password: string,
    tokens: string[],
}

export interface IUserDocument extends IUser, Document {
    comparePassword: (password: string) => boolean;
    generateToken: () => Promise<string>;
}

const userSchema: Schema<IUserDocument> = new Schema({
    username: { type: String, required: [true, "Username is missing"] },
    email: { type: String, required: [true, "Email is missing!"] },
    password: { type: String, required: [true, "Password is missing!"] },
    tokens: { type: [String], select: false }
}, {
    timestamps: true
});

// Validate if username is unique - unique option only creates an index
userSchema.path('username').validate(async (value: IUserDocument) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const usernameCount = await models.User.countDocuments({ username: value.username, _id: { $ne: value._id } });
    return !usernameCount;  
}, 'There already is an account with this username!');

userSchema.pre('save', function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; 
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10).then(function (hash) {
            user.password = hash
            next()
        }).catch(function (error) {
            return next(error)
        })
    } else {
        next()
    }

})

userSchema.methods.comparePassword = async function (password: string) {
    const matches = await bcrypt.compare(password, this.password);
    console.log(matches ? "Pasword matched" : "Password did not match")
    return matches;
}

userSchema.methods.generateToken = async function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
        const token = jwt.sign({ _id: user._id.toString() }, jwtSecret, { expiresIn: '2 days' });
        user.tokens.push(token);
        await user.save();
        return Promise.resolve(token);
    } else {
        throw Promise.reject(Error('No JWT Secret has been defined')); 
    }
}

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;