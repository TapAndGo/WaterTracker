// routes/auth.routes.js
import express from 'express';
import { deleteHydrationGoalController, addHydrationGoalController , getHydrationGoalController, updateHydrationGoalController } from '../Controllers/hydration_goals.Controller.js';
import { verifyToken}  from '../Middlewares/jwt_token_verification.js';
const router = express.Router();

router.post('/', verifyToken, addHydrationGoalController);
router.delete('/:id', verifyToken, deleteHydrationGoalController);
router.get('/', verifyToken, getHydrationGoalController);
router.put('/', verifyToken, updateHydrationGoalController);


export default router;
