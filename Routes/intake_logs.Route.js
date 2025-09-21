import express from 'express';
import {createIntakeLogController, getIntakeLogsController , deleteIntakeLogController, updateIntakeLogController} from '../Controllers/intake_logs.Controller.js';

const router = express.Router();

router.post('/create', createIntakeLogController);
router.post('/delete', deleteIntakeLogController);
router.put('/update', updateIntakeLogController);
router.get('/get', getIntakeLogsController);

export default router;