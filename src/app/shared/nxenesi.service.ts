import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class NxenesiService {
  skontoUpdate : boolean = true;
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
    PaguarShkolla: new FormControl('', [Validators.required]),
    MonedhaShkolla: new FormControl('', [Validators.required]),
   
    PagesaTransporti: new FormControl('', [Validators.required]),
    PaguarTransporti: new FormControl('', [Validators.required]),
    MonedhaTransporti: new FormControl('', [Validators.required]),

    PagesaLibrat: new FormControl('', [Validators.required]),
    PaguarLibrat: new FormControl('', [Validators.required]),
    MonedhaLibrat:new FormControl('', [Validators.required]),

    PagesaUniforma: new FormControl('', [Validators.required]),
    PaguarUniforma: new FormControl('', [Validators.required]),
    MonedhaUniforma: new FormControl('', [Validators.required]),

    MeTransport: new FormControl(false),
    Skonto :  new FormControl(null),
    Eskursione :  new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Emri: '',
      Mbiemri: '',
      Atesia: '',
      Klasa: '',
      Indeksi: '',
      PagesaShkolla: 0,
      PaguarShkolla: 0,
      MonedhaShkolla: 'EUR',
      PagesaTransporti: 0,
      PaguarTransporti: 0,
      MonedhaTransporti: 'LEK',
      PagesaLibrat: 0,
      PaguarLibrat: 0,
      MonedhaLibrat: 'LEK',
      PagesaUniforma: 0,
      PaguarUniforma: 0,
      MonedhaUniforma: 'LEK',
      MeTransport: false,
      Skonto: null,
      Eskursione: [{}],
    });

  }

  getNxenesit() {
    this.nxenesitList = this.db.list('2020-2021');
    return this.db.list('2020-2021').snapshotChanges();
  }

  getNxenes($key){

    return this.db.list('2020-2021/'+$key).snapshotChanges();
  }
  populateForm(nxenesi) {
 
  
   this.form.patchValue(nxenesi);
  }

  insertNxenes(nxenesi) {
    this.nxenesitList = this.db.list('2020-2021');
    this.nxenesitList.push(
      {
        Emri: nxenesi.Emri,
        Mbiemri: nxenesi.Mbiemri,
        Atesia: nxenesi.Atesia,
        Klasa: nxenesi.Klasa,
        Indeksi: nxenesi.Indeksi,

        PagesaShkolla: nxenesi.PagesaShkolla,
        PaguarShkolla: nxenesi.PaguarShkolla,
        MonedhaShkolla: nxenesi.MonedhaShkolla,

        PagesaTransporti: nxenesi.PagesaTransporti,
        PaguarTransporti: nxenesi.PaguarTransporti,
        MonedhaTransporti: nxenesi.MonedhaTransporti,

        PagesaLibrat: nxenesi.PagesaLibrat,
        PaguarLibrat: nxenesi.PaguarLibrat,
        MonedhaLibrat: nxenesi.MonedhaLibrat,

        PagesaUniforma: nxenesi.PagesaUniforma,
        PaguarUniforma: nxenesi.PaguarUniforma,
        MonedhaUniforma: nxenesi.MonedhaUniforma,

        MeTransport: nxenesi.MeTransport,
        Skonto: nxenesi.Skonto ,
        Eskursione: nxenesi.Eskursione,

      });
  }


  updateNxenes(nxenesi) {
    this.nxenesitList.update(nxenesi.$key, {
      Emri: nxenesi.Emri,
      Mbiemri: nxenesi.Mbiemri,
      Atesia: nxenesi.Atesia,
      Klasa: nxenesi.Klasa,
      Indeksi: nxenesi.Indeksi,

      PagesaShkolla: nxenesi.PagesaShkolla,
      PaguarShkolla: nxenesi.PaguarShkolla,
      MonedhaShkolla: nxenesi.MonedhaShkolla,

      PagesaTransporti: nxenesi.PagesaTransporti,
      PaguarTransporti: nxenesi.PaguarTransporti,
      MonedhaTransporti: nxenesi.MonedhaTransporti,

      PagesaLibrat: nxenesi.PagesaLibrat,
      PaguarLibrat: nxenesi.PaguarLibrat,
      MonedhaLibrat: nxenesi.MonedhaLibrat,

      PagesaUniforma: nxenesi.PagesaUniforma,
      PaguarUniforma: nxenesi.PaguarUniforma,
      MonedhaUniforma: nxenesi.MonedhaUniforma,

      MeTransport: nxenesi.MeTransport,
      Skonto: nxenesi.Skonto,
      Eskursione: nxenesi.Eskursione,

    });
  }


  deleteNxenesi($key: string) {
    this.nxenesitList.remove($key);
   
  }

}
