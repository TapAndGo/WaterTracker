
import {
  addHydrationGoalRespository,
  deleteHydrationGoalRespository,
  getHydrationGoalRespository,
  updateHydrationGoalRespository
} from '../Repositories/hydration_goals.Repository.js';
import { logs } from "../Utils/logs.js";

export const addHydrationGoalController = async (req, res) => {
    const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { user_id, goalMl, startDate, endDate } = req.body;

    const newGoal = await addHydrationGoalRespository(user_id, goalMl, startDate, endDate);
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
  }finally{
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const deleteHydrationGoalController = async (req, res) => {
    const startTime = process.hrtime.bigint();
  let level;
  let msg;
    try {
      const { user_id, goalId } = req.body;

      const deletedGoal = await deleteHydrationGoalRespository(user_id, goalId);
      level = 'info';
      msg = `Hydration goal deleted with ID: ${goalId}`;
      res.status(200).json({
        message: 'Hydration goal deleted successfully',
        goal: deletedGoal,
      });
    } catch (err) {
      level = 'error';
      msg = `Error deleting hydration goal: ${err.message}`;
      res.status(400).json({ error: err.message });
    }finally{
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
      const { user_id } = req.body;

      const goals = await getHydrationGoalRespository(user_id);

      level = 'info';
      msg = `Hydration goals retrieved successfully`;
      res.status(200).json({
        message: 'Hydration goals retrieved successfully',
        goals,
      });
    } catch (err) {
      level = 'error';
      msg = `Error retrieving hydration goals: ${err.message}`;
      res.status(400).json({ error: err.message });
    }finally{
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
      const { user_id, goalId, goalMl, startDate, endDate } = req.body;

      const updatedGoal = await updateHydrationGoalRespository(user_id, goalId, goalMl, startDate, endDate);

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
    }finally{
      const endTime = process.hrtime.bigint();
      const durationMicroseconds = Number(endTime - startTime) / 1000;
      logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
    }
  };
