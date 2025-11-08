import express from "express";
import { getIntakeLogController , addIntakeLogController } from "../Controllers/intake_log.Controller.js";
import { verifyToken } from "../Middlewares/jwt_token_verification.js";


const router = express.Router();

router.get('/', verifyToken, getIntakeLogController);
router.post('/' , verifyToken , addIntakeLogController)

export default router;