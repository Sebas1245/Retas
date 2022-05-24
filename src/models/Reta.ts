import { Table, Column, Model, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import User from './User';
import ConfirmedRetas from './ConfirmedRetas';

@Table
export default class Reta extends Model<Reta> {
    @Column
    name!: string;
    @Column
    description!: string;
    @Column
    date!: Date;
    @Column
    hours!: number;
    @Column
    minutes!: number;
    @Column
    duration!: number;
    @Column
    location!: string;
    @Column
    is_private!: boolean;
    @Column
    min_participants!: number;
    @Column
    max_participants!: number;
    @Column
    category!: string;
    @BelongsToMany(() => User, () => ConfirmedRetas)
    confirmed_users?: User[];
    @ForeignKey(() => User)
    @Column
    adminId!: number;
    @Column
    is_active!: boolean;
}