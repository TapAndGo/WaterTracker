import { logs } from "../Utils/logs.js";

import {  getIntakeLogRepository } from "../Repositories/intake_log.Repository.js";

export const getIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const user = req.user;
    const  user_id = user.user_id;

    const logs = await getIntakeLogRepository(user_id);

    level = 'info';
    msg = 'Intake logs retrieved successfully';

    res.status(200).json({
      message: 'Intake logs retrieved successfully',
      logs,
    });
  } catch (err) {
    level = 'error';
    msg = `Error retrieving intake logs: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};