import express from "express";
import { createUserController , getUserController , updateUserController , deleteUserController } from "../Controllers/user.Controller.js";
import { verifyToken } from "../Middlewares/jwt_token_verification.js";

const router = express.Router();

router.post('/', verifyToken, createUserController);
router.get('/', verifyToken, getUserController);
router.put('/', verifyToken, updateUserController);
router.delete('/',  verifyToken, deleteUserController);

export default router;