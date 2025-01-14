import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const obterServicos = async (req, res) => {
  try {
    const servicos = await prisma.servicos.findMany();
    res.status(200).json(servicos);
  } catch (error) {
    console.error("Erro ao buscar os serviços:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export { obterServicos };


