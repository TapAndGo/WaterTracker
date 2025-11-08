import { hydration_goals } from "../Models/index.js";


export const addHydrationGoalRepository = async (data) => {
  try {
    const {
      user_id,
      goalMl,
      startDate,
      endDate,
    } = data;

    const newGoal = await hydration_goals.create({
      user_id,
      goalMl,
      startDate,
      endDate,
    });

    return newGoal;
  } catch (error) {
    console.error("❌ Error adding hydration goal:", error);
    throw error;
  }
};


export const deleteHydrationGoalRepository = async (user_id, goalId) => {
  try {
    const deletedGoal = await hydration_goals.destroy({
      where: { user_id, id: goalId },
    });

    if (!deletedGoal) {
      throw new Error("Hydration goal not found");
    }

    return deletedGoal;
  } catch (error) {
    console.error("❌ Error deleting hydration goal:", error);
    throw error;
  }
};


export const getHydrationGoalRepository = async (user_id) => {
  try {
    const goals = await hydration_goals.findAll({ where: { user_id } });
    return goals;
  } catch (error) {
    console.error("❌ Error fetching hydration goals:", error);
    throw error;
  }
};


export const updateHydrationGoalRepository = async (user_id, goalId, updates , transaction) => {
  try {
    const [updated] = await hydration_goals.update(updates, {
      where: { user_id, id: goalId },
    } , {transaction} );

    if (updated === 0) {
      throw new Error("Hydration goal not found or not updated");
    }

    const updatedGoal = await hydration_goals.findOne({
      where: { user_id, id: goalId },
    });

    return updatedGoal;
  } catch (error) {
    console.error("❌ Error updating hydration goal:", error);
    throw error;
  }
};

