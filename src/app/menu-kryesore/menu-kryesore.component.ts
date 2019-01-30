import { Component,OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { NxenesiService } from '../shared/nxenesi.service';
import { VitiService } from '../shared/viti.service';

@Component({
  selector: 'app-menu-kryesore',
  templateUrl: './menu-kryesore.component.html',
  styleUrls: ['./menu-kryesore.component.css'],
})
export class MenuKryesoreComponent  implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    vitiShkollor = [ {value :'2019-2020'},{value :"2020-2021"},{value :"2021-2022"},{value :"2022-2023"},{value :"2023-2024"},{value :"2024-2025"},{value :"2025-2026"},{value :"2026-2027"}];
vz ;
    vitiZgjedhur;
    vitiFillestar;
  constructor(private breakpointObserver: BreakpointObserver,private auth :AuthService , private router : Router ,private ag :AuthGuard,private dialog :MatDialog, private _viti : VitiService) {}
    aut = this.auth.authState;
    name ;
    mobile : boolean = false;
  ngOnInit() {
    if(window.innerWidth < 400)
    {
      this.mobile = true;
   
    }
    else
    {
      this.mobile = false;
    
    
  }

    this.name = this.auth.currentUser;
    console.log(this.name);
    this.vitiFillestar= localStorage.getItem('VitiShkollor');
  }
  logout(){
   this.auth.signOut();
  }
 
  
  login(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent,dialogConfig);
  }


  onChangeViti(v){
    this.vitiZgjedhur = v.value;
    localStorage.setItem('VitiShkollor',this.vitiZgjedhur);
    this._viti.dergoMsg(this.vitiZgjedhur);
 }
}


