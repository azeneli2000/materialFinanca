import { Component, OnInit } from '@angular/core';
import { LendaService } from 'src/app/shared/lenda.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatDialogRef} from '@angular/material'
import{ ActivatedRoute} from '@angular/router'
import { MesuesiZgjedhurService } from '../shared/mesuesi-zgjedhur.service';

export interface combo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-lenda',
  templateUrl: './lenda.component.html',
  styleUrls: ['./lenda.component.css']
})
export class LendaComponent implements OnInit {


  Lendet : combo[]= [
    {value : 'Matematike', viewValue : "Matematike111" } ,
    {value :  'Fizike', viewValue : "Fizike222" } ,
    {value :  'Kimi', viewValue : "Kimi22" } ,
    {value :  'Letersi', viewValue : "Kimi44" } 
];

Klasat : combo[]= [
  {value : '1', viewValue : "I" } ,
  {value :  '2', viewValue : "II" } ,
  {value :  '3', viewValue : "III" } ,
  {value :  '4', viewValue : "IV" } 
];
constructor(private service : LendaService, private notification : NotificationService ,private dialogRef : MatDialogRef<LendaComponent>,private mesZ : MesuesiZgjedhurService) { }
  idMesuesi;   

onSubmit(){
  if(this.service.form.valid)
  {
    if (!this.service.form.get('$key').value)
    this.service.insertLenda(this.service.form.value);
    else
    this.service.updateLendet(this.service.form.value);
      this.service.form.reset();
    this.service.initializeFormGroup();
    this.notification.success("Mesuesi u ruajt");
  this.onClose();
  }
 }

 onClose() {
   console.log(this.service.form.value);
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.dialogRef.close();
}


  ngOnInit() {
    this.idMesuesi = this.mesZ.mesuesiZgjedhurId;
  }

}
