// Carregar o último agendamento
async function carregarUltimoAgendamento() {
  try {
    const response = await fetch("http://localhost:3002/ultimo");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const agendamento = await response.json();

    const formatarData = (dataISO) => {
      const [ano, mes, dia] = dataISO.split("-");
      return `${dia}-${mes}-${ano}`;
    };

    document.getElementById("nomeCliente").textContent =
      agendamento.nomeCliente;
    document.getElementById("dataAgen").textContent = formatarData(
      agendamento.dataAgen
    );
    document.getElementById("horaAgen").textContent = agendamento.horaAgen;

    document
      .getElementById("atualizarAgendamento")
      .addEventListener("click", () => {
        window.location.href = "atualizar.html";
        atualizarAgendamento(agendamento.id);
      });
    document
      .getElementById("deletarAgendamento")
      .addEventListener("click", () => deletarAgendamento(agendamento.id));
  } catch (error) {
    console.error("Erro ao carregar agendamento:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarUltimoAgendamento);

//Deletar o último agendamento
async function deletarUltimoAgendamento() {
  try {
    const response = await fetch("http://localhost:3002/ultimo");
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar o último agendamento: ${response.statusText}`
      );
    }

    const ultimoAgendamento = await response.json();
    const id = ultimoAgendamento.id;

    if (!id) {
      alert("Nenhum agendamento encontrado para deletar.");
      return;
    }

    const confirmacao = confirm(`Tem certeza de que deseja deletar?`);
    if (!confirmacao) return;

    const deleteResponse = await fetch(
      `http://localhost:3002/agendamentos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!deleteResponse.ok) {
      throw new Error(
        `Erro ao deletar o agendamento: ${deleteResponse.statusText}`
      );
    }

    const result = await deleteResponse.json();
    alert(result.message);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Erro ao deletar o último agendamento:", error);
    alert("Ocorreu um erro ao tentar deletar o último agendamento.");
  }
}

document
  .getElementById("deletarAgendamento")
  .addEventListener("click", deletarUltimoAgendamento);
