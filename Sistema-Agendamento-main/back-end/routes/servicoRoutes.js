// routes/servicosRoutes.js
import express from 'express';
import { obterServicos } from '../controllers/servicoController.js';

const router = express.Router();

router.get('/servicos', obterServicos);

export default router;
