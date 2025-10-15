// routes/auth.routes.js
import express from 'express';
import {createCustomCupController , getCustomCupController , updateCustomCupController , deleteCustomCupController}  from '../Controllers/custom_cups.Repository.js';
import { verifyToken}  from '../Middlewares/jwt_token_verification.js';
const router = express.Router();

router.post('/add', verifyToken, createCustomCupController);
router.delete('/delete', verifyToken, deleteCustomCupController);
router.get('/get/:user_id', verifyToken, getCustomCupController);
router.put('/update', verifyToken, updateCustomCupController);


export default router;
