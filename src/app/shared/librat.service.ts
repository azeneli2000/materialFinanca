import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LibratService {
 libratList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, ) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    EmriLibri: new FormControl('', [Validators.required]),
    Klasa: new FormControl('', [Validators.required]),
    SasiaFillestare: new FormControl(0, [Validators.required]),
    SasiaShitur: new FormControl(0, [Validators.required]),
    CmimiBlerje: new FormControl(0, [Validators.required]),
    CmimiShitje: new FormControl(0, [Validators.required]),
    ShtepiaBotuese: new FormControl('', [Validators.required])   
  });


  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      EmriLibri: '',
      Klasa: '',
      SasiaFillestare: 0,
      SasiaShitur: 0,
      CmimiBlerje: 0,
      CmimiShitje: 0,
      ShtepiaBotuese: ''
    })
    };
  populateForm(libri) {
    this.form.setValue(libri);
  }


  getLibrat() {
    this.libratList = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat');
    return this.db.list(localStorage.getItem('VitiShkollor') +'/Librat').snapshotChanges();
  }

insertLiber(libri){
  this.libratList = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat');
  this.libratList.push({
    EmriLibri: libri.EmriLibri,
    Klasa: libri.Klasa,
    SasiaFillestare: libri.SasiaFillestare,
    SasiaShitur: 0,
    CmimiBlerje: libri.CmimiBlerje,
    CmimiShitje: libri.CmimiShitje,
    ShtepiaBotuese: libri.ShtepiaBotuese
})
}

updateLiber(libri){
  
  this.libratList = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat');
  this.libratList.update(libri.$key, {
    EmriLibri: libri.EmriLibri,
    Klasa: libri.Klasa,
    SasiaFillestare: libri.SasiaFillestare,
    SasiaShitur: libri.SasiaShitur,
    CmimiBlerje: libri.CmimiBlerje,
    CmimiShitje: libri.CmimiShitje,
    ShtepiaBotuese: libri.ShtepiaBotuese
  });
  
}

deleteLiber(key){
   this.libratList = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat');
   this.libratList.remove(key);
}

shitLibra(libratId : any[],nxenesiId){
//hiq nga nje liber per cdo id te array libratId
for (let index = 0; index < libratId.length; index++) {
  const element = libratId[index];
  let libri = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat') ;
  libri.update(element["key"],{
    SasiaShitur : element["SasiaShitur"] +1
  })
}

//shto array libratId tek nxenesiId
// let librat = Object.assign({},libratId); 
// console.log(librat)
// let nxenesi = this.db.list(localStorage.getItem('VitiShkollor') )  ;
// nxenesi.update(nxenesiId,{
//   Librat : librat
// })
 }
 ktheLibra(libratId : any[],nxenesiId){
  //hiq nga nje liber per cdo id te array libratId
  for (let index = 0; index < libratId.length; index++) {
    const element = libratId[index];
    let libri = this.db.list(localStorage.getItem('VitiShkollor') +'/Librat') ;
    libri.update(element["key"],{
      SasiaShitur : element["SasiaShitur"] -1
    })
  }
  
  //shto array libratId tek nxenesiId
  // let librat = Object.assign({},libratId); 
  // console.log(librat)
  // let nxenesi = this.db.list(localStorage.getItem('VitiShkollor') )  ;
  // nxenesi.update(nxenesiId,{
  //   Librat : librat
  // })
   }
}

