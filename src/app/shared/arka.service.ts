import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArkaService {

  constructor(private db: AngularFireDatabase) { }
  arkaList: AngularFireList<any>;

  getArka(){

     return  this.db.list('Arka').snapshotChanges();
  }


  insertTransaksion( lloji : string,docRef : string, tedhena:string, valuta : string, sasia : string,koment : string) {
    let vitiShkollor = localStorage.getItem('VitiShkollor');

    this.arkaList = this.db.list('Arka');
     
    this.arkaList.push(
      {
        Lloji : lloji,
        DocRef : docRef,
        TeDhena :tedhena,
        Valuta : valuta,
        Sasia : sasia,
        Anulluar : false,
        VitiShkollor : vitiShkollor,
        Data : new Date().toLocaleDateString(),
        Koha : new Date().toLocaleTimeString(),
        User : JSON.parse(localStorage.getItem('user')).displayName,
        Koment : koment,

      });
  }

  insertXchange(monedhaFillestare : string, monedhaPerfundimtare : string, sasia : number, kursi : number,koment : string) {
    let vitiShkollor = localStorage.getItem('VitiShkollor');

    this.arkaList = this.db.list('Arka');
     
  this.arkaList.push(
      {
        Lloji : 'Xchange',
        DocRef : '',
        TeDhena :  + monedhaPerfundimtare + ' / ' + kursi ,
        Valuta : monedhaFillestare,
        Sasia : sasia,
        Anulluar : false,
        VitiShkollor : vitiShkollor,
        Data : new Date().toLocaleDateString(),
        Koha : new Date().toLocaleTimeString(),
        User : JSON.parse(localStorage.getItem('user')).displayName,
        Koment : koment,
      })
  }



  anullo(docref,koment,$key,sasia : number ){
//nqs eshte shpenzim
this.db.list(docref).remove();

this.db.list('Arka').update($key,{
Anulluar : true

})
  }
}
