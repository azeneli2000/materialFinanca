import { Component, OnInit } from '@angular/core';
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatDialogRef} from '@angular/material'


export interface kat {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-mesuesi',
  templateUrl: './mesuesi.component.html',
  styleUrls: ['./mesuesi.component.css']
})
export class MesuesiComponent implements OnInit {


  Kategorite : kat[]= [
    {value : 1, viewValue : "Kat I" } ,
    {value : 2, viewValue : "Kat II" } ,
    {value : 3, viewValue : "Kat III" } ,
    {value : 4, viewValue : "Kat IV" } 
];
  constructor(private service : MesuesiService, private notification : NotificationService ,private dialogRef : MatDialogRef<MesuesiComponent>) { }

  onSubmit(){
    if(this.service.form.valid)
    {
      if (!this.service.form.get('$key').value)
      this.service.insertMesuesi(this.service.form.value);
      else
      this.service.updateMesuesit(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notification.success("Mesuesi u ruajt");
    this.onClose();
    }
   

   
  
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  ngOnInit() {
    
  }

}
