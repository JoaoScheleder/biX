import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstoqueComponent } from '../../estoque/estoque.component';
import { Produto } from '../../model/Produto';

@Component({
  selector: 'app-create-produto-dialog',
  templateUrl: './create-produto-dialog.component.html',
  styleUrls: ['./create-produto-dialog.component.scss']
})
export class CreateProdutoDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Produto, private dateAdapter: DateAdapter<Date>,
  public dialogRef: MatDialogRef<EstoqueComponent>) {
  this.dateAdapter.setLocale("pt-BR")
}

onNoClick(): void {
  this.dialogRef.close();
}

}
