// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
// import bcrypt from 'bcrypt';

const drinks = sequelize.define("drinks", {
  name: { type: DataTypes.STRING, allowNull: false },
  hydrationPct: { type: DataTypes.INTEGER, defaultValue: 100 },
});

export default drinks;
