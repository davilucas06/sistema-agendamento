import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import agendamentoRoutes from './routes/agendamentoRoutes.js'; 
import servicosRoutes from './routes/servicoRoutes.js';
import saloesRoutes from './routes/saloesRoutes.js';

dotenv.config();

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.use('/', agendamentoRoutes); 
app.use('/', servicosRoutes);
app.use('/', saloesRoutes);

const PORT = process.env.PORT || 3002; 

app.listen(PORT, () => {
  console.log(`O servidor tá rodando 👍`);
});




