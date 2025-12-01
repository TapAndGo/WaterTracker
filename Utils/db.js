import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,      // db name
  process.env.POSTGRES_USER,    // user
  process.env.POSTGRES_PASSWORD, // password
  {
    host: process.env.POSTGRES_HOST, // host
    port: process.env.POSTGRES_PORT, // port
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;