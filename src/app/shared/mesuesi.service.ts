import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators,FormGroupDirective,NgForm} from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
export class MesuesiService {

mesuesitList : AngularFireList<any>;

  constructor(private db:AngularFireDatabase) { }

  form : FormGroup = new FormGroup({
    $key : new FormControl(null),
    Emri : new FormControl('' ,[Validators.required]),
    Mbiemri : new FormControl('',[Validators.required]),
    Kategoria : new FormControl('',[Validators.required]),
    Vjetersia : new FormControl('',[Validators.required]),
    Paga : new FormControl(null),

});
//matcher = new MyErrorStateMatcher();


getMesuesit(){
  this.mesuesitList = this.db.list('Mesuesit');
  return this.db.list('Mesuesit').snapshotChanges();
}

initializeFormGroup() {
  this.form.setValue({
    $key: null,
    Emri: '',
    Mbiemri: '',
    Kategoria: '',
    Vjetersia: '',    
     Paga: 0,
    
  });
  
}

insertMesuesi(mesuesi){
  this.mesuesitList.push({
    Emri : mesuesi.Emri,
    Mbiemri : mesuesi.Mbiemri,
    Vjetersia : mesuesi.Vjetersia,
    Kategoria : mesuesi.Kategoria,
    Paga : 0
  });
}
  updateMesuesit(mesuesi){
    this.mesuesitList.update(mesuesi.$key,{
      Emri : mesuesi.Emri,
      Mbiemri : mesuesi.Mbiemri,
      Vjetersia : mesuesi.Vjetersia,
      Kategoria : mesuesi.Kategoria
    });
  }

  deleteMesuesi($key : string){
    this.mesuesitList.remove($key);
  }

  populateForm(mesuesi){
    
      this.form.setValue(mesuesi);    
  }



}


