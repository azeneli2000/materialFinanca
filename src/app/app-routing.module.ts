import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesuesitListComponent } from './mesuesit/mesuesit-list/mesuesit-list.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';


const routes: Routes = [{path : 'mesuesit',component : MesuesitListComponent},
{path : 'mesuesit/:$key',component : MesuesiLendaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
