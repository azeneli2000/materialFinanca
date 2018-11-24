import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from "@angular/router"
@Injectable({
  providedIn: 'root'
})


export class AuthService {
 
  authState: any = null;
 
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
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
// export class AuthService {

//   constructor(private afAuth: AngularFireAuth, private router: Router) { }
//   email: string;
//   password: string;
//   Emri:string;
//   authenticated;
//   login(email, password) {
//     this.afAuth.auth.signInWithEmailAndPassword(email, password);

//     // this.afAuth.authState.subscribe(res => {
//     //   if (res && res.uid) {
//     //     // console.log('user is logged in');
//     //     this.authenticated = true;

//     //   } else {
//     //     // console.log('user not logged in');
//     //     this.authenticated = false;
//     //   }
//     // });
   



//   }
//   returnState()  {
//     this.afAuth.authState.subscribe(res => {
//       if (res!==null && res.uid!==null){
//        this.Emri =  res.displayName;
//       this.authenticated = res;
//     console.log(this.Emri);
//   }});
      
//     // this.afAuth.authState.subscribe(res => {
//     //   if (res && res.uid) {
//     //      console.log('user is logged in');
//     //     //  this.authenticated =  true;
//     //     } 
//     //   else {
//     //     console.log('user not logged in');
//     //     //  this.authenticated = false;
//     //   }
//     // });
//   }




//   logout() {
//     this.afAuth.auth.signOut();
//   }

// }
