import { AgendamentosComponent } from './pages/AgendamentosPage/agendamentos/agendamentos.component';
import { EstoqueComponent } from './pages/EstoquePage/estoque/estoque.component';
import { VendasComponent } from './pages/VendasPage/vendas/vendas.component';
import { ClientesComponent } from './pages/ClientePage/clientes/clientes.component';
import { HomeComponent } from './pages/HomePage/home/home.component';
import { LoginComponent } from './pages/LoginPage/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path : "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate : [LoginGuard]
  },
  {
    path: "fortune",
    canActivate : [AuthGuard],
    canActivateChild : [AuthGuard],
    children: [
      {
        path : "",
        redirectTo : "fortune/dashboards",
        pathMatch : "full"
      },
      {
        path: "dashboard",
        component : HomeComponent
      },
      {
        path: "clientes",
        component : ClientesComponent
      },
      {
        path: "vendas",
        component : VendasComponent
      },
      {
        path: "estoque",
        component : EstoqueComponent
      },
      {
        path: "agendamentos",
        component : AgendamentosComponent
      }
    ]
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
