import { ClienteService } from './../service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  arrayDeClientes : Cliente[] = []
  selection = new SelectionModel<Cliente>(true, []);
  displayedColumns: string[] = ['Checkbox','id' ,'nome','telefone','cadastro','vinho','opcoes'];
  dataSource! : MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteService : ClienteService) {}

  ngOnInit(){
    
    this.clienteService.getClientes().subscribe((result)=>{
      this.arrayDeClientes = result.data
      this.dataSource = new MatTableDataSource<Cliente>(this.arrayDeClientes);
      console.log(this.arrayDeClientes)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() : boolean{

    const numSelected = this.selection.selected.length;
    const numRows = this.arrayDeClientes.length
    return numSelected === numRows;
  }
 
  masterToggle() : void{
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
 
    this.selection.select(...this.arrayDeClientes);
  }
 
  checkboxLabel(row?: any): string {
    
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idPais as number + 1}`;
  }
 
}

