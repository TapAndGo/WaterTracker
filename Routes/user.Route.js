import express from "express";
import { createUserController , getUserController , updateUserController , deleteUserController } from "../Controllers/user.Controller.js";
import { verifyToken } from "../Middlewares/jwt_token_verification.js";

const router = express.Router();

router.post('/onboard', createUserController);
router.get('/get/:user_id', getUserController);
router.put('/update', updateUserController);
router.delete('/delete', deleteUserController);

export default router;