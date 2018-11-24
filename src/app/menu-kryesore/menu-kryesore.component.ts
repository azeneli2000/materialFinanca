import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

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

  constructor(private breakpointObserver: BreakpointObserver,private auth :AuthService , private router : Router ,private ag :AuthGuard,private dialog :MatDialog) {}
    aut = this.auth.authState;
    name ;
  ngOnInit() {
    this.name = this.auth.currentUser;
    console.log(this.name);
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
}


