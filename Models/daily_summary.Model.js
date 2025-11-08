import { DataTypes } from "sequelize";
import sequelize from "../Utils/db.js";

const UserDailyIntakeSummary = sequelize.define(
  "user_daily_intake_summary",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    date: DataTypes.DATEONLY,
    total_intake_ml: { type: DataTypes.INTEGER, defaultValue: 0 },
    log_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: false,
    freezeTableName: true  ,// prevents ,
     indexes: [
    { fields: ['user_id', 'date'] }
  ]
  }
);

export default UserDailyIntakeSummary;
