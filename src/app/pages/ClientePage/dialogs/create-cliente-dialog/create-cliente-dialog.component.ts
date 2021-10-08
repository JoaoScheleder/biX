import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesComponent } from '../../clientes/clientes.component';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-create-cliente-dialog',
  templateUrl: './create-cliente-dialog.component.html',
  styleUrls: ['./create-cliente-dialog.component.scss']
})
export class CreateClienteDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente, private dateAdapter: DateAdapter<Date>,
    public dialogRef: MatDialogRef<ClientesComponent>
  ) {
    this.dateAdapter.setLocale("pt-BR")
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
