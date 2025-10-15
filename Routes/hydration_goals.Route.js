// routes/auth.routes.js
import express from 'express';
import { deleteHydrationGoalController, addHydrationGoalController , getHydrationGoalController, updateHydrationGoalController } from '../Controllers/hydration_goals.Controller.js';
import { verifyToken}  from '../Middlewares/jwt_token_verification.js';
const router = express.Router();

router.post('/add', verifyToken, addHydrationGoalController);
router.delete('/delete', verifyToken, deleteHydrationGoalController);
router.get('/get/:user_id', verifyToken, getHydrationGoalController);
router.put('/update', verifyToken, updateHydrationGoalController);


export default router;
