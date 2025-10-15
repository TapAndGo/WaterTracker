import { logs } from "../Utils/logs.js";
import { createCustomCupRepository, getCustomCupsRepository, updateCustomCupRepository, deleteCustomCupRepository } from "../Repositories/custom_cups.Repository.js";

export const createCustomCupController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { name, size, unit } = req.body;

    const user = req.user;
    const user_id = user.id;

    const newCustomCup = await createCustomCupRepository(user_id, name, size, unit);

    level = 'info';
    msg = `New Custom Cup created with ID: ${newCustomCup.id}`;
    res.status(201).json({
      message: 'Custom Cup created successfully',
      goal: newGoal,
    });
  } catch (err) {
    level = 'error';
    msg = `Error creating custom cup: ${err.message}`;
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

export const getCustomCupController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { user_id } = req.params;

    const customCups = await getCustomCupsRepository(user_id);

    level = 'info';
    msg = 'Custom Cups retrieved successfully';

    res.status(200).json({
      message: 'Custom Cups retrieved successfully',
      customCups,
    });
  } catch (err) {
    level = 'error';
    msg = `Error retrieving custom cups: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const updateCustomCupController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { customCupId , name, size, unit } = req.body;


    const updatedCustomCup = await updateCustomCupRepository(customCupId , {
      name,
      size,
      unit
    });

    level = 'info';
    msg = `Custom Cup updated with ID: ${customCupId}`;

    res.status(200).json({
      message: 'Custom Cup updated successfully',
      updatedCustomCup,
    });
  } catch (err) {
    level = 'error';
    msg = `Error updating custom cup: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const deleteCustomCupController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const { customCupId } = req.body;

    const deletedCustomCup = await deleteCustomCupRepository(customCupId);

    level = 'info';
    msg = `Custom Cup deleted with ID: ${customCupId}`;

    res.status(200).json({
      message: 'Custom Cup deleted successfully',
      deletedCustomCup,
    });
  } catch (err) {
    level = 'error';
    msg = `Error deleting custom cup: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};