import { Injectable } from '@angular/core';
import {FormGroup, FormControl,Validators,FormGroupDirective,NgForm} from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { LendaService } from './lenda.service';


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

  constructor(private db:AngularFireDatabase,private lendet : LendaService) { }

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
    this.updateLendaMesuesiKatVjet(mesuesi.$key,parseInt(mesuesi.Kategoria),parseInt(mesuesi.Vjetersia));
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

  updateLendaMesuesiKatVjet(idMesuesi,kat,vj){
    let res =  this.lendet.getLendet(idMesuesi).subscribe(list => {        
     let  array  = list.map(item =>{
         return {
           $key : item.key,
           ...item.payload.val()};
       });
       res.unsubscribe();
       let pagaTotMesuesi : number = 0;
       for (var i=0; i<array.length;i++){
         let paraleleNr : number;
         let cikliNr : number = 0;
        //@ts-ignore
         if (array[i].Paralele==true)
         paraleleNr = 0;
         else 
         paraleleNr= 1;
        //@ts-ignore
         let pagaTot = ((parseInt(array[i].Perqindja) +parseInt(array[i].Klasa) + vj*0.5 + (array[i].NrNxenesish-16)*2.5 + paraleleNr*2 + kat*5 + cikliNr + array[i].ShtesaInst-10)*array[i].Baza/100) + array[i].Baza;
       //@ts-ignore
         pagaTot = Math.round((pagaTot*parseInt(array[i].Ore)*parseInt(array[i].Javetot)/12)*100/116.7);
         pagaTotMesuesi = pagaTotMesuesi+pagaTot;
         //modifikon pagat per cdo lende
         this.db.list('Lendet').update(array[i].$key,{
           Paga : pagaTot
         });
       }
       this.db.list('Mesuesit').update(idMesuesi,{
         Paga : pagaTotMesuesi
        });
    
     
       
       // this.pagaLenda = ((this.perqindjaLenda+this.perqindjaKlasa + vj*0.5 + (this.nrNxenesishKlase-16)*2.5 + this.paraleleNr*2 + kat*5 + this.cikliNr) * this.baza/100) + this.baza;
       // return Math.round(this.pagaLenda* this.oreJave*this.javeTot/12);
       // this.pagaBrutoVjetore = Math.round(  this.pagaLenda* this.oreJave*this.javeTot);
     
   
 
   
 
 
 
 })
   }



}


