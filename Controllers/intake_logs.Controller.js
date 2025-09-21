import { createIntakeLogRepository , getIntakeLogsRepository, deleteIntakeLogRepository, updateIntakeLogRepository } from "../Repositories/intake_logs.Repository.js";

export const createIntakeLogController = async (req, res) => {
  try {
    const { user_id, volumeMl, hydrationPct, effectiveMl } = req.body;
    const newLog = await createIntakeLogRepository(user_id, volumeMl, hydrationPct, effectiveMl);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating intake log:', error);
    res.status(500).json({ error: 'Failed to create intake log' });
  }
};

export const getIntakeLogsController = async (req, res) => {
  try {
    const { user_id } = req.body;
    const logs = await getIntakeLogsRepository(user_id);
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error getting intake logs:', error);
    res.status(500).json({ error: 'Failed to get intake logs' });
  }
};

export const deleteIntakeLogController = async (req, res) => {
  try {
    const { user_id, logId } = req.body;
    await deleteIntakeLogRepository(user_id, logId);
    res.status(200).json({ message: 'Intake log deleted successfully' });
  } catch (error) {
    console.error('Error deleting intake log:', error);
    res.status(500).json({ error: 'Failed to delete intake log' });
  }
};

export const updateIntakeLogController = async (req, res) => {
  try {
    const { user_id, logId, volumeMl, hydrationPct, effectiveMl } = req.body;
    const updatedLog = await updateIntakeLogRepository(user_id, logId, volumeMl, hydrationPct, effectiveMl);
    res.status(200).json(updatedLog);
  } catch (error) {
    console.error('Error updating intake log:', error);
    res.status(500).json({ error: 'Failed to update intake log' });
  }
};