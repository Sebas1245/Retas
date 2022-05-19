import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import { Reta } from "./Reta";
import { User } from './User';

@Table
export class ConfirmedRetas extends Model<ConfirmedRetas> {
    @ForeignKey(() => Reta)
    @Column
    retaId!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;
}