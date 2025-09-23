import express from "express";
import { createDrinkController , getAllDrinksController, getDrinkByIdController, deleteDrinkController, updateDrinkController } from "../Controllers/drinks.Controller.js";

const router = express.Router();

router.post("/drinks", createDrinkController);
router.get("/drinks", getAllDrinksController);
router.get("/drinks/:id", getDrinkByIdController);
router.put("/drinks/:id", updateDrinkController);
router.delete("/drinks/:id", deleteDrinkController);

export default router;