import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  getClientes() : Observable<Cliente[] | any> {
    return this.http.get<Cliente[] | any>('http://localhost:3000/clientes')
  }

  updateCliente() : any {
    // this.http.put('')
  }

  createCliente() : Observable<any> {
    return this.http.post('http://localhost:3000/clientes',{
      cliente_nome : "João",
      cliente_telefone : "442132131",
      cliente_datacadastrado : '2015-06-06',
      cliente_vinho : "Não"
    })
  }

  deleteCliente() : any {
    this.http.delete('')
  }

}
