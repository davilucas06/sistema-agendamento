import { listSalao } from '../models/saloesModel.js';

export const getAllSaloes = async (req, res) => {
  try {
    const saloes = await listSalao(); 
    res.status(200).json(saloes); 
  } catch (error) {
    console.error('Erro ao buscar os salões:', error.message); 
    res.status(500).json({ error: 'Erro ao buscar os salões' }); 
  }
};
