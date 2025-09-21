// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
// import bcrypt from 'bcrypt';

const intake_logs = sequelize.define('intake_logs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  volumeMl: { type: DataTypes.INTEGER, allowNull: false },
  hydrationPct: { type: DataTypes.INTEGER, defaultValue: 100 },
  effectiveMl: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default intake_logs;
