import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AeketimeService {

  constructor(private db: AngularFireDatabase) { }

  shpenzimetList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Sasia: new FormControl(0, [Validators.required]),
    Koment: new FormControl(''),
    Arketime: new FormControl('',[Validators.required]),
    Monedha : new FormControl('LEK'),
    Data : new FormControl('')
    
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Sasia: '',
      Koment: '',
      Arketime: '',
      Monedha: 'LEK',
      Data : ''
    });

  }

  getArketime(kategoria) {
    let viti = localStorage.getItem('VitiShkollor');
    this.shpenzimetList = this.db.list(viti + '/Arketime/'+ kategoria);
    return this.db.list(viti + '/Arketime/'+ kategoria).snapshotChanges();
  }

   insertArketime(kategoria,arketimi) : string
   {
    let viti = localStorage.getItem('VitiShkollor');
    this.shpenzimetList = this.db.list(viti + '/Arketime/'+ kategoria);
  let key =  this.shpenzimetList.push(
      {
        Sasia: arketimi.Sasia,
        Koment: arketimi.Koment,
        Monedha: arketimi.Monedha,    
        Data : arketimi.Data   
      }).key;
      console.log(key);
      return key.toString();
  }
}
