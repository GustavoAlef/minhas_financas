class Lancamento {
    constructor(id, mes, categoria, tipo, valor) {
        this.id = id;
        this.mes = mes;
        
        if (tipo !== "receita" && tipo !== "despesa") {
            throw new Error(
                "lançamento inválido: Tipo deve ser receita ou despesa"
            );
        }

        if (categoria === "") {
            throw new Error("lançamento inválido: A Categoria é obrigatória");
        }

        if (valor <= 0) {
            throw new Error(
                "lançamento inválido: Valor deve ser maior que zero"
            );
        }

        this.categoria = categoria;
        this.tipo = tipo;
        this.valor = valor;
    }
}

module.exports = Lancamento;
