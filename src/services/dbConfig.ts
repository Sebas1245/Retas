import { Sequelize } from "sequelize-typescript";
import User from '../models/User';
import Reta from '../models/Reta';
import ConfirmedRetas from '../models/ConfirmedRetas';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'retas',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [User, Reta, ConfirmedRetas],
    logging: false
})

