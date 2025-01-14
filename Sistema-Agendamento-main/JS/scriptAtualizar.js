let idAgendamento;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    idAgendamento = new URLSearchParams(window.location.search).get("id");

    if (!idAgendamento) {
      const ultimoAgendamento = await obterUltimoAgendamento();
      idAgendamento = ultimoAgendamento;
    }

    if (!idAgendamento) {
      throw new Error("Não foi possível encontrar um agendamento para editar.");
    }

    await carregarServicos();
    await carregarSalaos();
    await carregarAgendamento(idAgendamento);
  } catch (error) {
    console.error("Erro durante a inicialização:", error);
  }

  document
    .getElementById("form-update")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!idAgendamento) {
        console.error(
          "ID do agendamento não encontrado. Não é possível atualizar."
        );
        return;
      }

      const nomeCliente = document.getElementById("nomeCliente").value;
      const dataAgen = document.getElementById("dataAgen").value;
      const horaAgen = document.getElementById("horaAgen").value;
      const nomeServico = document.getElementById("nomeServico").value;
      const nomeSalao = document.getElementById("nomeSalao").value;

      await atualizarAgendamento(
        idAgendamento,
        nomeCliente,
        dataAgen,
        horaAgen,
        nomeServico,
        nomeSalao
      );
    });
});

async function obterUltimoAgendamento() {
  try {
    const response = await fetch("http://localhost:3002/ultimo");
    if (!response.ok) throw new Error("Erro ao buscar o último agendamento.");

    const ultimoAgendamento = await response.json();
    return ultimoAgendamento.id;
  } catch (error) {
    console.error("Erro ao obter o último agendamento:", error.message);
    return null;
  }
}

async function carregarServicos() {
  try {
    const response = await fetch("http://localhost:3002/servicos");
    if (!response.ok) {
      console.error("Erro ao carregar serviços:", response.status);
      return;
    }

    const servicos = await response.json();

    const selectServico = document.getElementById("nomeServico");
    servicos.forEach((servico) => {
      const option = document.createElement("option");
      option.value = servico.tipoServico;
      option.textContent = servico.tipoServico;
      selectServico.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
  }
}

async function carregarSalaos() {
  try {
    const response = await fetch("http://localhost:3002/saloes");
    if (!response.ok) {
      console.error("Erro ao carregar salões:", response.status);
      return;
    }

    const saloes = await response.json();

    const selectSalao = document.getElementById("nomeSalao");
    saloes.forEach((salao) => {
      const option = document.createElement("option");
      option.value = salao.nomeSalao;
      option.textContent = salao.nomeSalao;
      selectSalao.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar salões:", error);
  }
}

async function carregarAgendamento(id) {
  try {
    const response = await fetch(`http://localhost:3002/atualizar/${id}`);
    if (!response.ok) {
      console.error("Erro ao carregar agendamento:", response.status);
      return;
    }

    const agendamento = await response.json();

    document.getElementById("nomeCliente").value =
      agendamento.nomeCliente || "";
    document.getElementById("dataAgen").value = agendamento.dataAgen || "";
    document.getElementById("horaAgen").value = agendamento.horaAgen || "";
    document.getElementById("nomeServico").value = agendamento.idServico || "";
    document.getElementById("nomeSalao").value = agendamento.idSalao || "";
  } catch (error) {
    console.error("Erro ao carregar agendamento:", error);
  }
}

async function atualizarAgendamento(event) {
  const nomeCliente = document.getElementById("nomeCliente").value;
  const dataAgen = document.getElementById("dataAgen").value;
  const horaAgen = document.getElementById("horaAgen").value;
  const nomeServico = document.getElementById("nomeServico").value;
  const nomeSalao = document.getElementById("nomeSalao").value;

  const id = await obterUltimoAgendamento();

  try {
    const response = await fetch(`http://localhost:3002/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeCliente,
        dataAgen,
        horaAgen,
        nomeServico,
        nomeSalao,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Agendamento atualizado com sucesso!");
    } else {
      alert(`Erro: ${result.message}`);
      console.error(result);
    }
  } catch (error) {
    console.error("Erro ao enviar a solicitação:", error);
    alert("Ocorreu um erro ao tentar atualizar o agendamento.");
  }
}
