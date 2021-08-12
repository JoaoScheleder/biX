export class Cliente{
    id_cliente! : number
    cliente_nome! : string
    cliente_telefone! : string
    cliente_datacadastrado! : string
    cliente_vinho? : string

    constructor(id_cliente : number, cliente_nome: string, cliente_telefone : string, cliente_vinho? : string){
        this.id_cliente = id_cliente
        this.cliente_nome = cliente_nome
        this.cliente_telefone = cliente_telefone
        this.cliente_datacadastrado = new Date().getDate().toString()
        this.cliente_vinho =  cliente_vinho
    }

}