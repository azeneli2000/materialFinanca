import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShpenzimeService {

  constructor(private db: AngularFireDatabase) { }
  shpenzimetList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Kosto: new FormControl(0, [Validators.required]),
    Koment: new FormControl(''),
    Shpenzime: new FormControl('',[Validators.required]),
    Monedha : new FormControl('LEK'),
    Data : new FormControl('')
    
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Kosto: '',
      Koment: '',
      Shpenzime: '',
      Monedha: 'LEK',
      Data : ''
    });

  }

  getShpenzime(kategoria) {
    let viti = localStorage.getItem('VitiShkollor');
    this.shpenzimetList = this.db.list(viti + '/Shpenzime/'+ kategoria);
    return this.db.list(viti + '/Shpenzime/'+ kategoria).snapshotChanges();
  }

   insertShpenzime(kategoria,shpenzimi) : string
   {
    let viti = localStorage.getItem('VitiShkollor');
    this.shpenzimetList = this.db.list(viti + '/Shpenzime/'+ kategoria);
  let key =  this.shpenzimetList.push(
      {
        Kosto: shpenzimi.Kosto,
        Koment: shpenzimi.Koment,
        Monedha: shpenzimi.Monedha,    
        Data : shpenzimi.Data   
      }).key;
      console.log(key);
      return key.toString();
  }
  removeShpernzime (key){
this.shpenzimetList.remove(key);
  }
}
