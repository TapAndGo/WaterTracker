import { logs } from "../Utils/logs.js";

import { createUserRepository , getUserRepository , updateUserRepository , deleteUserRepository } from "../Repositories/user.Repository.js";

export const createUserController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;

  try {
    const {
      user_id,
      user_age,
      gender,
      activity_level,
      climate
    } = req.body;

    const newUser = await createUserRepository(user_id, user_age, gender, activity_level, climate);

    level = 'info';
    msg = `User created with ID: ${newUser.id}`;

    res.status(201).json({
      message: 'User created successfully',
      newUser,
    });
  } catch (err) {
    level = 'error';
    msg = `Error creating user: ${err.message}`;
    res.status(400).json({ error: err.message });
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
    const { user_id } = req.params;

    const user = await getUserRepository(user_id);

    level = 'info';
    msg = 'User retrieved successfully';

    res.status(200).json({
      message: 'User retrieved successfully',
      user,
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
      user_id,
      user_age,
      gender,
      activity_level,
      climate
    } = req.body;

    const updatedUser = await updateUserRepository(user_id, user_age, gender, activity_level, climate);

    level = 'info';
    msg = `User updated with ID: ${updatedUser.id}`;

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
    const { user_id } = req.body;

    const deletedUser = await deleteUserRepository(user_id);

    level = 'info';
    msg = `User deleted with ID: ${deletedUser.id}`;

    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser,
    });
  } catch (err) {
    level = 'error';
    msg = `Error deleting user: ${err.message}`;
    res.status(400).json({ error: err.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
};