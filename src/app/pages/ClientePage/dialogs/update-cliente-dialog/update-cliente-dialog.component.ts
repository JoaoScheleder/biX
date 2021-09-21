import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesComponent } from '../../clientes/clientes.component';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-update-cliente-dialog',
  templateUrl: './update-cliente-dialog.component.html',
  styleUrls: ['./update-cliente-dialog.component.scss']
})
export class UpdateClienteDialogComponent{

  dateFormCtrl! : FormControl
  dataDeCadastro! : Date
  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente, private dateAdapter : DateAdapter<Date>,
  public dialogRef : MatDialogRef<ClientesComponent>
  ) {
    let dia,mes,ano
    [dia,mes,ano] = this.data.cliente_datacadastrado
                      .split("/")
                      .map((elemento)=> {return Number.parseInt(elemento)})
    
    
    this.dataDeCadastro = new Date(ano,mes-1,dia)
    this.dateAdapter.setLocale("pt-BR")
  }
  
  changeDate() : void {
    this.data.cliente_datacadastrado = this.dataDeCadastro.toLocaleString().substr(0,10).split('/').reverse().join('-')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
