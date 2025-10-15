import {CustomCup} from "../Models/index.js";

export const createCustomCupRepository = async (user_id, name, size, unit) => {
  try {
    const newCustomCup = await CustomCup.create({
      user_id,
      name,
      size,
      unit
    });
    return newCustomCup;
  } catch (error) {
    throw error;
  }
};

export const getCustomCupsRepository = async (user_id) => {
  try {
    const customCups = await CustomCup.findAll({ where: { user_id } });
    return customCups;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomCupRepository = async (id) => {
  try {
    const deleted = await CustomCup.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    throw error;
  }
};

export const updateCustomCupRepository = async (id, updates) => {
  try {
    const [updated] = await CustomCup.update(updates, { where: { id } });
    return updated;
  } catch (error) {
    throw error;
  }
};

