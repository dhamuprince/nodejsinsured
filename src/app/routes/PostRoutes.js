import express from 'express';
import { PostMessage } from '../controllers/PostController.js';

const router = express.Router();

router.post('/schedule', PostMessage);

export default router;