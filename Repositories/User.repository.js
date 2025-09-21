// repositories/user.repository.js
import User from '../Models/hydration_goals.model.js';
import bcrypt from 'bcrypt';

/**
 * Create a new user with hashed password
 */
export const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ username, email, password: hashedPassword });
};

/**
 * Find user by username
 */
export const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
  return await User.findByPk(id);
};

/**
 * Validate password
 */
export const validatePassword = async (user, plainPassword) => {
  return await bcrypt.compare(plainPassword, user.password);
};
