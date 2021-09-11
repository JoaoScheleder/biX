import { ClienteService } from './../service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { SelectionModel } from '@angular/cdk/collections';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {

  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DateAdapter } from '@angular/material/core';
import { ExcluirModalComponent } from 'src/app/core/components/excluir-modal/excluir-modal.component';

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
  
  displayedColumns: string[] = ['Checkbox','id' ,'nome','telefone','email','cadastro','opcoes'];
  arrayDeClientes : Cliente[] = []
  selection = new SelectionModel<Cliente>(true, []);
  dataSource! : MatTableDataSource<Cliente>;
  cliente! : Cliente

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table! : MatTable<any>;


  public chartOptions!: Partial<ChartOptions> | any;
  constructor(private clienteService : ClienteService , public dialog: MatDialog) {

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
    this.getClientesData()
  }


  getClientesData() : void { 
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

  cadastrarCliente() : void{
    const dialogRef = this.dialog.open(CreateClienteDialog, {
      width: '500px',
      data: {
        cliente_nome: '',
        cliente_email: '',
        cliente_telefone: '',
        cliente_datacadastrado : ''
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cliente = result;
      this.cliente.cliente_datacadastrado = result.cliente_datacadastrado.toLocaleString().substr(0,10).split('/').reverse().join('-')
      console.log(this.cliente)

      this.clienteService.createCliente(this.cliente).subscribe((resultado)=>{

        console.log("Cliente cadastrado com sucesso")
        this.getClientesData()
        console.log(this.table)

      }
      )
    });
  }


  excluirCliente(idCliente: number) : void {
    const dialogExcluirRef = this.dialog.open(ExcluirModalComponent)


    dialogExcluirRef.afterClosed().subscribe(result =>{
      if(result){
        this.clienteService.deleteCliente(idCliente.toString()).subscribe(data => {
         
          this.getClientesData()
          
        },
        error =>{
            console.log(error)
        })
      }
    })
  }
}

@Component({
  selector: 'create-cliente-dialog',
  templateUrl: '../dialogs/createCliente-dialog.html'
})
export class CreateClienteDialog {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente, private dateAdapter : DateAdapter<Date>,
  public dialogRef : MatDialogRef<ClientesComponent>
  ) {

    this.dateAdapter.setLocale("pt-BR")

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
