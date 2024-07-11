document.addEventListener("DOMContentLoaded", carregarTarefas);

function addtarefa() {
  const tarefaInput = document.getElementById('tarefa');
  const tarefa = tarefaInput.value;

  if (tarefa) {
    const tarefas = obterTarefas();
    tarefas.push({ texto: tarefa, status: 'Pendente', dataConclusao: null });
    salvarTarefas(tarefas);
    exibirTarefas();

    tarefaInput.value = '';
  }
}

function obterTarefas() {
  const tarefas = localStorage.getItem('tarefas');
  return tarefas ? JSON.parse(tarefas) : [];
}

function obterTarefasCompletadas() {
  const tarefasCompletadas = localStorage.getItem('tarefasCompletadas');
  return tarefasCompletadas ? JSON.parse(tarefasCompletadas) : [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function salvarTarefasCompletadas(tarefasCompletadas) {
  localStorage.setItem('tarefasCompletadas', JSON.stringify(tarefasCompletadas));
}

function exibirTarefas() {
  const tabela = document.getElementById('tarefa-lista');
  tabela.innerHTML = '';

  const tarefas = obterTarefas();
  const tarefasCompletadas = obterTarefasCompletadas();

  tarefas.forEach((tarefa, index) => {
    if (tarefa.status === 'Pendente') {
      const novaLinha = tabela.insertRow();

      const checkboxCell = novaLinha.insertCell(0);
      const tarefaCell = novaLinha.insertCell(1);
      const statusCell = novaLinha.insertCell(2);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          const dataConclusao = new Date().toLocaleString();
          tarefa.status = 'Completada';
          tarefa.dataConclusao = dataConclusao;
          tarefasCompletadas.push(tarefa);
          tarefas.splice(index, 1);
          salvarTarefas(tarefas);
          salvarTarefasCompletadas(tarefasCompletadas);
          exibirTarefas();
        }
      });

      checkboxCell.appendChild(checkbox);
      tarefaCell.textContent = tarefa.texto;
      statusCell.textContent = tarefa.status;
    }
  });

  const tabelaCompletadas = document.getElementById('tarefa-completadas-lista');
  tabelaCompletadas.innerHTML = '';

  tarefasCompletadas.forEach((tarefa) => {
    const novaLinha = tabelaCompletadas.insertRow();
    const tarefaCell = novaLinha.insertCell(0);
    const dataConclusaoCell = novaLinha.insertCell(1);

    tarefaCell.textContent = tarefa.texto;
    dataConclusaoCell.textContent = tarefa.dataConclusao;
  });
}

function carregarTarefas() {
  exibirTarefas();
}
