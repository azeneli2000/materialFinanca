import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
 //import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MesuesitComponent } from './mesuesit/mesuesit.component';
import { MesuesiComponent } from './mesuesit/mesuesi/mesuesi.component';

// material components
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule,  MatPaginatorIntl,MatCardModule,} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import{MesuesiService} from '../app/shared/mesuesi.service';
import { MenuKryesoreComponent } from './menu-kryesore/menu-kryesore.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MesuesitListComponent } from './mesuesit/mesuesit-list/mesuesit-list.component';
import { getDutchPaginatorIntl } from './paginator-shqip';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MesuesiLendaComponent } from './mesuesi-lenda/mesuesi-lenda.component';
import { LendaComponent } from './lenda/lenda.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { NxenesitListComponent } from './nxenesit/nxenesit-list/nxenesit-list.component';
import { NxenesiComponent } from './nxenesit/nxenesi/nxenesi.component';
import { NxenesiDetajeComponent } from './nxenesit/nxenesi-detaje/nxenesi-detaje.component';
import { KonfigurimeComponent } from './konfigurime/konfigurime.component';
import { EskursioneComponent } from './eskursione/eskursione.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PagesamesuesitComponent } from './pagesamesuesit/pagesamesuesit.component';
import { PagashteseComponent } from './pagesamesuesit/pagashtese/pagashtese.component';
import { ShpenzimeComponent } from './shpenzime/shpenzime.component';
import { ArkaComponent } from './arka/arka.component';
//import { ExcelService } from './services/excel.service';

import { ExcelService } from './shared/excel.service';
import { XchnageComponent } from './arka/xchnage/xchnage.component';
import { ArketimeComponent } from './arketime/arketime.component';
import { BankatComponent } from './bankat/bankat.component';
import { PagesebankaComponent } from './pagesebanka/pagesebanka.component';
import { NxenesitListTransportiComponent } from './nxenesit-list-transporti/nxenesit-list-transporti.component';
import { LibratComponent } from './librat/librat.component';
import { LibriRiComponent } from './libri-ri/libri-ri.component';
import { LibratNxenesiComponent } from './librat-nxenesi/librat-nxenesi.component';
import { ShtepiteBotueseComponent } from './shtepite-botuese/shtepite-botuese.component';
import { PagesaShtepiteBotueseComponent } from './pagesa-shtepite-botuese/pagesa-shtepite-botuese.component';

@NgModule({
  declarations: [
    AppComponent,
    MesuesitComponent,
    MesuesiComponent,
    MenuKryesoreComponent,
    MesuesitListComponent,
    ConfirmDialogComponent,
    MesuesiLendaComponent,
    LendaComponent,
    LoginComponent,
    NxenesitListComponent,
    NxenesiComponent,
    NxenesiDetajeComponent,
    KonfigurimeComponent,
    EskursioneComponent,
    PagesamesuesitComponent,
    PagashteseComponent,
    ShpenzimeComponent,
    ArkaComponent,
    XchnageComponent,
    ArketimeComponent,
    BankatComponent,
    PagesebankaComponent,
    NxenesitListTransportiComponent,
    LibratComponent,
    LibriRiComponent,
    LibratNxenesiComponent,
    ShtepiteBotueseComponent,
    PagesaShtepiteBotueseComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),   
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    AngularFireAuthModule,
    MatChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
     

   

  ],
  providers: [MesuesiService,AuthGuard, {provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl()},CurrencyPipe,DatePipe,ExcelService],
  bootstrap: [AppComponent],
  entryComponents:[MesuesiComponent,ConfirmDialogComponent,LendaComponent,NxenesiComponent,PagashteseComponent,XchnageComponent,PagesebankaComponent,LibriRiComponent,LibratNxenesiComponent]
})
export class AppModule { }
