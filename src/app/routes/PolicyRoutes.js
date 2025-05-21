import express from 'express';
import { getPolicyCountByUser } from '../controllers/PolicyController.js';

const router = express.Router();

router.get('/policy/stats-by-user', getPolicyCountByUser);

export default router;
