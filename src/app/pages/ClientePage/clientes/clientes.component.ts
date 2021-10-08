import { ClienteService } from './../service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/cliente';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog} from '@angular/material/dialog';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

import { ExcluirModalComponent } from 'src/app/core/components/excluir-modal/excluir-modal.component';
import { UpdateClienteDialogComponent } from '../dialogs/update-cliente-dialog/update-cliente-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateClienteDialogComponent } from '../dialogs/create-cliente-dialog/create-cliente-dialog.component';

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

  displayedColumns: string[] = ['Checkbox', 'Id', 'Nome', 'Telefone', 'Email', 'Cadastro', 'Opcoes'];
  arrayDeClientes: Cliente[] = []
  selection = new SelectionModel<Cliente>(true, []);
  dataSource!: MatTableDataSource<Cliente>;
  cliente!: Cliente
  filterFields = ['cliente_id','cliente_nome','cliente_telefone','cliente_email','cliente_datacadastrado']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;


  public chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "Clientes Cadastrados",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }
  };
  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getClientesData()
    this.getClientesMes()
  }

  getClientesMes(): void {
    this.clienteService.getClientesPorMes('2021').subscribe(dados => {

      let mesesDisponiveis = dados.data.map((element: { mes: string; }) => {
        return element.mes
      });
      let totalPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      dados.data.map((element: { total: number; mes_numero: number }) => {
        totalPorMes[element.mes_numero - 1] = element.total
      });

      this.chartOptions = {
        series: [
          {
            name: "Clientes Cadastrados",
            data: totalPorMes
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
          categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        }
      };
    })
  }

  getClientesData(): void {
    this.clienteService.getClientes().subscribe((result) => {
      this.arrayDeClientes = result.data
      this.dataSource = new MatTableDataSource<Cliente>(this.arrayDeClientes);
      console.log(this.arrayDeClientes)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  cadastrarCliente(): void {
    const dialogRef = this.dialog.open(CreateClienteDialogComponent, {
      width: '500px',
      data: {
        cliente_nome: '',
        cliente_email: '',
        cliente_telefone: '',
        cliente_datacadastrado: ''
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cliente = result;
      console.log(result)

      this.cliente.cliente_datacadastrado = result.cliente_datacadastrado.toLocaleString().substr(0, 10).split('/').reverse().join('-')

      this.clienteService.createCliente(this.cliente).subscribe((resultado) => {

        console.log("Cliente cadastrado com sucesso")
        this.getClientesData()
        this.getClientesMes()
        this.apresentarSnackBar("Cliente cadastrado", 2000, 'sucessSnackBar')

      },
        error => {
          this.apresentarSnackBar("Erro ao cadastrar", 2000, 'errorSnackBar')
        }
      )
    });
  }

  atualizarCliente(idCliente: number): void {

    let clienteParaAtualizar = this.arrayDeClientes.find((client) => { return client.cliente_id === idCliente })

    const dialogAtualizarRef = this.dialog.open(UpdateClienteDialogComponent, {
      data: {
        'cliente_nome': clienteParaAtualizar!.cliente_nome,
        'cliente_telefone': clienteParaAtualizar!.cliente_telefone,
        'cliente_email': clienteParaAtualizar!.cliente_email,
        'cliente_datacadastrado': clienteParaAtualizar!.cliente_datacadastrado
      }
    })


    dialogAtualizarRef.afterClosed().subscribe(result => {

      clienteParaAtualizar = result

      if (result && clienteParaAtualizar) {

        this.clienteService.updateCliente(clienteParaAtualizar, idCliente.toString()).subscribe(data => {

          this.getClientesData()
          this.getClientesMes()
          this.apresentarSnackBar("Cliente atualizado", 2000, 'sucessSnackBar')
        },
          error => {
            this.apresentarSnackBar("Erro ao atualizar", 2000, 'errorSnackBar')
          })
      }
    })
  }

  excluirCliente(idCliente: number): void {
    const dialogExcluirRef = this.dialog.open(ExcluirModalComponent)


    dialogExcluirRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(idCliente.toString()).subscribe(data => {

          console.log(data)
          this.getClientesData()
          this.getClientesMes()
          this.apresentarSnackBar("Cliente excluido", 2000, 'sucessSnackBar')

        },
          error => {
            this.apresentarSnackBar("Erro ao excluir", 2000, 'errorSnackBar')

          })
      }
    })
  }
  excluirMultiplos(selection: SelectionModel<Cliente>) {
    selection.selected.map((el, index) => {
      this.clienteService.deleteCliente(el.cliente_id!.toString()).subscribe(
        (data) => {
          if (index + 1 == selection.selected.length) {
            this.getClientesData()
            this.getClientesMes()
            selection.clear()
          }
        }, (error) => {
          this.apresentarSnackBar("Erro ao excluir", 2000, 'errorSnackBar')

        }
      )
    })
  }

  apresentarSnackBar(mensagem: string, duracao: number, className: string): void {
    this.snackBar.open(mensagem, "", {
      panelClass: className,
      duration: duracao
    })
  }

}




