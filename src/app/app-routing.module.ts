import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesuesitListComponent } from './mesuesit/mesuesit-list/mesuesit-list.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MenuKryesoreComponent } from './menu-kryesore/menu-kryesore.component';
import { AppComponent } from './app.component';


const routes: Routes = [{path : 'mesuesit',component : MesuesitListComponent,canActivate : [AuthGuard]},
{path : 'mesuesit/:$key',component : MesuesiLendaComponent,canActivate : [AuthGuard]},
{path : 'login',component : LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
