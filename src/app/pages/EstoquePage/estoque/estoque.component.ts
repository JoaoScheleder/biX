import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { ExcluirModalComponent } from 'src/app/core/components/excluir-modal/excluir-modal.component';
import { CreateProdutoDialogComponent } from '../dialogs/create-produto-dialog/create-produto-dialog.component';
import { UpdateProdutoDialogComponent } from '../dialogs/update-produto-dialog/update-produto-dialog.component';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  displayedColumns: string[] = ['Checkbox','Id' ,'Nome','Preço de custo','Preço de venda','Quantidade','Data de cadastro','Opcoes'];
  arrayDeProdutos : Produto[] = []
  selection = new SelectionModel<Produto>(true, []);
  dataSource! : MatTableDataSource<Produto>;
  produto! : Produto

  filterFields = ['produto_id','produto_nome','produto_preco_custo','produto_preco_venda','produto_quantidade','produto_datacadastrado']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;


  public chartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "Produtos Cadastrados",
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
      }
    ],
    chart: {
      height: 650,
      type: "bar"
    },
    title: {
      text: "Novos Produtos"
    },
    xaxis: {
      categories: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    }
  };
  constructor(private produtoService : ProdutoService , public dialog: MatDialog ,private snackBar: MatSnackBar) {}

  ngOnInit(){
    this.getProdutosData()
    //this.getProdutosMes()
  }
  
  getProdutosMes() : void{
    this.produtoService.getProdutosPorMes('2021').subscribe(dados =>{

      let mesesDisponiveis = dados.data.map((element: { mes: string; }) => {
        return element.mes
      });
      let totalPorMes = [0,0,0,0,0,0,0,0,0,0,0,0]
      dados.data.map((element: { total: number; mes_numero : number }) => {
        totalPorMes[element.mes_numero-1] = element.total
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
          categories: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
        }
      };
    })
  }

  getProdutosData() : void { 
    this.produtoService.getProdutos().subscribe((result)=>{
      this.arrayDeProdutos = result.data
      this.dataSource = new MatTableDataSource<Produto>(this.arrayDeProdutos);
      console.log(this.arrayDeProdutos)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  

  cadastrarProduto() : void{
    const dialogRef = this.dialog.open(CreateProdutoDialogComponent, {
      width: '500px',
      data: {
        'produto_nome': '',
        'produto_preco_custo': '',
        'produto_preco_venda': '',
        'produto_quantidade': '',
        'produto_datacadastrado': ''
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      this.produto = result;

      this.produto.produto_datacadastrado = result.produto_datacadastrado.toLocaleString().substr(0,10).split('/').reverse().join('-')

      this.produtoService.createProduto(this.produto).subscribe((resultado)=>{

        this.getProdutosData()
        this.getProdutosMes()
      }
      )
    });
  }

   atualizarProduto(idProduto: number) : void {

    let produtoParaAtualizar = this.arrayDeProdutos.find((produto)=>{return produto.produto_id === idProduto})

    const dialogAtualizarRef = this.dialog.open(UpdateProdutoDialogComponent,{
      data : {
        'produto_nome' : produtoParaAtualizar!.produto_nome,
        'produto_preco_custo': produtoParaAtualizar!.produto_preco_custo,
        'produto_preco_venda':  produtoParaAtualizar!.produto_preco_venda,
        'produto_quantidade':  produtoParaAtualizar!.produto_quantidade,
        'produto_datacadastrado' : produtoParaAtualizar!.produto_datacadastrado
      }
    })


    dialogAtualizarRef.afterClosed().subscribe(result =>{

      produtoParaAtualizar = result

      if(result && produtoParaAtualizar){

        this.produtoService.updateProduto(produtoParaAtualizar,idProduto.toString()).subscribe(data => {
         
          this.getProdutosData()
          this.getProdutosMes()
        },
        error =>{
            console.log(error)
        })
      }
    })
  }

  excluirProduto(idProduto: number) : void{
    const dialogExcluirRef = this.dialog.open(ExcluirModalComponent)


    dialogExcluirRef.afterClosed().subscribe(result =>{
      if(result){
        this.produtoService.deleteProduto(idProduto.toString()).subscribe(data => {
          
          console.log(data)
          this.getProdutosData()
          this.getProdutosMes()
          this.apresentarSnackBar("Erro ao excluir", 2000, 'errorSnackBar')

        },
        error =>{
          this.apresentarSnackBar("Erro ao excluir", 2000, 'errorSnackBar')

        })
      }
    })
  }


  excluirMultiplos(selection: SelectionModel<Produto>) {
    selection.selected.map((el, index) => {
      this.produtoService.deleteProduto(el.produto_id!.toString()).subscribe(
        (data) => {
          if (index + 1 == selection.selected.length) {
            this.getProdutosData()
            this.getProdutosMes()
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
