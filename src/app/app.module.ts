import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
import { MatToolbarModule, MatButtonModule, MatIconModule, MatListModule,  MatPaginatorIntl,MatCardModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    LoginComponent
    
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
    AngularFireAuthModule
  ],
  providers: [MesuesiService,AuthGuard, {provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl()}],
  bootstrap: [AppComponent],
  entryComponents:[MesuesiComponent,ConfirmDialogComponent,LendaComponent]
})
export class AppModule { }
