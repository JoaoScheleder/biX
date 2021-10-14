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

  updateCliente(cliente : Cliente , clienteID : string) : Observable<any> {
    return this.http.put(`http://localhost:3000/clientes/${clienteID}`,{
      'cliente_nome' : cliente.cliente_nome,
      'cliente_telefone' : cliente.cliente_telefone,
      'cliente_email':  cliente.cliente_email,
      'cliente_datacadastrado' : cliente.cliente_datacadastrado
    })
  }

  createCliente(cliente : Cliente) : Observable<any> {
    return this.http.post('http://localhost:3000/clientes',{
      'cliente_nome' : cliente.cliente_nome,
      'cliente_telefone' : cliente.cliente_telefone,
      'cliente_email':  cliente.cliente_email,
      'cliente_datacadastrado' : cliente.cliente_datacadastrado,
    })
  }

  deleteCliente(clienteID : string) : Observable<any> {
    return this.http.delete(`http://localhost:3000/clientes/${clienteID}`,{})
  }


  getClientesPorMes(ano : string) : Observable<any> {
    return this.http.get<any>('http://localhost:3000/clientes/clientesMes/2021')
  }
  

}
