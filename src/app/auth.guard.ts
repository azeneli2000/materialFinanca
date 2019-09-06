import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationService } from './shared/notification.service';
import { LoginComponent } from './login/login.component';
import {take,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private  as:AuthService, private router : Router,private dialog :MatDialog, private notification : NotificationService){}
  
  
   canActivate() : boolean {

 

   if(JSON.parse(localStorage.getItem('user'))!=null)
    {
      console.log('authenticated');
    let u = JSON.parse(localStorage.getItem('user'));
   
      return true;
    }else 
    {
    

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent,dialogConfig);

    console.log('not authenticated');
    return false;

    }

    }
  }
