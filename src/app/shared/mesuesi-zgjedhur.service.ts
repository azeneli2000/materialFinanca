import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MesuesiZgjedhurService {

  constructor(private db : AngularFireDatabase) { }
  mesuesiZgjedhur  =[];
  mesuesiZgjedhurId;
  mesuesiZgjedhurPaga;
mz;
  
 

mbushMesuesin(){
  this.mz= this.db.list('Mesuesit/'+this.mesuesiZgjedhurId).valueChanges();
}
}
