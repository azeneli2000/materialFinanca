import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonfigurimeService {
  vitiList: AngularFireList<any>;

 

  constructor(private db: AngularFireDatabase) {
    
   }

   form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    
    ShkollaKlasa0: new FormControl(0, [Validators.required]),
    TransportiKlasa0 : new FormControl(0, [Validators.required]),
    UniformaKlasa0 :new FormControl(0, [Validators.required]),
    LibratKlasa0 : new FormControl(0, [Validators.required]), 

    ShkollaKlasa1: new FormControl(0, [Validators.required]),
    TransportiKlasa1 : new FormControl(0, [Validators.required]),
    UniformaKlasa1 :new FormControl(0, [Validators.required]),
    LibratKlasa1 : new FormControl(0, [Validators.required]), 

    ShkollaKlasa2: new FormControl(0, [Validators.required]),
    TransportiKlasa2 : new FormControl(0, [Validators.required]),
    UniformaKlasa2 :new FormControl(0, [Validators.required]),
    LibratKlasa2 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa3: new FormControl(0, [Validators.required]),
    TransportiKlasa3 : new FormControl(0, [Validators.required]),
    UniformaKlasa3 :new FormControl(0, [Validators.required]),
    LibratKlasa3 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa4: new FormControl(0, [Validators.required]),
    TransportiKlasa4 : new FormControl(0, [Validators.required]),
    UniformaKlasa4 :new FormControl(0, [Validators.required]),
    LibratKlasa4 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa5: new FormControl(0, [Validators.required]),
    TransportiKlasa5 : new FormControl(0, [Validators.required]),
    UniformaKlasa5 :new FormControl(0, [Validators.required]),
    LibratKlasa5 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa6: new FormControl(0, [Validators.required]),
    TransportiKlasa6 : new FormControl(0, [Validators.required]),
    UniformaKlasa6 :new FormControl(0, [Validators.required]),
    LibratKlasa6 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa7: new FormControl(0, [Validators.required]),
    TransportiKlasa7 : new FormControl(0, [Validators.required]),
    UniformaKlasa7 :new FormControl(0, [Validators.required]),
    LibratKlasa7 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa8: new FormControl(0, [Validators.required]),
    TransportiKlasa8 : new FormControl(0, [Validators.required]),
    UniformaKlasa8 :new FormControl(0, [Validators.required]),
    LibratKlasa8 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa9: new FormControl(0, [Validators.required]),
    TransportiKlasa9 : new FormControl(0, [Validators.required]),
    UniformaKlasa9 :new FormControl(0, [Validators.required]),
    LibratKlasa9 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa10: new FormControl(0, [Validators.required]),
    TransportiKlasa10 : new FormControl(0, [Validators.required]),
    UniformaKlasa10 :new FormControl(0, [Validators.required]),
    LibratKlasa10 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa11: new FormControl(0, [Validators.required]),
    TransportiKlasa11 : new FormControl(0, [Validators.required]),
    UniformaKlasa11 :new FormControl(0, [Validators.required]),
    LibratKlasa11 : new FormControl(0, [Validators.required]), 
    
    ShkollaKlasa12: new FormControl(0, [Validators.required]),
    TransportiKlasa12 : new FormControl(0, [Validators.required]),
    UniformaKlasa12 :new FormControl(0, [Validators.required]),
    LibratKlasa12 : new FormControl(0, [Validators.required]), 
  });

  insertVitShkollor(viti) {
    this.vitiList = this.db.list('/konfigurime');
    this.vitiList.push(
      {
        ShkollaKlasa0: viti.ShkollaKlasa0,
        TransportiKlasa0 :viti.TransportiKlasa0,
        UniformaKlasa0 :viti.UniformaKlasa0,
        LibratKlasa0 :viti.LibratKlasa0, 
    
        
        ShkollaKlasa1: viti.ShkollaKlasa1,
        TransportiKlasa1 :viti.TransportiKlasa1,
        UniformaKlasa1 :viti.UniformaKlasa1,
        LibratKlasa1 :viti.LibratKlasa1, 
    
        ShkollaKlasa2: viti.ShkollaKlasa2,
        TransportiKlasa2 :viti.TransportiKlasa2,
        UniformaKlasa2 :viti.UniformaKlasa2,
        LibratKlasa2 :viti.LibratKlasa2, 
    
        ShkollaKlasa3: viti.ShkollaKlasa3,
        TransportiKlasa3 :viti.TransportiKlasa3,
        UniformaKlasa3 :viti.UniformaKlasa3,
        LibratKlasa3 :viti.LibratKlasa3, 
    
        ShkollaKlasa4: viti.ShkollaKlasa4,
        TransportiKlasa4 :viti.TransportiKlasa4,
        UniformaKlasa4 :viti.UniformaKlasa4,
        LibratKlasa4 :viti.LibratKlasa4, 
    
        ShkollaKlasa5: viti.ShkollaKlasa5,
        TransportiKlasa5 :viti.TransportiKlasa5,
        UniformaKlasa5 :viti.UniformaKlasa5,
        LibratKlasa5 :viti.LibratKlasa5, 
    
        ShkollaKlasa6: viti.ShkollaKlasa6,
        TransportiKlasa6 :viti.TransportiKlasa6,
        UniformaKlasa6 :viti.UniformaKlasa6,
        LibratKlasa6 :viti.LibratKlasa6, 
    
        ShkollaKlasa7: viti.ShkollaKlasa7,
        TransportiKlasa7 :viti.TransportiKlasa7,
        UniformaKlasa7 :viti.UniformaKlasa7,
        LibratKlasa7 :viti.LibratKlasa7, 
    
        ShkollaKlasa8: viti.ShkollaKlasa8,
        TransportiKlasa8 :viti.TransportiKlasa8,
        UniformaKlasa8 :viti.UniformaKlasa8,
        LibratKlasa8 :viti.LibratKlasa8, 
    
        ShkollaKlasa9: viti.ShkollaKlasa9,
        TransportiKlasa9 :viti.TransportiKlasa9,
        UniformaKlasa9 :viti.UniformaKlasa9,
        LibratKlasa9 :viti.LibratKlasa9, 
    
        ShkollaKlasa10: viti.ShkollaKlasa10,
        TransportiKlasa10 :viti.TransportiKlasa10,
        UniformaKlasa10 :viti.UniformaKlasa10,
        LibratKlasa10 :viti.LibratKlasa10, 
    
        ShkollaKlasa11: viti.ShkollaKlasa11,
        TransportiKlasa11 :viti.TransportiKlasa11,
        UniformaKlasa11 :viti.UniformaKlasa11,
        LibratKlasa11 :viti.LibratKlasa11, 
    
        ShkollaKlasa12: viti.ShkollaKlasa12,
        TransportiKlasa12 :viti.TransportiKlasa12,
        UniformaKlasa12 :viti.UniformaKlasa12,
        LibratKlasa12 :viti.LibratKlasa12, 
    
      });
  }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      ShkollaKlasa0: 0,
      TransportiKlasa0 :0,
      UniformaKlasa0 :0,
      LibratKlasa0 :0, 

      ShkollaKlasa1: 0,
      TransportiKlasa1 :0,
      UniformaKlasa1 :0,
      LibratKlasa1 :0, 
  
      ShkollaKlasa2: 0,
      TransportiKlasa2 :0,
      UniformaKlasa2 :0,
      LibratKlasa2 :0, 
  
      ShkollaKlasa3: 0,
      TransportiKlasa3 :0,
      UniformaKlasa3 :0,
      LibratKlasa3 :0, 
  
      ShkollaKlasa4: 0,
      TransportiKlasa4 :0,
      UniformaKlasa4 :0,
      LibratKlasa4 :0, 
  
      ShkollaKlasa5: 0,
      TransportiKlasa5 :0,
      UniformaKlasa5 :0,
      LibratKlasa5 :0, 
  
      ShkollaKlasa6: 0,
      TransportiKlasa6 :0,
      UniformaKlasa6 :0,
      LibratKlasa6 :0, 
  
      ShkollaKlasa7: 0,
      TransportiKlasa7 :0,
      UniformaKlasa7 :0,
      LibratKlasa7 :0, 
  
      ShkollaKlasa8: 0,
      TransportiKlasa8 :0,
      UniformaKlasa8 :0,
      LibratKlasa8 :0, 
  
      ShkollaKlasa9:0,
      TransportiKlasa9 :0,
      UniformaKlasa9 :0,
      LibratKlasa9 :0, 
  
      ShkollaKlasa10: 0,
      TransportiKlasa10 :0,
      UniformaKlasa10 :0,
      LibratKlasa10 :0, 
  
      ShkollaKlasa11: 0,
      TransportiKlasa11 :0,
      UniformaKlasa11 :0,
      LibratKlasa11 :0, 
  
      ShkollaKlasa12: 0,
      TransportiKlasa12 :0,
      UniformaKlasa12 :0,
      LibratKlasa12 :0, 
    });

  }
  populateForm(viti,fkey) {

viti.$key = fkey;
console.log(viti);
    this.form.setValue(viti);
  }

  updateViti(viti) 
  {
    console.log(viti.$key);
     this.vitiList = this.db.list('/konfigurime/');
    this.vitiList.update( viti.$key,
      { 
        ShkollaKlasa0: viti.ShkollaKlasa0,
      TransportiKlasa0 :viti.TransportiKlasa0,
      UniformaKlasa0 :viti.UniformaKlasa0,
      LibratKlasa0 :viti.LibratKlasa0, 
  
      ShkollaKlasa1: viti.ShkollaKlasa1,
      TransportiKlasa1 :viti.TransportiKlasa1,
      UniformaKlasa1 :viti.UniformaKlasa1,
      LibratKlasa1 :viti.LibratKlasa1, 
  
      ShkollaKlasa2: viti.ShkollaKlasa2,
      TransportiKlasa2 :viti.TransportiKlasa2,
      UniformaKlasa2 :viti.UniformaKlasa2,
      LibratKlasa2 :viti.LibratKlasa2, 
  
      ShkollaKlasa3: viti.ShkollaKlasa3,
      TransportiKlasa3 :viti.TransportiKlasa3,
      UniformaKlasa3 :viti.UniformaKlasa3,
      LibratKlasa3 :viti.LibratKlasa3, 
  
      ShkollaKlasa4: viti.ShkollaKlasa4,
      TransportiKlasa4 :viti.TransportiKlasa4,
      UniformaKlasa4 :viti.UniformaKlasa4,
      LibratKlasa4 :viti.LibratKlasa4, 
  
      ShkollaKlasa5: viti.ShkollaKlasa5,
      TransportiKlasa5 :viti.TransportiKlasa5,
      UniformaKlasa5 :viti.UniformaKlasa5,
      LibratKlasa5 :viti.LibratKlasa5, 
  
      ShkollaKlasa6: viti.ShkollaKlasa6,
      TransportiKlasa6 :viti.TransportiKlasa6,
      UniformaKlasa6 :viti.UniformaKlasa6,
      LibratKlasa6 :viti.LibratKlasa6, 
  
      ShkollaKlasa7: viti.ShkollaKlasa7,
      TransportiKlasa7 :viti.TransportiKlasa7,
      UniformaKlasa7 :viti.UniformaKlasa7,
      LibratKlasa7 :viti.LibratKlasa7, 
  
      ShkollaKlasa8: viti.ShkollaKlasa8,
      TransportiKlasa8 :viti.TransportiKlasa8,
      UniformaKlasa8 :viti.UniformaKlasa8,
      LibratKlasa8 :viti.LibratKlasa8, 
  
      ShkollaKlasa9: viti.ShkollaKlasa9,
      TransportiKlasa9 :viti.TransportiKlasa9,
      UniformaKlasa9 :viti.UniformaKlasa9,
      LibratKlasa9 :viti.LibratKlasa9, 
  
      ShkollaKlasa10: viti.ShkollaKlasa10,
      TransportiKlasa10 :viti.TransportiKlasa10,
      UniformaKlasa10 :viti.UniformaKlasa10,
      LibratKlasa10 :viti.LibratKlasa10, 
  
      ShkollaKlasa11: viti.ShkollaKlasa11,
      TransportiKlasa11 :viti.TransportiKlasa11,
      UniformaKlasa11 :viti.UniformaKlasa11,
      LibratKlasa11 :viti.LibratKlasa11, 
  
      ShkollaKlasa12: viti.ShkollaKlasa12,
      TransportiKlasa12 :viti.TransportiKlasa12,
      UniformaKlasa12 :viti.UniformaKlasa12,
      LibratKlasa12 :viti.LibratKlasa12, 
  
    });
  }

  deleteViti(viti: string) {
    this.vitiList.remove(viti);
   
  }

  getKonfigurime() {
   return this.db.list('/konfigurime/').snapshotChanges().pipe(take(1));
  }
}
