import hydration_goals from "../Models/hydration_goals.Model.js";

export const addHydrationGoalRespository = async (userId, goalMl, startDate, endDate) => {
  try {
    const newGoal = await hydration_goals.create({
    user_id: userId,
    goalMl,
    startDate,
    endDate,
  });
  return newGoal;
  } catch (error) {
    console.error('Error adding hydration goal:', error);
    throw error;
  }
};

export const deleteHydrationGoalRespository = async (userId, goalId) => {
  try {
    const deletedGoal = await hydration_goals.destroy({
    where: {
      user_id: userId,
      id: goalId,
    },
  });
  return deletedGoal;
  } catch (error) {
    console.error('Error deleting hydration goal:', error);
    throw error;
  }
};

export const getHydrationGoalRespository = async (userId) => {
  try {
    const goals = await hydration_goals.findAll({
    where: {
      user_id: userId,
    },
  });
  return goals;
  } catch (error) {
    console.error('Error getting hydration goals:', error);
    throw error;
  }
};

export const updateHydrationGoalRespository = async (userId, goalId, goalMl, startDate, endDate) => {
  try {
    const updatedGoal = await hydration_goals.update(
    {
      goalMl,
      startDate,
      endDate,
    },
    {
      where: {
        user_id: userId,
        id: goalId,
      },
    }
  );
  return updatedGoal;
  } catch (error) {
    console.error('Error updating hydration goal:', error);
    throw error;
  }
};

