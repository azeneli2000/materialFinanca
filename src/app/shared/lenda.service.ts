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
    ShtesaInst : new FormControl('',[Validators.required])

});



getLendet(mesZgjedhur){
  console.log (mesZgjedhur);
  this.lendaList = this.db.list('Lendet',ref => ref.orderByChild('mesuesiId').equalTo(mesZgjedhur));
  this.mesuesiList = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit');
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
   Perqindja:'',
   ShtesaInst : ''
  });
}

insertLenda(lenda,pagaTotMesuesi,shtesaPaga,totMujore){
  
  this.lendaList.push({
    Emri : lenda.Emri,
    Javetot : lenda.Javetot,
    Klasa : lenda.Klasa,
    NrNxenesish : lenda.NrNxenesish,
    Ore : lenda.Ore,
    Paga : lenda.Paga,
    ShtesaInst : lenda.ShtesaInst,
    mesuesiId : this.mesuesiZ.mesuesiZgjedhurId,
    Paralele : lenda.Paralele,
    Perqindja : this.getPerqindjaLenda(lenda.Emri),
    Baza :this.getBaza(lenda.Emri)    
  });
this.updatePagaMesuesi( this.mesuesiZ.mesuesiZgjedhurId,pagaTotMesuesi,shtesaPaga,totMujore)

}
  updateLendet(lenda,diff,diffShtesa,totMujore){
    this.lendaList.update(lenda.$key,{
    Emri : lenda.Emri,
    Javetot : lenda.Javetot,
    Klasa : lenda.Klasa,
    NrNxenesish : lenda.NrNxenesish,
    Ore : lenda.Ore,
    Paralele : lenda.Paralele,
    Paga : lenda.Paga,
    ShtesaInst : lenda.ShtesaInst,
    });
    this.updatePagaMesuesi( this.mesuesiZ.mesuesiZgjedhurId,diff,diffShtesa,totMujore)
  }

   deleteLenda($key : string,paga :number,idMesuesi,pagaSig,pagaNmujore,pagaSh,pagaTot){
   
    this.lendaList.remove($key);
    this.updatePagaMesuesiOnDelete(idMesuesi,paga,pagaSig,pagaNmujore,pagaSh,pagaTot);
  }

   populateForm(lenda){
    
      this.form.setValue(lenda);    
  }

   getPerqindjaLenda(emriLenda){
    if(emriLenda=="Matematike"||emriLenda=="Gjuhe"||emriLenda=="Anglisht Pjekurie"||emriLenda=="Anglisht lirimi")
    return 20;
    
    if(emriLenda=="Mat pjekurie"||emriLenda=="Gjuhe pjekurie"||emriLenda=="Letersi pjekurie"||emriLenda=="Mat lirimi" ||emriLenda=="Gjuhe lirimi")
    return 30;
    
    if(emriLenda=="Kimi"||emriLenda=="Fizike"||emriLenda=="Anglisht"||emriLenda=="Frengjisht" ||emriLenda=="Dituri"||emriLenda=="Ekonomi"||emriLenda=="TIK gjimnaz")
    return 15;
    
    if(emriLenda=="Biologji"||emriLenda=="Histori"||emriLenda=="Gjeografi"||emriLenda=="TIK CMU" ||emriLenda=="Ed Fizik")
    return 10;
    
    if(emriLenda=="Ed Shoq"||emriLenda=="Ed karriere"||emriLenda=="Arte"||emriLenda=="Module" ||emriLenda=="Teater"||emriLenda=="Aftesim")
    return 5;
    if(emriLenda=="Pune Admin"||emriLenda=="Veprimtari"||emriLenda=="Shoqerim"|| emriLenda=="Kujdestari" ||emriLenda=="Mirembajtje")
    return 0;
  }
   getBaza(emriLenda){
   
    if (emriLenda=="Shoqerim"||emriLenda=="Mirembajtje")
    return 250;

    if (emriLenda=="Pune Admin" || emriLenda=="Veprimtari" || emriLenda=="Kujdestari")
    {
        return 500;
        
    }
  
    else
      return 700;
  }

   getPerqindjaKlasa(klasa){
    return parseInt(klasa);
   }

   getCikli(klasa){
    if(klasa ==0||klasa ==1||klasa ==2|| klasa ==3|| klasa ==4||klasa ==5) 
    return 0;
    if(klasa ==6||klasa ==7||klasa ==8||klasa ==9) 
    return 10;
    if(klasa ==10||klasa ==11||klasa ==12) 
    return 25;
    }



  updatePagaMesuesi(idMesuesi,Shtesa,ShtesaPaga,totMujore)
  {
    
    this.mesuesiList.update(idMesuesi,{Paga: Shtesa , PagaShtese : ShtesaPaga,PagaTotMujore : totMujore});
  }


  updatePagaMesuesiOnDelete(idMesuesi,Shtesa,pagasig,pagaNmujore,pagaSh,pagaTot)
  {
   if (Shtesa>=pagasig)
    this.mesuesiList.update(idMesuesi,{Paga: Shtesa , PagaSig : pagasig , PagaNetoMujore : pagaNmujore, PagaShtese : pagaSh,PagaTotMujore : pagaTot });
  else 
     this.mesuesiList.update(idMesuesi,{Paga: Shtesa , PagaSig : 0, PagaTotMujore : Shtesa, PagaShtese : Shtesa  , PagaNetoMujore : 0});
  }



}




