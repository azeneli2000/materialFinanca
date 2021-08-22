import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MesuesitListComponent } from "./mesuesit/mesuesit-list/mesuesit-list.component";
import { MesuesiLendaComponent } from "./mesuesi-lenda/mesuesi-lenda.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { MenuKryesoreComponent } from "./menu-kryesore/menu-kryesore.component";
import { AppComponent } from "./app.component";
import { NxenesitListComponent } from "./nxenesit/nxenesit-list/nxenesit-list.component";
import { NxenesiDetajeComponent } from "./nxenesit/nxenesi-detaje/nxenesi-detaje.component";
import { KonfigurimeComponent } from "./konfigurime/konfigurime.component";
import { MesuesitComponent } from "./mesuesit/mesuesit.component";
import { EskursioneComponent } from "./eskursione/eskursione.component";
import { PagesamesuesitComponent } from "./pagesamesuesit/pagesamesuesit.component";
import { ShpenzimeComponent } from "./shpenzime/shpenzime.component";
import { ArkaComponent } from "./arka/arka.component";
import { ArketimeComponent } from "./arketime/arketime.component";
import { BankatComponent } from "./bankat/bankat.component";
import { NxenesitListTransportiComponent } from "./nxenesit-list-transporti/nxenesit-list-transporti.component";
import { LibratComponent } from "./librat/librat.component";

const routes: Routes = [
  { path: "", redirectTo: "/fillimi", pathMatch: "full" },
  {
    path: "mesuesit",
    component: MesuesitListComponent,
    canActivate: [AuthGuard],
  },
  { path: "fillimi", component: MesuesitComponent, canActivate: [AuthGuard] },
  {
    path: "nxenesit",
    component: NxenesitListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nxenesittransporti",
    component: NxenesitListTransportiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "mesuesit/:$key",
    component: MesuesiLendaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "nxenesit/:$key",
    component: NxenesiDetajeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "konfigurime",
    component: KonfigurimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "eskursione",
    component: EskursioneComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pagesat",
    component: PagesamesuesitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "shpenzime",
    component: ShpenzimeComponent,
    canActivate: [AuthGuard],
  },
  { path: "arka", component: ArkaComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "arketime", component: ArketimeComponent },
  { path: "huate", component: BankatComponent },
  { path: "librat", component: LibratComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
