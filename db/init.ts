import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {Post, Topic, User} from './models';

const baseOptions: SequelizeOptions = {
    dialect: 'postgres',
    port: 5432,
    models: [Topic, Post, User],
};

const envOptions: SequelizeOptions = {
    host: process.env.DB_HOSTNAME ?? 'localhost',
    username: process.env.DB_USERNAME ?? 'dev',
    password: process.env.DB_PASSWORD ?? 'dev',
    database: process.env.DB_NAME ?? 'runner_db',
};

export const sequelize = new Sequelize({...baseOptions, ...envOptions});

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.createSchema('runner', { logging: true });
        await sequelize.sync();

        console.info('Connection to the data base successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
