import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ override: true }); // always use K8s env

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
