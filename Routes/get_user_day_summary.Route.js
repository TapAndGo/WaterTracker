import {getUserDaySummaryController} from "../Controllers/get_user_day_summary.Controller.js";

import express from "express";
import { verifyToken } from "../Middlewares/jwt_token_verification.js";

const router = express.Router();

router.get('/:type', verifyToken, getUserDaySummaryController);

export default router;