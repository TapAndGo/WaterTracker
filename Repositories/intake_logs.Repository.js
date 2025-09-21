import intake_logs from "../Models/intake_logs.Model.js";

export const createIntakeLogRepository = async (userId, volumeMl, hydrationPct, effectiveMl) => {
  try {
    return await intake_logs.create({ user_id: userId, volumeMl, hydrationPct, effectiveMl });
  } catch (error) {
    console.error('Error creating intake log:', error);
    throw error;
  }
};

export const getIntakeLogsRepository = async (userId) => {
  try {
    return await intake_logs.findAll({ where: { user_id: userId } });
  } catch (error) {
    console.error('Error getting intake logs:', error);
    throw error;
  }
};

export const deleteIntakeLogRepository = async (userId, logId) => {
  try {
    return await intake_logs.destroy({ where: { user_id: userId, id: logId } });
  } catch (error) {
    console.error('Error deleting intake log:', error);
    throw error;
  }
};

export const updateIntakeLogRepository = async (userId, logId, volumeMl, hydrationPct, effectiveMl) => {
  try {
    return await intake_logs.update(
      { volumeMl, hydrationPct, effectiveMl },
      { where: { user_id: userId, id: logId } }
    );
  } catch (error) {
    console.error('Error updating intake log:', error);
    throw error;
  }
};
