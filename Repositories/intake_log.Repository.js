import { IntakeLog } from "../Models/index.js";

export const addIntakeLogRepository = async (intakeLog) => {
  try {
    const newIntakeLog = await IntakeLog.create(intakeLog);
    return newIntakeLog;
  } catch (error) {
    throw error;
  }
};

export const getIntakeLogRepository = async (user_id) => {
  try {
    const intakeLogs = await IntakeLog.findAll({ where: { user_id } });
    return intakeLogs;
  } catch (error) {
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

