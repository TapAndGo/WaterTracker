import express from "express";
import { createDrinkController , getAllDrinksController, getDrinkByIdController, deleteDrinkController, updateDrinkController } from "../Controllers/drinks.Controller.js";

const router = express.Router();

router.post("/create", createDrinkController);
router.get("/all", getAllDrinksController);
router.get("/get/:id", getDrinkByIdController);
router.put("/update/:id", updateDrinkController);
router.delete("/delete/:id", deleteDrinkController);

export default router;