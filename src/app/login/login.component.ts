import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from "@angular/router"
import { AuthService } from '../shared/auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {MatDialogRef} from '@angular/material';
import { NotificationService } from '../shared/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private router : Router,private dialogRef : MatDialogRef<LoginComponent>,private notification : NotificationService) { }

  email  = "shkollanr1@gmail.com";
  
  password = "zenelzeneli";

  error: {name: string, message: string} = {name: '', message: ''};
  login() {
    this.auth.loginWithEmail(this.email,this.password)
    .then(() => {
     
      this.router.navigate(['/']);
      this.dialogRef.close()})
        .catch(_error => {
          this.error = _error
          if (this.error.message = "A network error (such as timeout, interrupted connection or unreachable host) has occurred.")
          {
          this.notification.warn("Nuk jeni te lidhur me internetin !");
          this.router.navigate(['/'])
          }

          if (this.error.message = "The password is invalid or the user does not have a password.")
          {
          this.notification.warn("Te dhenat e hyrjes nuk jane te sakta !");
          this.router.navigate(['/'])
          }
        });
     //this.auth.returnState();
    
    // if(this.auth.authState)
    // {
    //   // console.log('state :'   +this.auth.authenticated);    
     
    //   this.dialogRef.close();
    //   this.router.navigate(['/mesuesit']);
    // }
    // else
    // {
    // }
  }

  logout() {
    this.auth.signOut();
  }
  dil(){
    this.dialogRef.close();
  }
   ngOnInit() {

    
  }

}
