import { getIntakeSummaryRepository } from "../Repositories/user_daily_intake_summary.Repository.js";
import { logs } from "../Utils/logs.js";

export const getUserDaySummaryController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const user = req.user;
    const user_id = user.user_id;

    const type = req.params.type || "daily";

    const summary = await getIntakeSummaryRepository(user_id , type);

    level = "info";
    msg = "User summary retrieved successfully";

    res.status(200).json({
      message: "User summary retrieved successfully",
      summary,
    });
  } catch (err) {
    level = "error";
    msg = `Error retrieving user summary: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};