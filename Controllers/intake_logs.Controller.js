import { createIntakeLogRepository, getIntakeLogsRepository, deleteIntakeLogRepository, updateIntakeLogRepository } from "../Repositories/intake_logs.Repository.js";
import { logs } from "../Utils/logs.js";

export const createIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { user_id, volumeMl, hydrationPct, effectiveMl } = req.body;
    const newLog = await createIntakeLogRepository(user_id, volumeMl, hydrationPct, effectiveMl);
    level = 'info';
    msg = `Intake log created with ID: ${newLog.id}`;
    res.status(201).json(newLog);
  } catch (error) {
    level = 'error';
    msg = `Error creating intake log: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const getIntakeLogsController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { user_id } = req.params;
    const logs = await getIntakeLogsRepository(user_id);
    level = 'info';
    msg = `Retrieved ${logs.length} intake logs`;
    res.status(200).json(logs);
  } catch (error) {
    level = 'error';
    msg = `Error retrieving intake logs: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const deleteIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { user_id, logId } = req.body;
    const deletedLog = await deleteIntakeLogRepository(user_id, logId);
    level = 'info';
    msg = `Intake log deleted with ID: ${logId}`;
    res.status(200).json(msg);
  } catch (error) {
    level = 'error';
    msg = `Error deleting intake log: ${error.message}`;
    res.status(400).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const updateIntakeLogController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { user_id, logId, volumeMl, hydrationPct, effectiveMl } = req.body;
    const updatedLog = await updateIntakeLogRepository(user_id, logId, volumeMl, hydrationPct, effectiveMl);

    if (updatedLog[0] === 0) {
      level = 'info';
      msg = `Intake log not found or not updated`;
      res.status(404).json({ error: 'Intake log not found' });
    } else {
      level = 'info';
      msg = `Intake log updated with ID: ${logId}`;
      res.status(200).json(updatedLog);
    }

  } catch (error) {
    level = 'error';
    msg = `Error updating intake log: ${error.message}`;
    res.status(500).json({ error: 'Failed to update intake log' });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};