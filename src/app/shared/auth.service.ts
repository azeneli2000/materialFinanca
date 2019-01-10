import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  authState: any = null;
 
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  let s=  this.afAuth.authState.subscribe((auth) => {
    if(auth) {
    this.authState = auth;    
      localStorage.setItem('user', JSON.stringify(this.authState));
    // console.log(JSON.parse(localStorage.getItem('user')));
     
    } else {
      localStorage.setItem('user', null);
     // console.log(JSON.parse(localStorage.getItem('user')));
      this.authState = null;
    }
    });
     
  }

 
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email']
  }
  get currentDisplayName(): string {
    return this.authState['displayName']
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }
 
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}

