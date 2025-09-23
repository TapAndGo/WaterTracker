import drinks from "../Models/drinks.Model.js";

export const createDrinkRepository = async (drinkData) => {
  try {
    const newDrink = await drinks.create(drinkData);
    return newDrink;
  } catch (error) {
    throw error;
  }
};

export const getAllDrinksRepository = async () => {
  try {
    const allDrinks = await drinks.findAll();
    return allDrinks;
  } catch (error) {
    throw error;
  }
};

export const getDrinkByIdRepository = async (id) => {
  try {
    const drink = await drinks.findByPk(id);
    return drink;
  } catch (error) {
    throw error;
  }
};  

export const updateDrinkRepository = async (id, updatedData) => {
  try {
    const drink = await drinks.findByPk(id);
    if (!drink) {
      throw new Error('Drink not found');
    }
    await drink.update(updatedData);
    return drink;
  } catch (error) {
    throw error;
  }
};  

export const deleteDrinkRepository = async (id) => {
  try {
    const drink = await drinks.destroy({ where: { id } });
    return drink;
  } catch (error) {
    throw error;
  }
};