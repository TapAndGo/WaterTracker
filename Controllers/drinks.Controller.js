import { createDrinkRepository, getAllDrinksRepository, getDrinkByIdRepository, deleteDrinkRepository, updateDrinkRepository } from "../Repositories/drinks.Repository.js";
import { logs } from "../Utils/logs.js";

export const createDrinkController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const {name , hydrationPct} = req.body;
    const newDrink = await createDrinkRepository({name , hydrationPct});
    level = 'info';
    msg = `Drink created with ID: ${newDrink.id}`;
    res.status(201).json(newDrink);
  } catch (error) {
    level = 'error';
    msg = `Error creating drink: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}

export const getAllDrinksController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const allDrinks = await getAllDrinksRepository();
    level = 'info';
    msg = `Retrieved ${allDrinks.length} drinks`;
    res.status(200).json(allDrinks);
  } catch (error) {
    level = 'error';
    msg = `Error retrieving drinks: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}


export const getDrinkByIdController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { id } = req.params;
    const drink = await getDrinkByIdRepository(id);
    if (!drink) {
      level = 'warn';
      msg = `Drink with ID: ${id} not found`;
      return res.status(404).json({ error: 'Drink not found' });
    }
    level = 'info';
    msg = `Retrieved drink with ID: ${id}`;
    res.status(200).json(drink);
  } catch (error) {
    level = 'error';
    msg = `Error retrieving drink: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}


export const updateDrinkController = async (req, res) => {
    const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { id } = req.params;
    const {name , hydrationPct} = req.body;
    const updatedDrink = await updateDrinkRepository(id, {name , hydrationPct});
    level = 'info';
    msg = `Updated drink with ID: ${id}`;
    res.status(200).json(updatedDrink);
  } catch (error) {
    level = 'error';
    msg = `Error updating drink: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
  }

export const deleteDrinkController = async (req, res) => {
  const startTime = process.hrtime.bigint();
  let level;
  let msg;
  try {
    const { id } = req.params;
    const deletedDrink = await deleteDrinkRepository(id);
    if (!deletedDrink) {
      level = 'warn';
      msg = `Drink with ID: ${id} not found`;
      return res.status(404).json({ error: 'Drink not found' });
    }else{
      level = 'info';
    msg = `Deleted drink with ID: ${id}`;
    res.status(200).json({ message: 'Drink deleted successfully' });
    }
    
  } catch (error) {
    level = 'error';
    msg = `Error deleting drink: ${error.message}`;
    res.status(500).json({ error: error.message });
  } finally {
    const endTime = process.hrtime.bigint();
    const durationMicroseconds = Number(endTime - startTime) / 1000;
    logs(durationMicroseconds, level, req.ip, req.method, msg, req.url, res.statusCode, req.headers["user-agent"]);
  }
}