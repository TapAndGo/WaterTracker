import {user} from "../Models/index.js";

export const createUserRepository = async (user_id, user_age, gender, activity_level, climate , user_weight , user_height , wake_up_time , sleep_time) => {
  try {
    const newUser = await user.create({
    user_id,
    user_age,
    gender,
    activity_level,
    climate,
    user_weight,
    user_height,
    wake_up_time,
    sleep_time
  });
  return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUserRepository = async (user_id) => {
  try {
    const User = await user.findOne({ where: { user_id } });
    return User;
  } catch (error) {
    throw error;
  }
};

export const updateUserRepository = async (user_id, activity_level, climate, wake_up_time, sleep_time, user_height, user_weight) => {
  try {
    const updates = {
      activity_level,
      climate,
      wake_up_time,
      sleep_time,
      user_height,
      user_weight
    };

    // Update user
    const [updated] = await user.update(updates, {
      where: { user_id },
    });

    if (!updated) {
      throw new Error("User not found or no changes made");
    }

    // Fetch and return the updated record
    const updatedUser = await user.findOne({ where: { user_id } });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};


export const deleteUserRepository = async (user_id) => {
  try {
    const deleted = await user.destroy({ where: { user_id } });
    if(!deleted){
      throw new Error("User not found");
    }
    return deleted;
  } catch (error) {
    throw error;
  }
};



