import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BankatService {

  constructor(private db: AngularFireDatabase) { }

  bankatList: AngularFireList<any>;

formPaguar =  {
$key : null,
Banka : "",
Paguar : 0,
Monedha : '',
Koment : ''


}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Sasia: new FormControl(0, [Validators.required]),
    Koment: new FormControl(''),
    Bankat: new FormControl('',[Validators.required]),
    Monedha : new FormControl('LEK'),
    Data : new FormControl(''),
    Paguar : new FormControl(0)
    
  });
  initializePaguar() {
    this.formPaguar ={
      $key: null,     
      Koment: '',
      Banka: '',
      Monedha: 'LEK',  
      Paguar : 0,
     
    };

  }
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      Sasia: 0,
      Koment: '',
      Bankat: '',
      Monedha: 'LEK',
      Data : '',
      Paguar : 0
    });

  }

  getBankat(kategoria) {
    this.bankatList = this.db.list('Bankat');
    return this.db.list('Bankat/' + kategoria).snapshotChanges();
  }

   insertBankat(kategoria,banka) : string
   {
    this.bankatList = this.db.list('Bankat/'+ kategoria);
  let key =  this.bankatList.push(
      {
        Sasia: banka.Sasia,
        Koment: banka.Koment,
        Monedha: banka.Monedha,    
        Data : banka.Data,
        Paguar : 0   
      }).key;
   
      return key.toString();
  }


  populateForm(banka) {
  
    this.form.patchValue(banka);
  }


  updatePaguar(sasia)
  {
    this.bankatList = this.db.list('Bankat/'+this.formPaguar.Banka);
    this.bankatList.update(this.formPaguar.$key,{

      Paguar : this.formPaguar.Paguar + sasia
    })
    

  }
}