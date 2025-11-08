import { DailySummary} from "../Models/index.js";
import { Op, fn, col, literal } from "sequelize";

export const getIntakeSummaryRepository = async (userId, type = "daily", referenceDate = new Date()) => {
  // Normalize date
  const date = new Date(referenceDate);

  let where = { user_id: userId };
  let groupBy = [];
  let attributes = [];

  switch (type) {
    case "daily":
      where.date = date;
      attributes = ["user_id", "date", "total_intake_ml", "log_count"];
      break;

    case "weekly":
      attributes = [
        "user_id",
        [fn("date_trunc", "week", col("date")), "week_start"],
        [fn("sum", col("total_intake_ml")), "total_intake_ml"],
        [fn("sum", col("log_count")), "total_logs"],
      ];
      groupBy = [literal('date_trunc(\'week\', "date")'), "user_id"];
      break;

    case "monthly":
      attributes = [
        "user_id",
        [fn("date_trunc", "month", col("date")), "month_start"],
        [fn("sum", col("total_intake_ml")), "total_intake_ml"],
        [fn("sum", col("log_count")), "total_logs"],
      ];
      groupBy = [literal('date_trunc(\'month\', "date")'), "user_id"];
      break;

    case "yearly":
      attributes = [
        "user_id",
        [fn("date_trunc", "year", col("date")), "year_start"],
        [fn("sum", col("total_intake_ml")), "total_intake_ml"],
        [fn("sum", col("log_count")), "total_logs"],
      ];
      groupBy = [literal('date_trunc(\'year\', "date")'), "user_id"];
      break;

    default:
      throw new Error("Invalid summary type. Use 'daily', 'weekly', 'monthly', or 'yearly'.");
  }

  const summaries = await DailySummary.findAll({
    attributes,
    where,
    group: groupBy.length ? groupBy : undefined,
    order: [["date", "DESC"]],
  });

  return summaries;
};


export const updateDailyIntakeSummaryRepository = async (userId, date, amountToAdd , transaction) => {
  // Increment total_intake_ml and log_count atomically
  await DailySummary.increment(
    { total_intake_ml: amountToAdd, log_count: 1 },
    { where: { user_id: userId, date } },
    { transaction }
  );

  // Optionally return updated record
  const updated = await DailySummary.findOne({ where: { user_id: userId, date } } , { transaction });
  return updated;
};


export const createDailyIntakeSummaryRepository = async (userId, { total_intake_ml, log_count, date } , transaction) => {
  const dailySummary = await DailySummary.create({
    user_id: userId,
    date,
    total_intake_ml,
    log_count
  } , {transaction});
  return dailySummary;
};
