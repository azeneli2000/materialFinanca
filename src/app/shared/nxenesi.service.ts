import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class NxenesiService {

  nxenesitList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Emri: new FormControl('', [Validators.required]),
    Mbiemri: new FormControl('', [Validators.required]),
    Atesia: new FormControl('', [Validators.required]),
    Klasa: new FormControl('', [Validators.required]),
    Indeksi: new FormControl('', [Validators.required]),
    PagesaShkolla: new FormControl('', [Validators.required]),
    PagesaTransporti: new FormControl('', [Validators.required]),
    PagesaLibrat: new FormControl('', [Validators.required]),
    PagesaUniforma: new FormControl('', [Validators.required]),
    MeTransport: new FormControl(false),
   // Skonto :  new FormControl('', [Validators.required]),


  });

  getNxenesit() {
    this.nxenesitList = this.db.list('2020-2021');
    return this.db.list('2020-2021').snapshotChanges();
  }
  insertNxenes(nxenesi){
    this.nxenesitList = this.db.list('2020-2021');
    this.nxenesitList.push(
      {
        Emri : nxenesi.Emri,      
        Mbiemri:nxenesi.Mbiemri,
        Atesia: nxenesi.Atesia,
        Klasa: nxenesi.Klasa,
        Indeksi:nxenesi.Indeksi,
          
        PagesaShkolla:nxenesi.PagesaShkolla,
        PaguarShkolla:nxenesi.PaguarShkolla,
        MonedhaShkolla:nxenesi.MonedhaShkolla,

        PagesaTransporti:nxenesi.PagesaTransporti,
        PaguarTransporti:nxenesi.PaguarTransporti,
        MonedhaTransporti:nxenesi.MonedhaTransporti,

        PagesaLibrat:nxenesi.PagesaLibrat,
        PaguarLibrat : nxenesi.PaguarLibrat,
        MonedhaLibrat : nxenesi.MonedhaLibrat,

        PagesaUniforma:nxenesi.PagesaUniforma,
        PaguarUniforma:nxenesi.PaguarUniforma,
        MonedhaUniforma:nxenesi.MonedhaUniforma,

        MeTransport: nxenesi.MeTransport,
        Skonto : nxenesi.Skonto,
        Eskursione : nxenesi.Eskursione,
        
    }

    );
  }

}
