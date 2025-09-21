// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
// import bcrypt from 'bcrypt';

const hydration_goals = sequelize.define('hydration_goals', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  goalMl: { type: DataTypes.INTEGER, allowNull: false },
  startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  endDate: { type: DataTypes.DATE, allowNull: true },
  progress: { type: DataTypes.INTEGER, defaultValue: 0 },
},
);

export default hydration_goals;
