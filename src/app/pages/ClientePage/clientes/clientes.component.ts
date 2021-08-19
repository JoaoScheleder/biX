import { ClienteService } from './../service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { SelectionModel } from '@angular/cdk/collections';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  
  displayedColumns: string[] = ['Checkbox','id' ,'nome','telefone','cadastro','opcoes'];
  arrayDeClientes : Cliente[] = []
  selection = new SelectionModel<Cliente>(true, []);
  dataSource! : MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public chartOptions!: Partial<ChartOptions> | any;
  constructor(private clienteService : ClienteService) {

    this.chartOptions = {
      series: [
        {
          name: "Clientes Cadastrados",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 650,
        type: "bar"
      },
      title: {
        text: "Novos Clientes"
      },
      xaxis: {
        categories: ["Jan", "Fev",  "Mar",  "Abr",  "Mai",  "Jun",  "Jul",  "Ago", "Set"]
      }
    };

  }

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

