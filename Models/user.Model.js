// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
// import bcrypt from 'bcrypt';

const user = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_age: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.ENUM("male", "female"), allowNull: false, defaultValue: "male" },
  activity_level: { type: DataTypes.ENUM("moderate", "active", "very active", "low"), allowNull: false, defaultValue: "moderate" },
  climate: { type: DataTypes.STRING, allowNull: false },
},
);

export default user;
