import { logs } from "../Utils/logs.js";
import sequelize from '../Utils/db.js';

import { getIntakeLogRepository, addIntakeLogRepository } from "../Repositories/intake_log.Repository.js";
import { getIntakeSummaryRepository, createDailyIntakeSummaryRepository , updateDailyIntakeSummaryRepository } from "../Repositories/user_daily_intake_summary.Repository.js";

import {
  addHydrationGoalRepository,
  deleteHydrationGoalRepository,
  getHydrationGoalRepository,
  updateHydrationGoalRepository,
} from '../Repositories/hydration_goals.Repository.js';

export const getIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const user = req.user;
    const user_id = user.user_id;

    const logs = await getIntakeLogRepository(user_id , 'daily');

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

export const addIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  let log;

  // Normalize date to YYYY-MM-DD for consistent matching
  const date = new Date().toISOString().split('T')[0];
  const dateTime = new Date();
  const transaction = await sequelize.transaction();

  try {
    const user_id = req.user.user_id;
    const { amount_ml } = req.body;

    if (!amount_ml || amount_ml <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    // 1️⃣ Get the user’s hydration goal
    const userProgress = await getHydrationGoalRepository(user_id);

    if (!userProgress) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Hydration goal not found' });
    }

    // 2️⃣ Update goal progress (only if not already completed)
    if (userProgress.progress < userProgress.goalMl) {
      const newProgress = Math.min(
        userProgress.progress + amount_ml,
        userProgress.goalMl
      );

      await updateHydrationGoalRepository(
        user_id,
        userProgress.id,
        { progress: newProgress },
        { transaction }
      );
    }

    // 3️⃣ Add intake log
    log = await addIntakeLogRepository(
   { user_id, amount_ml, date_time: dateTime, date },
  transaction
);

    // 4️⃣ Handle daily summary (create or update)
    const dailySummary = await getIntakeSummaryRepository(user_id, 'daily');

    if (dailySummary.length === 0) {
      await createDailyIntakeSummaryRepository(user_id, {
        total_intake_ml: amount_ml,
        log_count: 1,
        date,
      }, transaction);
    } else {
      await updateDailyIntakeSummaryRepository(user_id, date, amount_ml, transaction);
    }

    await transaction.commit();

    // ✅ Success response
    level = 'info';
    msg = 'Intake log successfully added';
    res.status(200).json({
      message: msg,
      log,
    });

  } catch (err) {
    await transaction.rollback();
    level = 'error';
    msg = `Error adding intake log: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(
      durationMicroseconds,
      level,
      req.ip,
      req.method,
      msg,
      req.url,
      res.statusCode,
      req.headers['user-agent']
    );
  }
};

