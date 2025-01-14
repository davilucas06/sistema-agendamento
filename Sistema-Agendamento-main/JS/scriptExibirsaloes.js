const saloesContainer = document.getElementById("saloesContainer");

async function carregarSaloes() {
  try {
    const response = await fetch("http://localhost:3002/saloes");
    const saloes = await response.json();

    saloes.forEach((salao) => {
      const divSalao = document.createElement("div");
      divSalao.classList.add("salao");

      const nome = document.createElement("p");
      nome.textContent = salao.nomeSalao;

      const endereco = document.createElement("p");
      endereco.textContent = `Endereço: ${salao.endereco}`;

      const telefone = document.createElement("p");
      telefone.textContent = `Telefone: ${salao.telefone}`;

      const escolherButton = document.createElement("button");
      escolherButton.textContent = "Escolher";
      escolherButton.onclick = () => selecionarSalao(salao.id);

      divSalao.appendChild(nome);
      divSalao.appendChild(endereco);
      divSalao.appendChild(telefone);
      divSalao.appendChild(escolherButton);

      saloesContainer.appendChild(divSalao);
    });
  } catch (error) {
    console.error("Erro ao carregar salões:", error);
  }
}

function selecionarSalao(idSalao) {
  localStorage.setItem("idSalaoSelecionado", idSalao);
  alert('Salão selecionado! Clique em "Finalizar Agendamento".');
}

document
  .getElementById("finalizarAgendamento")
  .addEventListener("click", async () => {
    const agendamento = JSON.parse(localStorage.getItem("agendamento"));
    const idSalaoSelecionado = localStorage.getItem("idSalaoSelecionado");

    if (!agendamento || !idSalaoSelecionado) {
      alert("Dados incompletos! Verifique o serviço e o salão selecionados.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...agendamento,
          idSalao: idSalaoSelecionado,
        }),
      });

      if (response.ok) {
        alert("Agendamento realizado com sucesso!");
        localStorage.clear();
        window.location.href = "agendamento.html";
      } else {
        console.log(error);
        alert("Erro ao realizar agendamento.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  });

document.addEventListener("DOMContentLoaded", carregarSaloes);
