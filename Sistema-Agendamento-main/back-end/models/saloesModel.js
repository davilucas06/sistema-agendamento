import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listSalao = async () => {
  try {
    const saloes = await prisma.salao.findMany();
    return saloes; 
  } catch (error) {
    throw new Error(error.message); 
  }
};

