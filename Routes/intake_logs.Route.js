import express from 'express';
import {createIntakeLogController, getIntakeLogsController , deleteIntakeLogController, updateIntakeLogController} from '../Controllers/intake_logs.Controller.js';

const router = express.Router();

router.post('/create', createIntakeLogController);
router.delete('/delete', deleteIntakeLogController);
router.put('/update', updateIntakeLogController);
router.get('/get/:user_id', getIntakeLogsController);

export default router;