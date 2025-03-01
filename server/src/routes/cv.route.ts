import express from 'express';
import cvController from '../controllers/cv.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/', verifyToken, cvController.getMyCV );

router.post('/', verifyToken, cvController.createCV );

router.put('/:cvId', verifyToken, cvController.createCV );

router.delete('/:cvId', verifyToken, cvController.deleteCV );

export default router;