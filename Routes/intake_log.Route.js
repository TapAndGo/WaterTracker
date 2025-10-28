import express from "express";
import { getIntakeLogController } from "../Controllers/intake_log.Controller.js";
import { verifyToken } from "../Middlewares/jwt_token_verification.js";

const router = express.Router();

router.get('/', verifyToken, getIntakeLogController);

export default router;