import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
//import {ErrorStateMatcher} from '@angular/material/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LendaService } from './lenda.service';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n';
import { MesuesiZgjedhurService } from './mesuesi-zgjedhur.service';


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
  mesuesitList: AngularFireList<any>;
 
  constructor(private db: AngularFireDatabase, private lendet: LendaService , private mesuesiZgjedhur:MesuesiZgjedhurService) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Emri: new FormControl('', [Validators.required]),
    Mbiemri: new FormControl('', [Validators.required]),
    Kategoria: new FormControl('', [Validators.required]),
    Vjetersia: new FormControl('', [Validators.required]),
    Paga: new FormControl(null),
    PagaSig: new FormControl('', [Validators.required]),
    PagaNetoMujore: new FormControl(''),
    PagaShtese: new FormControl('', [Validators.required]),
    PagaTotMujore :  new FormControl('', [Validators.required]),
    Jashtem: new FormControl(false),



  });
  //matcher = new MyErrorStateMatcher();


  getMesuesit() {
    this.mesuesitList = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit');
    return this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit').snapshotChanges();
  }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Emri: '',
      Mbiemri: '',
      Kategoria: '',
      Vjetersia: '',
      Paga: 0,
      PagaSig: 0,
      PagaNetoMujore: 0,
      PagaShtese: 0,
      PagaTotMujore : 0,
      Jashtem: false
    });

  }

  insertMesuesi(mesuesi) {
    this.mesuesitList = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit');
    this.mesuesitList.push({
      Emri: mesuesi.Emri,
      Mbiemri: mesuesi.Mbiemri,
      Vjetersia: mesuesi.Vjetersia,
      Kategoria: mesuesi.Kategoria,
      Paga: 0,
      PagaSig: 0,
      PagaNetoMujore: 0,
      PagaShtese: 0,
      PagaTotMujore : 0,
      Jashtem: mesuesi.Jashtem
    });
  }
  updateMesuesit(mesuesi,change) {
    this.mesuesitList = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit');

    if (change)
    this.updateLendaMesuesiKatVjet(mesuesi.$key, parseInt(mesuesi.Kategoria), parseInt(mesuesi.Vjetersia));
    this.mesuesitList.update(mesuesi.$key, {
      Emri: mesuesi.Emri,
      Mbiemri: mesuesi.Mbiemri,
      Vjetersia: mesuesi.Vjetersia,
      Kategoria: mesuesi.Kategoria,
      PagaSig: mesuesi.PagaSig,
      PagaNetoMujore: mesuesi.PagaNetoMujore,
      PagaShtese: mesuesi.PagaShtese,
      PagaTotMujore : mesuesi.PagaTotMujore,
      Jashtem: mesuesi.Jashtem
    });
  } 

  deleteMesuesi($key: string) {
    this.mesuesitList = this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit');

    this.mesuesitList.remove($key);
    //fshin lendet
    let lendetMes = this.db.list('Lendet', ref1 => ref1.orderByChild('mesuesiId').equalTo($key)).snapshotChanges().subscribe(items => {
      let array = items.map(item => {
        return (item.key);
      });
      lendetMes.unsubscribe();
      for (var i = 0; i < array.length; i++) {
        this.db.list('Lendet/' + array[i]).remove();
      }
      console.log(array);
    });
  }

  populateForm(mesuesi) {

    this.form.setValue(mesuesi);
  }

  updateLendaMesuesiKatVjet(idMesuesi, kat, vj) {
    //observable per mesuesin
     
    let pagaSig = this.form.get('PagaSig').value;
    let pagaNetoZyrtare = this.form.get('PagaNetoMujore').value;
  
    
   //observable per lendet
    let res = this.lendet.getLendet(idMesuesi).subscribe(list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });

      res.unsubscribe();
      let pagaTotMesuesi: number = 0;
      for (var i = 0; i < array.length; i++) {
        let paraleleNr: number;
        let cikliNr: number = 0;
       
        //@ts-ignore
         
        if (array[i].Paralele == true)
          paraleleNr = 0;
        else
          paraleleNr = 1;
        //@ts-ignore
        let pagaTot = ((parseFloat(array[i].Perqindja) + parseInt(array[i].Klasa) + vj * 0.5 + (array[i].NrNxenesish - 16) * 2.5 + paraleleNr * 2 + kat * 5 + this.lendet.getCikli(array[i].Klasa) + array[i].ShtesaInst - 10) * array[i].Baza / 100) + array[i].Baza;
        //@ts-ignore
        pagaTot = Math.round((pagaTot * parseFloat(array[i].Ore) * parseFloat(array[i].Javetot) / 12) * 100 / 116.7);
        pagaTotMesuesi = pagaTotMesuesi + pagaTot;        
        //modifikon pagat per cdo lende
        this.db.list('Lendet').update(array[i].$key, {
          Paga: pagaTot
        });
      }
      //llogarit pagen tot neto dhe shtesen ne varesi te pages
      let psh = 0;
      let ptot = 0;
      if (pagaSig <= 30000 && pagaSig > 0) {


        psh = Math.round(pagaTotMesuesi - pagaSig);

      }
      if (pagaSig > 30000 && pagaSig < 130000) {

        psh = Math.round(pagaTotMesuesi - (pagaSig * 0.112 + ((pagaSig - 30000) * 0.13)) - pagaNetoZyrtare);
      }
      if (pagaSig > 130000) {

        psh = Math.round(pagaTotMesuesi - (pagaSig * 0.112 + ((pagaSig - 30000) * 0.15)) - pagaNetoZyrtare);
      }
      
      ptot = psh+pagaNetoZyrtare;

// this.form.controls.pagaTotMesuesi.setValue(pagaTotMesuesi);
// this.form.controls.PagaTotMujore. setValue(ptot);
// this.form.controls.PagaShtese.setValue(psh);
    
this.db.list(localStorage.getItem('VitiShkollor') +'/Mesuesit').update(idMesuesi, {
        Paga: pagaTotMesuesi,
        PagaTotMujore : ptot,
        PagaShtese : psh
      });
    })
  }

  
   
}


