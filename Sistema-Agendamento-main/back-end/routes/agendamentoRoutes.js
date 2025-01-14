import express from 'express'; 
const router = express.Router(); 

import { create, deleteAgend, getAgendamentobyID, getUltimoAgendamentoController, updateAgendamento } from '../controllers/agendamentoController.js'; 


router.post('/agendamentos', create); 
router.get('/agendamentos/:id', getAgendamentobyID);
router.get('/ultimo', getUltimoAgendamentoController);
router.delete('/agendamentos/:id', deleteAgend);
router.put('/atualizar/:id', updateAgendamento);
router.get('/atualizar/:id', updateAgendamento);

export default router; 
