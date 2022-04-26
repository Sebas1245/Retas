import { Document, model, Types, Schema } from "mongoose"
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export interface IUser {
    username: string, 
    email: string, 
    password: string,
    name: string,
    phoneNumber: string,
    tokens?: string[],
}

export interface IUserDocument extends IUser, Document {
    tokens?: Types.Array<string>;
    comparePassword: (password: string) => Promise<boolean>;
    generateToken: () => Promise<string>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
    username: { type: String, required: [true, "Username is missing"] },
    email: { type: String, required: [true, "Email is missing!"] },
    name: { type: String, required: [true, "Name is missing!"] },
    phoneNumber: { type: String, required: [true, "Phone number is missing!"] },
    password: { type: String, required: [true, "Password is missing!"] },
    tokens: { type: [String], select: false }
}, {
    timestamps: true
});

// Validate if username is unique - unique option only creates an index
UserSchema.path('username').validate(async function (this: IUserDocument ) {
    const usernameCount = await UserModel.countDocuments({ username: this.username, _id: { $ne: this._id } });
    return !usernameCount;  
}, 'There already is an account with this username!');

// Validate if email is unique - unique option only creates an index
UserSchema.path('email').validate(async function (this: IUserDocument ) {
    const emailCount = await UserModel.countDocuments({ email: this.email, _id: { $ne: this._id } });
    return !emailCount;  
}, 'There already is an account with this email!');

UserSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next()
        } catch (error) {
            const err = new Error('Internal server error');
            next(err);
        }
    } else {
        next()
    }

})

UserSchema.methods.comparePassword = async function (password: string) {
    const matches = await bcrypt.compare(password, this.password);
    console.log(matches ? "Pasword matched" : "Password did not match")
    return Promise.resolve(matches);
}

UserSchema.methods.generateToken = async function (this: IUserDocument) {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
        const token = jwt.sign({ _id: this._id.toString() }, jwtSecret, { expiresIn: '2 days' });
        this.tokens?.push(token);
        await this.save();
        return Promise.resolve(token);
    } else {
        throw Promise.reject(Error('No JWT Secret has been defined')); 
    }
}

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;