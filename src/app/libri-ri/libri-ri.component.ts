import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LibratService } from '../shared/librat.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-libri-ri',
  templateUrl: './libri-ri.component.html',
  styleUrls: ['./libri-ri.component.css']
})
export class LibriRiComponent implements OnInit {
  ShtepiteBotuese = [
    {value : "MediaPrint", viewValue : "MediaPrint" } ,
    {value : "Albas", viewValue : "Albas" } ,
    {value : "Sidi", viewValue : "Sidi" } ,
    {value : "Ideart", viewValue : "Ideart" } ,
    {value : "Erik", viewValue : "Erik" } ,
    {value : "Filara", viewValue : "Filara" } ,
    {value : "Pegi", viewValue : "Pegi" },
    {value : "ShkronjePasShkronje", viewValue : "ShkronjePasShkronje" },
    {value : "DitaPrint ", viewValue : "DitaPrint" },


];

Klasat = [
  {value :0, viewValue : "0" } ,
  {value :1, viewValue : "I" } ,
  {value :2, viewValue : "II" } ,
  {value :3, viewValue : "III" } ,
  {value : 4, viewValue : "IV" } ,
  {value :5, viewValue : "V" } ,
  {value : 6, viewValue : "VI" } ,
  {value :7, viewValue : "VII" }, 
  {value :8, viewValue : "VIII" },
  {value :9, viewValue : "IX" },
  {value :10, viewValue : "X" },
  {value :11  , viewValue : "XI" },
  {value :12, viewValue : "XII" },

];
constructor(public service : LibratService, private notification : NotificationService ,private dialogRef : MatDialogRef<LibriRiComponent> ) { }


  ngOnInit() {
  }

  onSubmit(){
    if(this.service.form.valid)
    {


          if (!this.service.form.get('$key').value){
            this.service.insertLiber(this.service.form.value);
           // this.onClose();
          }
          else
            this.service.updateLiber(this.service.form.value);
          // this.service.form.reset();
          // this.service.initializeFormGroup();
            this.notification.success("Libri u ruajt");
           // this.onClose();
  }
}

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();  }

  
}
