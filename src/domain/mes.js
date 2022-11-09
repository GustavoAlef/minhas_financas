class Mes {
  constructor(nome) {
    if (nome === "") throw new Error("Mes inválido: o nome é obrigatorio");

    this.nome = nome;
    this.saldoInicial = 0;
    this.totalizadorDoMes = {
      saldo: 0,
      juros: 0,
      rendimentos: 0,
      receitas: 0,
      despesas: 0,
      distribuicaoDeDespesas: [],
    };
    this.lancamentos = [];
  }

  arredondar(valor) {
    return Math.round(valor * 100) / 100;
  }

  adicionarLancamento(lancamento) {
    this.lancamentos.push(lancamento);
  }

  calcularSaldo() {

    this.totalizadorDoMes.saldo = this.saldoInicial;

    this.apurarReceitas();
    this.apurarDespesas();
    this.distribuirDespesas();
    this.apurarJuros();
    this.apurarRendimentos();
  }

  apurarReceitas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "receita") {
        this.totalizadorDoMes.saldo += lancamento.valor;
        this.totalizadorDoMes.receitas += lancamento.valor;
      }
    }
  }

  apurarDespesas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "despesa") {
        this.totalizadorDoMes.saldo -= lancamento.valor;
        this.totalizadorDoMes.despesas += lancamento.valor;
      }
    }
  }

  distribuirDespesas() {
    const distribuicaoDeDespesas = [];
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "despesa") {
        const percentual = this.arredondar(
          (lancamento.valor / this.totalizadorDoMes.despesas) * 100
        );
        distribuicaoDeDespesas.push({
          categoria: lancamento.categoria,
          percentual,
        });
      }
    }
    this.totalizadorDoMes.distribuicaoDeDespesas = distribuicaoDeDespesas;
  }

  apurarJuros() {
    if (this.totalizadorDoMes.saldo < 0) {
      this.totalizadorDoMes.juros = this.calcularJuros(
        this.totalizadorDoMes.saldo
      );
      this.totalizadorDoMes.saldo = this.arredondar(
        this.totalizadorDoMes.saldo + this.totalizadorDoMes.juros
      );
    }
  }

  apurarRendimentos() {
    if (this.totalizadorDoMes.saldo > 0) {
      this.totalizadorDoMes.rendimentos = this.calcularRendimentos(
        this.totalizadorDoMes.saldo
      );
      this.totalizadorDoMes.saldo = this.arredondar(
        this.totalizadorDoMes.saldo + this.totalizadorDoMes.rendimentos
      );
    }
  }

  calcularJuros(valor) {
    const juros = this.arredondar(valor * 0.1);
    return juros;
  }

  calcularRendimentos(valor) {
    const rendimentos = this.arredondar(valor * 0.005);
    return rendimentos;
  }
}
