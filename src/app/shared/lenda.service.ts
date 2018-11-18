import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators,FormGroupDirective,NgForm} from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { MesuesiZgjedhurService } from './mesuesi-zgjedhur.service';
import { JsonPipe } from '@angular/common';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
@Injectable({
  providedIn: 'root'
})


export class LendaService {

lendaList : AngularFireList<any>;

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
    

});



getLendet(mesZgjedhur){
  console.log (mesZgjedhur);
  this.lendaList = this.db.list('Lendet',ref => ref.orderByChild('mesuesiId').equalTo(mesZgjedhur));
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
  });
}

insertLenda(lenda){
  
  this.lendaList.push({
    Emri : lenda.Emri,
    Javetot : lenda.Javetot,
    Klasa : lenda.Klasa,
    NrNxenesish : lenda.NrNxenesish,
    Ore : lenda.Ore,
    Paga : '0',
    mesuesiId : this.mesuesiZ.mesuesiZgjedhurId,
    Paralele : lenda.Paralele,
  });
}
  updateLendet(lenda){
    this.lendaList.update(lenda.$key,{
    Emri : lenda.Emri,
    Javetot : lenda.Javetot,
    Klasa : lenda.Klasa,
    NrNxenesish : lenda.NrNxenesish,
    Ore : lenda.Ore,
    Paralele : lenda.Paralele,
    //Paga : '0',
    });
  }

  deleteLenda($key : string){
    this.lendaList.remove($key);
  }

  populateForm(lenda){
    
      this.form.setValue(lenda);    
  }



}




