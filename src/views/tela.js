class Tela {
    constructor() {
        // janeiro
        const janeiro = new Mes("janeiro");
        janeiro.adicionarLancamento(new Lancamento("Salario", "receita", 3000));
        janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000));
        janeiro.adicionarLancamento(
            new Lancamento("Conta de Luz", "despesa", 200)
        );
        janeiro.adicionarLancamento(
            new Lancamento("Conta de Água", "despesa", 100)
        );

        // fevereiro
        const fevereiro = new Mes("fevereiro");
        fevereiro.adicionarLancamento(
            new Lancamento("Salario", "receita", 9000)
        );
        fevereiro.adicionarLancamento(
            new Lancamento("Aluguel", "despesa", 1200)
        );
        fevereiro.adicionarLancamento(
            new Lancamento("Conta de Luz", "despesa", 250)
        );
        fevereiro.adicionarLancamento(
            new Lancamento("Conta de Água", "despesa", 100)
        );

        // marco
        const marco = new Mes("marco");
        marco.adicionarLancamento(new Lancamento("Salario", "receita", 4000));
        marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
        marco.adicionarLancamento(
            new Lancamento("Conta de Luz", "despesa", 200)
        );
        marco.adicionarLancamento(
            new Lancamento("Conta de Água", "despesa", 100)
        );

        const ano = new Ano();
        ano.adicionarMes(janeiro);
        ano.adicionarMes(fevereiro);
        ano.adicionarMes(marco);
        ano.calcularSaldo();
        this.ano = ano;

        console.log(janeiro);
        console.log(fevereiro);
        console.log(marco);
    }

    formatarDinheiro(valor){
        return new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency'}).format(valor);
      }

    adicionarLancamento() {
        const mes = document.getElementById("mes");
        const categoriaLancamento = document.getElementById("categoria");
        const tipoLancamento = document.getElementById("tipo");
        const valorLancamento = document.getElementById("valor");

        this.ano.adicionarLancamento(
            mes.value,
            new Lancamento(
                categoriaLancamento.value,
                tipoLancamento.value,
                parseFloat(valorLancamento.value)
            )
        );

        this.ano.calcularSaldo();
        this.renderizar();

        mes.value = this.ano.meses[0].nome;
        tipo.value = "receita";
        categoria.value = "";
        valor.value = "";
    }

    renderizar() {
        document.getElementById('app').remove();
        const app = new Div("app");

        const titulo = new h4("Minhas Finanças ");
        app.adicionarElementoFilho(titulo.element);

        const form = new Div("form-lancamento");
        const mesSelect = new Select("mes");
        for (const mes of this.ano.meses) {
            mesSelect.addOption(mes.nome);
        }

        const tipoSelect = new Select("tipo");
        tipoSelect.addOption("receita");
        tipoSelect.addOption("despesa");

        const categoriaInputText = new Input("categoria", "text", "Categoria");
        const valorInputText = new Input("valor", "number", "Valor");
        const addButton = new Button("botao", "Adicionar");
        addButton.addListener(() => {
            this.adicionarLancamento();
        });

        form.adicionarElementoFilho(mesSelect.element);
        form.adicionarElementoFilho(tipoSelect.element);
        form.adicionarElementoFilho(categoriaInputText.element);
        form.adicionarElementoFilho(valorInputText.element);
        form.adicionarElementoFilho(addButton.element);

        app.adicionarElementoFilho(form.element);

        const grafico = new Grafico();
        for (const mes of this.ano.meses) {
            grafico.adicionarColuna(mes.totalizadorDoMes.saldo, mes.nome);
        }
        app.adicionarElementoFilho(grafico.element);

        for (const mes of this.ano.meses) {
            const nomeDoMes = new h4(mes.nome);
            app.adicionarElementoFilho(nomeDoMes.element);

            const tabelaLancamentos = new Tabela("tabela-lancamentos");
            tabelaLancamentos.addRow("th", ["Categoria", "Valor"]);
            for (const lancamento of mes.lancamentos) {
                tabelaLancamentos.addRow(
                    "td",
                    lancamento.categoria,
                    this.formatarDinheiro(lancamento.getValorString())
                );
            }

            tabelaLancamentos.addRow("th", [
                "Juros",
                this.formatarDinheiro(mes.totalizadorDoMes.juros),
            ]);
            tabelaLancamentos.addRow("th", [
                "Rendimentos",
                this.formatarDinheiro(mes.totalizadorDoMes.rendimentos),
            ]);
            tabelaLancamentos.addRow("th", [
                "Total",
                this.formatarDinheiro(mes.totalizadorDoMes.saldo),
            ]);
            app.adicionarElementoFilho(tabelaLancamentos.element);
        }

        const [body] = document.getElementsByTagName('body');
        body.appendChild(app.element);
    }
}
