import { logs } from "../Utils/logs.js";

import { createUserRepository, getUserRepository, updateUserRepository, deleteUserRepository } from "../Repositories/user.Repository.js";

export const createUserController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const {
      user_age,
      gender,
      activity_level,
      climate,
      user_weight,
      user_height,
      wake_up_time,
      sleep_time
    } = req.body;

     const user = req.user;
    const  user_id = user.user_id;

    const newUser = await createUserRepository(user_id, user_age, gender, activity_level, climate, user_weight, user_height, wake_up_time, sleep_time);

    level = 'info';
    msg = `User created with ID: ${newUser.id}`;

    res.status(201).json({
      message: 'User created successfully',
      newUser,
    });
  } catch (err) {
    level = 'error';
    msg = `Error creating user: ${err.message}`;
    if (err.message.includes("invalid input value for enum")) {
      const field = err.message.match(/enum_(\w+)_/);
      return res.status(400).json({
        error: `Invalid value for ${field ? field[1] : 'an enum field'}.`
      });
    }
    else {
      res.status(400).json({ error: err.message });
    }
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const getUserController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
         const user = req.user;
    const  user_id = user.user_id;

    const User = await getUserRepository(user_id);

    level = 'info';
    msg = 'User retrieved successfully';

    if(!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      User,
    });
  } catch (err) {
    level = 'error';
    msg = `Error retrieving user: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};

export const updateUserController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const {
      activity_level,
      climate,
      wake_up_time,
      sleep_time,
      user_height,
      user_weight
    } = req.body;

         const user = req.user;
    const  user_id = user.user_id;

    const updatedUser = await updateUserRepository(user_id, activity_level, climate, wake_up_time, sleep_time, user_height, user_weight);

    level = 'info';
    msg = `User updated with ID: ${updatedUser.user_id}`;

    res.status(200).json({
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (err) {
    level = 'error';
    msg = `Error updating user: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};


export const deleteUserController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
         const user = req.user;
    const  user_id = user.user_id;

    const deletedUser = await deleteUserRepository(user_id);

    level = 'info';
    msg = `User deleted with ID: ${deletedUser.id}`;

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    level = 'error';
    msg = `Error deleting user: ${err.message}`;
    res.status(404).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};