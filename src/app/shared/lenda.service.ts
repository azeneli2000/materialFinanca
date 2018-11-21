import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators,FormGroupDirective,NgForm} from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { MesuesiZgjedhurService } from './mesuesi-zgjedhur.service';

@Injectable({
  providedIn: 'root'
})


export class LendaService {
//cloudContainer

lendaList : AngularFireList<any>;
mesuesiList : AngularFireList<any>;

  constructor(private db:AngularFireDatabase, private mesuesiZ : MesuesiZgjedhurService) { }

  form : FormGroup = new FormGroup({
    $key : new FormControl(null),
    Emri : new FormControl('' ,[Validators.required]),
    Javetot : new FormControl('',[Validators.required]),
    Klasa : new FormControl('',[Validators.required]),
    NrNxenesish : new FormControl('',[Validators.required]),
    Ore : new FormControl('',[Validators.required]),
    Paga : new FormControl(''),
   
    //Shtese : new FormControl(''),
    mesuesiId : new FormControl(''),
    Paralele : new FormControl(false),
    Baza : new FormControl(''),
    Perqindja : new FormControl(''),

});



getLendet(mesZgjedhur){
  console.log (mesZgjedhur);
  this.lendaList = this.db.list('Lendet',ref => ref.orderByChild('mesuesiId').equalTo(mesZgjedhur));
  this.mesuesiList = this.db.list('Mesuesit');
  console.log(this.lendaList);
  return this.db.list('Lendet',ref => ref.orderByChild('mesuesiId').equalTo(mesZgjedhur)).snapshotChanges();
}

initializeFormGroup() {
  this.form.setValue({
   $key : null,
    Emri : '',
    Javetot : '',
    Klasa : '',
    NrNxenesish : '',
    Ore : '',
    Paga : '',
    //Shtese :'',
    mesuesiId : '',
    Paralele : false,
   Baza : '',
   Perqindja:''
  });
}

insertLenda(lenda,pagaTotMesuesi){
  
  this.lendaList.push({
    Emri : lenda.Emri,
    Javetot : lenda.Javetot,
    Klasa : lenda.Klasa,
    NrNxenesish : lenda.NrNxenesish,
    Ore : lenda.Ore,
    Paga : lenda.Paga,
    mesuesiId : this.mesuesiZ.mesuesiZgjedhurId,
    Paralele : lenda.Paralele,
    Perqindja : this.getPerqindjaLenda(lenda.Emri),
    Baza :this.getBaza(lenda.Emri)    
  });
this.updatePagaMesuesi( this.mesuesiZ.mesuesiZgjedhurId,pagaTotMesuesi)

}
  // updateLendet(lenda){
  //   this.lendaList.update(lenda.$key,{
  //   Emri : lenda.Emri,
  //   Javetot : lenda.Javetot,
  //   Klasa : lenda.Klasa,
  //   NrNxenesish : lenda.NrNxenesish,
  //   Ore : lenda.Ore,
  //   Paralele : lenda.Paralele,
  //   //Paga : '0',
  //   });
  // }

  deleteLenda($key : string,paga :number,idMesuesi){
   
    this.lendaList.remove($key);
    this.updatePagaMesuesiOnDelete(idMesuesi,paga);
  }

  populateForm(lenda){
    
      this.form.setValue(lenda);    
  }

  getPerqindjaLenda(emriLenda){
    return 10;
  }
  getBaza(emriLenda){
   
    if (emriLenda=='Kimi22')
    return 700;
    else
    return 700;
  }

  getPerqindjaKlasa(klasa){
return 10;
  }

getCikli(klasa){
  return 25;
}

  updatePagaMesuesi(idMesuesi,Shtesa)
  {
    
    this.mesuesiList.update(idMesuesi,{Paga: Shtesa});
  }
  updatePagaMesuesiOnDelete(idMesuesi,Shtesa)
  {
   
    this.mesuesiList.update(idMesuesi,{Paga: Shtesa});
  }



}




