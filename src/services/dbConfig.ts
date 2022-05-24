import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'retas',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [__dirname + '/models']
})

