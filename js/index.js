// Inicialização
if (!localStorage.getItem("estoque")) {
  localStorage.setItem("estoque", JSON.stringify([]));
}
if (!localStorage.getItem("vendas")) {
  localStorage.setItem("vendas", JSON.stringify([]));
}

// Função para abrir e fechar pop-ups
function abrirPopup(id) {
  document.getElementById(id).style.display = "block";
}

function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
}

// Função para incluir trufa
function incluirTrufa() {
  const sabor = document.getElementById("sabor").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);

  if (sabor && quantidade && valor) {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    const index = estoque.findIndex(item => item.sabor === sabor);

    if (index > -1) {
      // Atualizar quantidade no estoque
      estoque[index].quantidade += quantidade;
    } else {
      // Adicionar novo sabor
      estoque.push({ sabor, quantidade, valor });
    }

    localStorage.setItem("estoque", JSON.stringify(estoque));
    alert("Trufa incluída com sucesso!");
    fecharPopup("incluirPopup");
  } else {
    alert("Preencha todos os campos!");
  }
}

// Função para registrar venda
function venderTrufa() {
  const sabor = document.getElementById("saborVender").value;
  const quantidade = parseInt(document.getElementById("quantidadeVender").value);
  const comprador = document.getElementById("comprador").value;

  if (sabor && quantidade && comprador) {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    let vendas = JSON.parse(localStorage.getItem("vendas"));

    const index = estoque.findIndex(item => item.sabor === sabor);

    if (index > -1 && estoque[index].quantidade >= quantidade) {
      // Atualizar estoque
      estoque[index].quantidade -= quantidade;

      // Registrar venda
      vendas.push({
        sabor,
        quantidade,
        comprador,
        data: new Date().toISOString(),
        valorUnitario: estoque[index].valor,
      });

      localStorage.setItem("estoque", JSON.stringify(estoque));
      localStorage.setItem("vendas", JSON.stringify(vendas));

      alert("Venda registrada com sucesso!");
      fecharPopup("venderPopup");
    } else {
      alert("Estoque insuficiente ou sabor não encontrado!");
    }
  } else {
    alert("Preencha todos os campos!");
  }
}

// Função para exibir estoque atual
function mostrarEstoqueAtual() {
  const estoque = JSON.parse(localStorage.getItem("estoque"));
  let detalhes = "<h3>Estoque Atual:</h3>";

  if (estoque.length > 0) {
    estoque.forEach(item => {
      detalhes += `<p>${item.sabor}: ${item.quantidade} unidades (R$ ${item.valor.toFixed(2)} cada)</p>`;
    });
  } else {
    detalhes += "<p>Nenhuma trufa no estoque.</p>";
  }

  document.getElementById("estoqueDetalhes").innerHTML = detalhes;
}

// Função para exibir vendas dos últimos 15 dias
function mostrarVendas15Dias() {
  const vendas = JSON.parse(localStorage.getItem("vendas"));
  const quinzeDiasAtras = new Date();
  quinzeDiasAtras.setDate(quinzeDiasAtras.getDate() - 15);

  const vendasRecentes = vendas.filter(venda => new Date(venda.data) >= quinzeDiasAtras);

  const quantidade = vendasRecentes.reduce((sum, venda) => sum + venda.quantidade, 0);
  const valorTotal = vendasRecentes.reduce((sum, venda) => sum + venda.quantidade * venda.valorUnitario, 0);

  let detalhes = `<h3>Vendas Últimos 15 Dias:</h3>
                  <p>Quantidade: ${quantidade}</p>
                  <p>Valor Total: R$ ${valorTotal.toFixed(2)}</p>`;

  document.getElementById("estoqueDetalhes").innerHTML = detalhes;
}
