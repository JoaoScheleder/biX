import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bix-table',
  templateUrl: './bix-table.component.html',
  styleUrls: ['./bix-table.component.scss']
})
export class BixTableComponent implements OnInit {

  @Input() arrayDeDados!     : any[]
  @Input() displayedColumns!     : any[]
  @Input() filterFields!     : string[]
  @Input() dataSource!     : MatTableDataSource<any>
  
  @Output() eventoAtualizar = new EventEmitter<number>();
  @Output() eventoExcluir = new EventEmitter<number>();
  @Output() eventoCadastrar = new EventEmitter();
  @Output() eventoExcluirMultiplos = new EventEmitter<SelectionModel<any>>();

  selection = new SelectionModel<any>(true, []);
  loopColumns! : string[]
  constructor() { }

  ngOnInit(): void {
    this.loopColumns = this.displayedColumns.map(el => el)
    this.loopColumns.pop()
    this.loopColumns.shift()
  }


  atualizar(id : number){
    this.eventoAtualizar.emit(id)
  }
  excluir(id : number){
    this.eventoExcluir.emit(id)
  }
  cadastrar(){
    this.eventoCadastrar.emit()
  }
  excluirMultiplos(){
    this.eventoExcluirMultiplos.emit(this.selection)
  }


  isAllSelected() : boolean{

    const numSelected = this.selection.selected.length;
    const numRows = this.arrayDeDados.length
    return numSelected === numRows;
  }
 
  masterToggle() : void{
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
 
    this.selection.select(...this.arrayDeDados);
  }
 
  checkboxLabel(row?: any): string {
    
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idPais as number + 1}`;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
