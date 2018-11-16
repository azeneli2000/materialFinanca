import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesuesitListComponent } from './mesuesit/mesuesit-list/mesuesit-list.component';

const routes: Routes = [{path : 'mesuesit',component : MesuesitListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
