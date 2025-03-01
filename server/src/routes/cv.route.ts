import express from 'express';
import cvController from '../controllers/cv.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/', verifyToken, cvController.getMyCV );

router.post('/create', verifyToken, cvController.createCV );

router.post('/edit/:cvId', verifyToken, cvController.createCV );

router.delete('/:cvId', verifyToken, cvController.deleteCV );

export default router;