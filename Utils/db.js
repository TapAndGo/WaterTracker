import { Sequelize } from 'sequelize';

// Hardcoded environment variables
const POSTGRES_DB = 'watertracker';
const POSTGRES_USER = 'postgres';
const POSTGRES_PASSWORD = 'Pr!nce9312lee';
const POSTGRES_HOST = 'watertracker-postgres-service';
const POSTGRES_PORT = 5432;

const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
