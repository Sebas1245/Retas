import { Table, Column, Model, BelongsToMany, Unique, BeforeUpdate, BeforeCreate } from 'sequelize-typescript'
import { Reta } from './Reta';
import { ConfirmedRetas } from './ConfirmedRetas';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

@Table
export default class User extends Model {
    @Column
    @Unique
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
        this.password = newPassword
        return await this.save();
    }

    @BeforeUpdate
    @BeforeCreate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async hashPassword(instance: User, options: any) {
        try {
            const hashedPassword = await bcrypt.hash(instance.password, 10);
            instance.password = hashedPassword;
            options.next()
        } catch (error) {
            const err = new Error('Internal server error');
            options.next(err);
        }
    }
}