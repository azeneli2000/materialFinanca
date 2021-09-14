import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShtepiteBotueseService {

  constructor(private db: AngularFireDatabase) { }

  shtepiteBotueseList: AngularFireList<any>;

  formPaguar =  {
  $key : null,
  
  Paguar : 0,
 
  
  
  }
  
    form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      Paguar: new FormControl(0, [Validators.required]),
      Emri: new FormControl(''),
      
      
    });
  
    initializeFormGroup() {
      this.form.setValue({
        $key: null,
        Emri :'',
        Paguar : 0
      });
  
    }
  
    getShtepiteBotuese() {
      this.  shtepiteBotueseList= this.db.list('Shtepitebotuese');
      return this.db.list('Shtepitebotuese/').snapshotChanges();
    }
  
     insertShtepiBotuese(emri) : string
     {
     this.shtepiteBotueseList = this.db.list('Shtepitebotuese/');
     let key =  this.shtepiteBotueseList.push(
        {
          Emri : emri,
          Paguar : 0   
        }).key;
     
        return key.toString();
    }
    deleteShtepiBotuese(key){
     this.db.list("Shtepibotuese").remove(key)
    }
  
  
    populateForm(form) {
    
      this.form.setValue(form);
    }

    updatePagesa(sasia,shtepiaBotuese){
      this.db.list("Shtepitebotuese").update(shtepiaBotuese.key,{
        Paguar : shtepiaBotuese.Paguar + sasia
      })
    }
  
  
  
}
