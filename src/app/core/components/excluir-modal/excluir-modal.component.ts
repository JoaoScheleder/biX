import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-modal',
  templateUrl: './excluir-modal.component.html',
  styleUrls: ['./excluir-modal.component.scss']
})
export class ExcluirModalComponent{

  constructor(public dialogRef : MatDialogRef<any>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

