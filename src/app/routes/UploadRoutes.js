import express from 'express';
import uploadFile from '../middlewares/upload.js';
import { fileUpload, policyInfoByUserName } from '../controllers/UploadController.js';

const router = express.Router();

router.post('/upload',uploadFile.single('file'), fileUpload);
router.get('/search', policyInfoByUserName);

export default router;