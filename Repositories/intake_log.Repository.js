import { IntakeLog } from "../Models/index.js";
import { Op, fn, col, literal } from "sequelize";

export const addIntakeLogRepository = async (intakeLog, transaction) => {
  try {
    const newIntakeLog = await IntakeLog.create(intakeLog, { transaction });
    return newIntakeLog;
  } catch (error) {
    throw error;
  }
};

export const getIntakeLogRepository = async (
  user_id,
  type = "daily",
  referenceDate = new Date()
) => {
  try {
    const date = new Date(referenceDate);
    let where = { user_id };
    let attributes = [];
    let groupBy = [];

    switch (type) {
      case "daily": {
        // Get all logs for the specific date (ignore time)
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        where.date = { [Op.between]: [startOfDay, endOfDay] };
        attributes = ["id", "user_id", "amount_ml", "date"];
        break;
      }

      case "weekly":
        attributes = [
          "user_id",
          [fn("date_trunc", "week", col("date")), "week_start"],
          [fn("sum", col("amount_ml")), "total_intake_ml"],
          [fn("count", col("id")), "log_count"],
        ];
        groupBy = [literal('date_trunc(\'week\', "date")'), "user_id"];
        break;

      case "monthly":
        attributes = [
          "user_id",
          [fn("date_trunc", "month", col("date")), "month_start"],
          [fn("sum", col("amount_ml")), "total_intake_ml"],
          [fn("count", col("id")), "log_count"],
        ];
        groupBy = [literal('date_trunc(\'month\', "date")'), "user_id"];
        break;

      case "yearly":
        attributes = [
          "user_id",
          [fn("date_trunc", "year", col("date")), "year_start"],
          [fn("sum", col("amount_ml")), "total_intake_ml"],
          [fn("count", col("id")), "log_count"],
        ];
        groupBy = [literal('date_trunc(\'year\', "date")'), "user_id"];
        break;

      default:
        throw new Error(
          "Invalid log type. Use 'daily', 'weekly', 'monthly', or 'yearly'."
        );
    }

    // Query execution
    const intakeLogs = await IntakeLog.findAll({
      attributes,
      where,
      group: groupBy.length ? groupBy : undefined,
      order: [["date", "DESC"]],
    });

    return intakeLogs;
  } catch (error) {
    console.error("Error fetching intake logs:", error);
    throw error;
  }
};

export const deleteIntakeLogRepository = async (id) => {
  try {
    const deletedIntakeLog = await IntakeLog.destroy({ where: { id } });
    return deletedIntakeLog;
  } catch (error) {
    throw error;
  }
};

