import {
  addHydrationGoalRepository,
  deleteHydrationGoalRepository,
  getHydrationGoalRepository,
  updateHydrationGoalRepository,
} from '../Repositories/hydration_goals.Repository.js';
import { logs } from "../Utils/logs.js";
import { calculateHydrationGoal} from "../Middlewares/calculate_goal.js";
import {getUserRepository} from "../Repositories/user.Repository.js";

export const addHydrationGoalController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  let goalMl;

  try {
    const {
      startDate,
      endDate,
      user_age,
      goalMl
    } = req.body;

    const user = req.user;
    const  user_id = user.id;

     const userData = await getUserRepository(user_id);

    if(goalMl === null) {
      goalMl = await calculateHydrationGoal(user_age, userData.gender, userData.activity_level, userData.climate);
    }


    const newGoal = await addHydrationGoalRepository({
      user_id,
      goalMl,
      startDate,
      endDate,
    });

    level = 'info';
    msg = `Hydration goal added with ID: ${newGoal.id}`;

    res.status(201).json({
      message: 'Hydration goal added successfully',
      goal: newGoal,
    });
  } catch (err) {
    level = 'error';
    msg = `Error adding hydration goal: ${err.message}`;
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
      req.headers["user-agent"]
    );
  }
};


export const deleteHydrationGoalController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { goalId } = req.body;

        const user = req.user;
    const  user_id = user.id;

    const deletedGoal = await deleteHydrationGoalRepository(user_id, goalId);

    level = 'info';
    msg = `Hydration goal deleted with ID: ${goalId}`;

    res.status(200).json({
      message: 'Hydration goal deleted successfully',
      deletedGoal,
    });
  } catch (err) {
    level = 'error';
    msg = `Error deleting hydration goal: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};


export const getHydrationGoalController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { user_id } = req.params;

    const goals = await getHydrationGoalRepository(user_id);

    level = 'info';
    msg = 'Hydration goals retrieved successfully';

    res.status(200).json({
      message: 'Hydration goals retrieved successfully',
      goals,
    });
  } catch (err) {
    level = 'error';
    msg = `Error retrieving hydration goals: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const updateHydrationGoalController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const {
      goalId,
      goalMl,
      startDate,
      endDate,
      progress
    } = req.body;

      const user = req.user;
    const  user_id = user.id;


    const updatedGoal = await updateHydrationGoalRepository(user_id, goalId, {
      goalMl,
      startDate,
      endDate,
      progress,
    });

    level = 'info';
    msg = `Hydration goal updated with ID: ${goalId}`;

    res.status(200).json({
      message: 'Hydration goal updated successfully',
      goal: updatedGoal,
    });
  } catch (err) {
    level = 'error';
    msg = `Error updating hydration goal: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};
