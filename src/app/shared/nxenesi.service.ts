import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
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
    MeUniforme: new FormControl(true),
    MeTransport: new FormControl(true),
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
      MeTransport: true,
      MeUniforme: true,
      Skonto: null,
      Eskursione: [{}],
    });

  }

  getNxenesit() {
    let viti = localStorage.getItem('VitiShkollor');
    this.nxenesitList = this.db.list(viti);
    return this.db.list(viti).snapshotChanges();
  }

  getNxenes($key){

    return this.db.object( localStorage.getItem('VitiShkollor') +'/'+$key).snapshotChanges();
  }
  populateForm(nxenesi) {
 
  
   this.form.patchValue(nxenesi);
  }

  insertNxenes(nxenesi) {
    let viti = localStorage.getItem('VitiShkollor');

   
    let uniforma : number  = 0 ;
    let transporti : number =0;

    this.nxenesitList = this.db.list(viti);
      if (nxenesi.MeUniforme)
        uniforma = nxenesi.PagesaUniforma
      if (nxenesi.MeTransport)
        transporti = nxenesi.PagesaTransporti
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

        PagesaTransporti: transporti,
        PaguarTransporti: nxenesi.PaguarTransporti,
        MonedhaTransporti: nxenesi.MonedhaTransporti,

        PagesaLibrat: nxenesi.PagesaLibrat,
        PaguarLibrat: nxenesi.PaguarLibrat,
        MonedhaLibrat: nxenesi.MonedhaLibrat,

        PagesaUniforma: uniforma,
        PaguarUniforma: nxenesi.PaguarUniforma,
        MonedhaUniforma: nxenesi.MonedhaUniforma,
        
        MeUniforme: nxenesi.MeUniforme,
        MeTransport: nxenesi.MeTransport,
        Skonto: nxenesi.Skonto ,
        Eskursione: nxenesi.Eskursione,

      });
  }


  updateNxenes(nxenesi) {
    let viti = localStorage.getItem('VitiShkollor');
    this.nxenesitList = this.db.list(viti);
    let uniforma : number  = 0 ;
    let transporti : number =0;
console.log(nxenesi.MeTransport);
      if (nxenesi.MeUniforme)
        uniforma = nxenesi.PagesaUniforma
        if (nxenesi.MeTransport)
        transporti = nxenesi.PagesaTransporti

      //    //nqs mod transportin dhe ska pagesa
      //   if (nxenesi.MeTransport && nxenesi.PaguarTransporti == 0)
      // transporti = nxenesi.PagesaTransporti
      // //nqs mod transportin po ka pagesa
      // if (nxenesi.MeTransport && nxenesi.PaguarTransporti >0)
      // transporti = nxenesi.PaguarTransporti

    this.nxenesitList.update(nxenesi.$key, {
      Emri: nxenesi.Emri,
      Mbiemri: nxenesi.Mbiemri,
      Atesia: nxenesi.Atesia,
      Klasa: nxenesi.Klasa,
      Indeksi: nxenesi.Indeksi,

      PagesaShkolla: nxenesi.PagesaShkolla,
      PaguarShkolla: nxenesi.PaguarShkolla,
      MonedhaShkolla: nxenesi.MonedhaShkolla,

      PagesaTransporti: transporti,
      PaguarTransporti: nxenesi.PaguarTransporti,
      MonedhaTransporti: nxenesi.MonedhaTransporti,

      PagesaLibrat: nxenesi.PagesaLibrat,
      PaguarLibrat: nxenesi.PaguarLibrat,
      MonedhaLibrat: nxenesi.MonedhaLibrat,

      PagesaUniforma: uniforma,
      PaguarUniforma: nxenesi.PaguarUniforma,
      MonedhaUniforma: nxenesi.MonedhaUniforma,
      
      MeUniforme: nxenesi.MeUniforme,
      MeTransport: nxenesi.MeTransport,
      Skonto: nxenesi.Skonto,
      Eskursione: nxenesi.Eskursione,

    });
  }


  deleteNxenesi($key) {
    //todo
  //   this.nxenesitList = this.db.list('2020-2021');

  //   this.nxenesitList.update(nxenesi.$key, {
  //     PagesaShkolla: nxenesi.PaguarShkolla,
  // });
  
  this.nxenesitList.remove($key);

  }


  
}
