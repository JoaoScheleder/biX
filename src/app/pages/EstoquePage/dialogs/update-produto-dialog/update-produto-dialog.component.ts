import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstoqueComponent } from '../../estoque/estoque.component';
import { Produto } from '../../model/Produto';

@Component({
  selector: 'app-update-produto-dialog',
  templateUrl: './update-produto-dialog.component.html',
  styleUrls: ['./update-produto-dialog.component.scss']
})
export class UpdateProdutoDialogComponent{

  dateFormCtrl! : FormControl
  dataDeCadastro! : Date
  constructor(@Inject(MAT_DIALOG_DATA) public data: Produto, private dateAdapter : DateAdapter<Date>,
  public dialogRef : MatDialogRef<EstoqueComponent>
  ) {
    let dia,mes,ano
    [dia,mes,ano] = this.data.produto_datacadastrado
                      .split("/")
                      .map((elemento)=> {return Number.parseInt(elemento)})
    
    
    this.dataDeCadastro = new Date(ano,mes-1,dia)
    this.dateAdapter.setLocale("pt-BR")
  }
  
  changeDate() : void {
    this.data.produto_datacadastrado = this.dataDeCadastro.toLocaleString().substr(0,10).split('/').reverse().join('-')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
