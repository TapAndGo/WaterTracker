// models/custom_cup.Model.js
import { DataTypes } from "sequelize";
import sequelize from "../Utils/db.js";
import user from './user.Model.js';

const CustomCup = sequelize.define("custom_cups", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
   user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: user,
        key: 'user_id'
      }
    },
  name: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.FLOAT, allowNull: false },
  unit: { type: DataTypes.ENUM("ml", "oz"), allowNull: false, defaultValue: "ml" },
});

export default CustomCup;
