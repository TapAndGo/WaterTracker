// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';

const user = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_age: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.ENUM("male", "female"), allowNull: false, defaultValue: "male" },
  user_weight : { type: DataTypes.INTEGER, allowNull: false },
  user_height: { type: DataTypes.INTEGER, allowNull: false },
  activity_level: { type: DataTypes.ENUM("moderate", "active", "very active", "low"), allowNull: false, defaultValue: "moderate" },
  climate: { type: DataTypes.ENUM("cold", "hot", "warm"), allowNull: false, defaultValue: "warm"  },
  wake_up_time: { type: DataTypes.TIME, allowNull: false },
  sleep_time: { type: DataTypes.TIME, allowNull: false },
  streak_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
},
);

export default user;
