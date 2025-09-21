
import {
  addHydrationGoalRespository,
  deleteHydrationGoalRespository,
  getHydrationGoalRespository,
  updateHydrationGoalRespository
} from '../Repositories/hydration_goals.repository.js';

export const addHydrationGoalController = async (req, res) => {
  try {
    const { user_id, goalMl, startDate, endDate } = req.body;

    const newGoal = await addHydrationGoalRespository(user_id, goalMl, startDate, endDate);

    res.status(201).json({
      message: 'Hydration goal added successfully',
      goal: newGoal,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteHydrationGoalController = async (req, res) => {
    try {
      const { user_id, goalId } = req.body;

      const deletedGoal = await deleteHydrationGoalRespository(user_id, goalId);

      res.status(200).json({
        message: 'Hydration goal deleted successfully',
        goal: deletedGoal,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const getHydrationGoalController = async (req, res) => {
    try {
      const { user_id } = req.body;

      const goals = await getHydrationGoalRespository(user_id);

      res.status(200).json({
        message: 'Hydration goals retrieved successfully',
        goals,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const updateHydrationGoalController = async (req, res) => {
    try {
      const { user_id, goalId, goalMl, startDate, endDate } = req.body;

      const updatedGoal = await updateHydrationGoalRespository(user_id, goalId, goalMl, startDate, endDate);

      res.status(200).json({
        message: 'Hydration goal updated successfully',
        goal: updatedGoal,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
