import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/LoginPage/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './pages/HomePage/home/home.component';
import { NavbarComponent } from '../app/core/components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClientesComponent} from './pages/ClientePage/clientes/clientes.component';
import { VendasComponent } from './pages/VendasPage/vendas/vendas.component';
import { EstoqueComponent } from './pages/EstoquePage/estoque/estoque.component';
import { AgendamentosComponent } from './pages/AgendamentosPage/agendamentos/agendamentos.component'
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule }   from '@angular/forms';
import { ExcluirModalComponent } from './core/components/excluir-modal/excluir-modal.component';
import { UpdateClienteDialogComponent } from './pages/ClientePage/dialogs/update-cliente-dialog/update-cliente-dialog.component';
import { BixTableComponent } from './shared/bix-table/bix-table.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateProdutoDialogComponent } from './pages/EstoquePage/dialogs/update-produto-dialog/update-produto-dialog.component';
import { CreateProdutoDialogComponent } from './pages/EstoquePage/dialogs/create-produto-dialog/create-produto-dialog.component';
import { CreateClienteDialogComponent } from './pages/ClientePage/dialogs/create-cliente-dialog/create-cliente-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ClientesComponent,
    VendasComponent,
    EstoqueComponent,
    AgendamentosComponent,
    ExcluirModalComponent,
    UpdateClienteDialogComponent,
    BixTableComponent,
    UpdateProdutoDialogComponent,
    CreateProdutoDialogComponent,
    CreateClienteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    NgApexchartsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
