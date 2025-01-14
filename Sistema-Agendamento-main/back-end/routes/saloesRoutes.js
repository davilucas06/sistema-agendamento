import express from 'express';
import { getAllSaloes } from '../controllers/saloesController.js';

const router = express.Router();

router.get('/saloes', getAllSaloes);

export default router;
