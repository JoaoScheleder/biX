export class Produto{
    produto_id! : number
    produto_nome! : string
    produto_preco_custo! : number
    produto_preco_venda! : number
    produto_quantidade! : number
    produto_datacadastrado! : string

    constructor(produto_id : number, produto_nome: string, produto_preco_custo : number, produto_preco_venda : number,produto_quantidade : number){
        this.produto_id = produto_id
        this.produto_nome = produto_nome
        this.produto_preco_custo = produto_preco_custo
        this.produto_preco_venda = produto_preco_venda
        this.produto_quantidade = produto_quantidade
        this.produto_datacadastrado = new Date().getDate().toString()
    }

}