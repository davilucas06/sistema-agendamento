import {
  addAgendamento,
  getAgendamentoPorId,
  deleteAgendamento,
  getUltimoAgendamento,
  atualizarAgendamento,
  getSalaoPorNome,  
  getServicoPorNome 
} from "../models/agendamentoModel.js";

export const create = async (req, res) => {
  const { nomeCliente, dataAgen, horaAgen, preco, idServico, idSalao } =
    req.body;

  if (!nomeCliente || !dataAgen || !horaAgen || !idServico || !idSalao) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const newAgendamento = await addAgendamento({
      nomeCliente,
      dataAgen,
      horaAgen,
      idServico: parseInt(idServico, 10),
      idSalao: parseInt(idSalao, 10),
    });

    res.status(201).json(newAgendamento);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao criar agendamento. Tente novamente." });
  }
};

export const getAgendamentobyID = async (req, res) => {
  const id = req.params.id; 
  
  try {
    const agendamento = await getAgendamentoPorId(id);
  
    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ message: "Erro ao buscar agendamento", error });
  }
};

export const getUltimoAgendamentoController = async (req, res) => {
  try {
    const ultimoAgendamento = await getUltimoAgendamento();
    if (!ultimoAgendamento) {
      return res
        .status(404)
        .json({ message: "Nenhum agendamento encontrado." });
    }
    res.status(200).json(ultimoAgendamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o último agendamento." });
  }
};

export const deleteAgend = async (req, res) => {
  const { id } = req.params;

  try {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      return res
        .status(400)
        .send({ error: "ID inválido. Deve ser um número." });
    }
    await deleteAgendamento(idInt);
    res.status(200).send({ message: "Agendamento deletado com sucesso." });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateAgendamento = async (req, res) => {
  const { id } = req.params;
  const { nomeCliente, dataAgen, horaAgen, nomeServico, nomeSalao } = req.body;

  try {
    const agendamentoExistente = await getAgendamentoPorId(id);
    if (!agendamentoExistente) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    let idSalao = null;
    if (nomeSalao) {
      const salao = await getSalaoPorNome(nomeSalao);
      if (!salao) {
        return res.status(404).json({ message: 'Salão não encontrado.' });
      }
      idSalao = salao.id;
    }

    let idServico = null;
    if (nomeServico) {
      const servico = await getServicoPorNome(nomeServico);
      if (!servico) {
        return res.status(404).json({ message: 'Serviço não encontrado.' });
      }
      idServico = servico.id;
    }

    const dadosAtualizacao = {};
    if (nomeCliente) dadosAtualizacao.nomeCliente = nomeCliente;
    if (dataAgen) dadosAtualizacao.dataAgen = dataAgen;
    if (horaAgen) dadosAtualizacao.horaAgen = horaAgen;
    if (idServico) dadosAtualizacao.idServico = idServico;
    if (idSalao) dadosAtualizacao.idSalao = idSalao;

  

    const agendamentoAtualizado = await atualizarAgendamento(parseInt(id, 10), dadosAtualizacao);
 

    res.status(200).json({
      message: 'Agendamento atualizado com sucesso.',
      agendamento: agendamentoAtualizado,
    });
  } catch (error) {
    console.error('Erro ao atualizar o agendamento:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar o agendamento.' });
  }
};
