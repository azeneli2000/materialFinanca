import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesuesitListComponent } from './mesuesit/mesuesit-list/mesuesit-list.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MenuKryesoreComponent } from './menu-kryesore/menu-kryesore.component';
import { AppComponent } from './app.component';
import { NxenesitListComponent } from './nxenesit/nxenesit-list/nxenesit-list.component';
import { NxenesiDetajeComponent } from './nxenesit/nxenesi-detaje/nxenesi-detaje.component';
import { KonfigurimeComponent } from './konfigurime/konfigurime.component';
import { MesuesitComponent } from './mesuesit/mesuesit.component';
import { EskursioneComponent } from './eskursione/eskursione.component';
import { PagesamesuesitComponent } from './pagesamesuesit/pagesamesuesit.component';


const routes: Routes = [
  { path: '', redirectTo: '/fillimi', pathMatch: 'full' },
  {path : 'mesuesit',component : MesuesitListComponent,canActivate : [AuthGuard]},
{path : 'fillimi',component : MesuesitComponent,canActivate : [AuthGuard]},
{path : 'nxenesit',component : NxenesitListComponent,canActivate : [AuthGuard]},
{path : 'mesuesit/:$key',component : MesuesiLendaComponent,canActivate : [AuthGuard]},
{path : 'nxenesit/:$key',component : NxenesiDetajeComponent,canActivate : [AuthGuard]},
{path : 'konfigurime',component : KonfigurimeComponent,canActivate : [AuthGuard]},
{path : 'eskursione',component : EskursioneComponent,canActivate : [AuthGuard]},
{path : 'pagesat',component : PagesamesuesitComponent,canActivate : [AuthGuard]},


{path : 'login',component : LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
