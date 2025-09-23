// routes/auth.routes.js
import express from 'express';
import { deleteHydrationGoalController, addHydrationGoalController , getHydrationGoalController, updateHydrationGoalController } from '../Controllers/hydration_goals.Controller.js';

const router = express.Router();

router.post('/add', addHydrationGoalController);
router.delete('/delete', deleteHydrationGoalController);
router.get('/get/:user_id', getHydrationGoalController);
router.put('/update', updateHydrationGoalController);


export default router;
