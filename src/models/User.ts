import { Table, Column, Model, BelongsToMany, Unique } from 'sequelize-typescript'
import Reta from './Reta';
import ConfirmedRetas from './ConfirmedRetas';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Table
export default class User extends Model {
    @Unique({name: 'Unique username validation', msg: 'Este usuario ya está en uso.'})
    @Column 
    username!: string;
    @Column
    email!: string;
    @Column
    password!: string;
    @Column
    name!: string;
    @Column
    phoneNumber!: string;
    @Column
    token?: string;
    @BelongsToMany(() => Reta, () => ConfirmedRetas)
    retas?: Reta[];

    async generateToken() {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
            const token = jwt.sign({ id: this.id.toString() }, jwtSecret, { expiresIn: '1 day' });
            this.token = token
            await this.save();
            return Promise.resolve(token);
        } else {
            throw Promise.reject(Error('No JWT Secret has been defined')); 
        }
    }

    async comparePassword(password: string) {
        const matches = await bcrypt.compare(password, this.password);
        console.log(matches ? "Pasword matched" : "Password did not match")
        return Promise.resolve(matches);
    }

    async changePassword(newPassword: string) {
        this.password = await User.hashPassword(newPassword);
        console.log("Hashed password is on change", this.password);
        return await this.save();
    }

    static async hashPassword(password: string) {
        console.log("hashing password on ", password);
        return await bcrypt.hash(password, 10);    
    }
}