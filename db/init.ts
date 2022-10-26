import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {Post, Topic, User} from './models';

const baseOptions: SequelizeOptions = {
    dialect: 'postgres',
    port: 5432,
    models: [Topic, Post, User],
};

const envOptions: SequelizeOptions = {
    host: process.env.DB_HOSTNAME ?? 'localhost',
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'postgres',
};

export const sequelize = new Sequelize({...envOptions, ...baseOptions});

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.createSchema('runner', { logging: true });
        await sequelize.sync({force: true, alter: true, schema: 'runner'});

        console.info('Connection to the data base successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
