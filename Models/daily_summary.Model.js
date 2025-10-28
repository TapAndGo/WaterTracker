import { DataTypes } from "sequelize";
import sequelize from "../Utils/db.js";

const UserDailyIntakeSummary = sequelize.define(
  "user_daily_intake_summary",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    date: DataTypes.DATEONLY,
    total_intake_ml: DataTypes.FLOAT,
    log_count: DataTypes.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true // prevents Sequelize from pluralizing the view name
  }
);

export default UserDailyIntakeSummary;
