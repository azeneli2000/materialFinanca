import { Component, OnInit } from '@angular/core';
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pagashtese',
  templateUrl: './pagashtese.component.html',
  styleUrls: ['./pagashtese.component.css']
})
export class PagashteseComponent implements OnInit {
pagesaShtese = 0;

  constructor(private service : MesuesiService, private notification : NotificationService ,private dialogRef : MatDialogRef<PagashteseComponent>) { }

  ngOnInit() {
    this.pagesaShtese  = this.service.form.controls['PagaShtese'].value;
  }

  onSubmit(){

    if(this.service.form.valid)
    
    {
      this.service.updatePaguarShtese(this.service.form.value,this.pagesaShtese);
      this.notification.success("Paga u ruajt");
    } 
      
    this.onClose();
    
   

   
  
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
