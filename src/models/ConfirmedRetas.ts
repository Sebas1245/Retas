import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import Reta from "./Reta";
import User from './User';

@Table
export default class ConfirmedRetas extends Model {
    @ForeignKey(() => Reta)
    @Column
    retaId!: number;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    // @Column
    // isAdminConfirmation!: boolean;
}