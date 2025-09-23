import { createDrinkRepository , getAllDrinksRepository, getDrinkByIdRepository, deleteDrinkRepository, updateDrinkRepository } from "../Repositories/drinks.Repository.js";

export const createDrinkController = async (req, res) => {
  try {
    const drinkData = req.body;
    const newDrink = await createDrinkRepository(drinkData);
    res.status(201).json(newDrink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllDrinksController = async (req, res) => {
  try {
    const allDrinks = await getAllDrinksRepository();
    res.status(200).json(allDrinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getDrinkByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const drink = await getDrinkByIdRepository(id);
    if (!drink) {
      return res.status(404).json({ error: 'Drink not found' });
    }
    res.status(200).json(drink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateDrinkController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedDrink = await updateDrinkRepository(id, updatedData);
    res.status(200).json(updatedDrink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteDrinkController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDrink = await deleteDrinkRepository(id);
    if (!deletedDrink) {
      return res.status(404).json({ error: 'Drink not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}