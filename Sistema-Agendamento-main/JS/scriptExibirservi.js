const servicosContainer = document.getElementById("servicosContainer");

async function carregarServicos() {
  try {
    const response = await fetch("http://localhost:3002/servicos");
    const servicos = await response.json();

    servicos.forEach((servico) => {
      const divServico = document.createElement("div");
      divServico.classList.add("servico");

      const descricao = document.createElement("div");
      descricao.textContent = servico.tipoServico;

      const escolherButton = document.createElement("button");
      escolherButton.textContent = "Escolher";
      escolherButton.onclick = () => selecionarServico(servico.id);

      divServico.appendChild(descricao);
      divServico.appendChild(escolherButton);
      servicosContainer.appendChild(divServico);
    });
  } catch (error) {
    console.error("Erro ao carregar serviços:", error);
  }
}

function selecionarServico(idServico) {
  localStorage.setItem("idServicoSelecionado", idServico);
  alert("Serviço selecionado! Preencha os dados abaixo.");
}

document
  .getElementById("dadosClienteForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeCliente = document.getElementById("nome").value;
    const dataAgen = document.getElementById("data").value;
    const horaAgen = document.getElementById("hora").value;

    const idServicoSelecionado = localStorage.getItem("idServicoSelecionado");
    if (!idServicoSelecionado) {
      alert("Selecione um serviço antes de continuar!");
      return;
    }

    const agendamento = {
      nomeCliente,
      dataAgen,
      horaAgen,
      idServico: idServicoSelecionado,
    };

    localStorage.setItem("agendamento", JSON.stringify(agendamento));
    window.location.href = "saloes.html";
  });

document.addEventListener("DOMContentLoaded", carregarServicos);
