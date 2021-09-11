export class Cliente{
    cliente_id! : number
    cliente_nome! : string
    cliente_telefone! : string
    cliente_email! : string
    cliente_datacadastrado! : string

    constructor(cliente_id : number, cliente_nome: string, cliente_telefone : string, cliente_email : string){
        this.cliente_id = cliente_id
        this.cliente_nome = cliente_nome
        this.cliente_telefone = cliente_telefone
        this.cliente_email = cliente_email
        this.cliente_datacadastrado = new Date().getDate().toString()
    }

}