// janeiro
const janeiro = new Mes("janeiro");
janeiro.adicionarLancamento(new Lancamento("Salario", "receita", 3000));
janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000));
janeiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
janeiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
janeiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
janeiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 300));
janeiro.adicionarLancamento(new Lancamento("Lazer", "despesa", 300));
janeiro.adicionarLancamento(new Lancamento("Alimentacao", "despesa", 500));
janeiro.adicionarLancamento(new Lancamento("Condominio", "despesa", 300));

// fevereiro
const fevereiro = new Mes("fevereiro");
fevereiro.adicionarLancamento(new Lancamento("Salario", "receita", 3000));
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
fevereiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 250));
fevereiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
fevereiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
fevereiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 500));
fevereiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));
fevereiro.adicionarLancamento(new Lancamento("Condomínio", "despesa", 400));

// marco
const marco = new Mes("marco");
marco.adicionarLancamento(new Lancamento("Salario", "receita", 4000));
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
marco.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
marco.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
marco.adicionarLancamento(new Lancamento("Internet", "despesa", 200));
marco.adicionarLancamento(new Lancamento("Transporte", "despesa", 500));
marco.adicionarLancamento(new Lancamento("Lazer", "despesa", 800));
marco.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));
marco.adicionarLancamento(new Lancamento("Condomínio", "despesa", 400));

const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
ano.calcularSaldo();

console.log(janeiro);
console.log(fevereiro);
console.log(marco);

function addElement(parent, elementType, text) {
  const element = document.createElement(elementType);
  if (text !== "" && text !== undefined && text !== null){
      element.innerText = text;
  }
  parent.appendChild(element);
}

function renderizar() {
  const tela = document.getElementById("app");
  if (tela.firstChild) {
    tela.firstChild.remove();
  }

  const painel = document.createElement('div');

  for (const mes of ano.meses) {
    addElement(painel, "h3", mes.nome);
    for (const lancamento of mes.lancamentos) {
      const detalhesLancamento = lancamento.categoria + " " + lancamento.valor;

      addElement(painel, "p", detalhesLancamento);
    }

    const saldoDoMes = "Saldo: " + mes.totalizadorDoMes.saldo;
    addElement(painel, "h4", saldoDoMes);
    addElement(painel, 'hr');
}

tela.appendChild(painel);
}

renderizar();

function adicionarLancamento() {
    const mes = document.getElementById('mes').value;
    const categoriaLancamento = document.getElementById('categoria').value;
    const tipoLancamento = document.getElementById('tipo').value;
    const valorLancamento = document.getElementById('valor').value;
    
    ano.adicionarLancamento(
        mes,
        new Lancamento(categoriaLancamento, tipoLancamento, parseFloat(valorLancamento))
    );
    
    ano.calcularSaldo();
    renderizar();
    
    document.getElementById('mes').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('valor').value = '';
}

const botao = document.getElementById('botao');
botao.addEventListener('click', adicionarLancamento)