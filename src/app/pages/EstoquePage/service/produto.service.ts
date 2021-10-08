import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/Produto';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  

  constructor(private http : HttpClient) { }

  
  
  
  getProdutos() : Observable<Produto[] | any>{
    return this.http.get<Produto[] | any>('http://localhost:3000/produtos')
  }

  updateProduto(produto : Produto , produtoID : string) : Observable<any> {
    return this.http.put(`http://localhost:3000/produtos/${produtoID}`,{
      'produto_nome' : produto.produto_nome,
      'produto_preco_custo' : produto.produto_preco_custo,
      'produto_preco_venda':  produto.produto_preco_venda,
      'produto_quantidade':  produto.produto_quantidade,
      'produto_datacadastrado' : produto.produto_datacadastrado
    })
  }

  createProduto(produto : Produto) : Observable<any> {
    return this.http.post('http://localhost:3000/produtos',{
      'produto_nome' : produto.produto_nome,
      'produto_preco_custo' : produto.produto_preco_custo,
      'produto_preco_venda':  produto.produto_preco_venda,
      'produto_quantidade':  produto.produto_quantidade,
      'produto_datacadastrado' : produto.produto_datacadastrado,
    })
  }
  deleteProduto(produtoID : string) : Observable<any> {
    return this.http.delete(`http://localhost:3000/produtos/${produtoID}`,{})
  }

  getProdutosPorMes(ano : string) : Observable<any> {
    return this.http.get<any>(`http://localhost:3000/produtos/produtosMes/${ano}`)
  }
}
