import {user} from "../Models/index.js";

export const createUserRepository = async (user_id, user_age, gender, activity_level, climate) => {
  try {
    const newUser = await user.create({
    user_id,
    user_age,
    gender,
    activity_level,
    climate
  });
  return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUserRepository = async (user_id) => {
  try {
    const user = await user.findOne({ where: { user_id } });
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserRepository = async (user_id, updates) => {
  try {
    const [updated] = await user.update(updates, { where: { user_id } });
    return updated;
  } catch (error) {
    throw error;
  }
};

export const deleteUserRepository = async (user_id) => {
  try {
    const deleted = await user.destroy({ where: { user_id } });
    return deleted;
  } catch (error) {
    throw error;
  }
};



