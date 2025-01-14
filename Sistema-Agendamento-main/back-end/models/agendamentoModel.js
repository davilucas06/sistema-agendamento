import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addAgendamento = async (data) => {
  const agendamento = await prisma.agendamento.create({
    data,
  });
  return agendamento;
};

export const getAgendamentoPorId = async (id) => {
  try {
      const agendamento = await prisma.agendamento.findUnique({
          where: { id: parseInt(id) }, // Certifique-se de que o ID seja um número
      });
      return agendamento;
  } catch (error) {
      console.error('Erro ao buscar agendamento por ID:', error.message);
      throw error;
  }
};

export const getUltimoAgendamento = async () => {
  return await prisma.agendamento.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo ID em ordem decrescente
    },
  });
};

export const deleteAgendamento = async (id) => {
  return await prisma.agendamento.delete({
    where: { id: id },
  });
};

export const getSalaoPorNome = async (nomeSalao) => {
  return await prisma.salao.findFirst({
    where: {
      nomeSalao: {
        equals: nomeSalao,
        mode: 'insensitive',  // Faz a busca ser insensível a maiúsculas/minúsculas
      },
    },
  });
};

export const getServicoPorNome = async (nomeServico) => {
  return await prisma.servicos.findFirst({
    where: {
      tipoServico: {
        equals: nomeServico,
        mode: 'insensitive',  // Faz a busca ser insensível a maiúsculas/minúsculas
      },
    },
  });
};

export const atualizarAgendamento = async (id, data) => {
  if (!id) {
    throw new Error('Parâmetro id é obrigatório');
  }
  return await prisma.agendamento.update({
    where: { id: id },
    data: {
      nomeCliente: data.nomeCliente,
      dataAgen: data.dataAgen,
      horaAgen: data.horaAgen,
      idServico: data.idServico,
      idSalao: data.idSalao,
    },
  });
};