import { Component, OnInit } from '@angular/core';
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';
import { PrintService } from 'src/app/shared/print.service';

@Component({
  selector: 'app-pagashtese',
  templateUrl: './pagashtese.component.html',
  styleUrls: ['./pagashtese.component.css']
})
export class PagashteseComponent implements OnInit {
pagesaShtese = 0;

  constructor(private service : MesuesiService, private notification : NotificationService ,private dialogRef : MatDialogRef<PagashteseComponent>,private printer : PrintService) { }

  ngOnInit() {
    this.pagesaShtese  = this.service.form.controls['PagaShtese'].value;
  }

  onSubmit(){
    console.log(this.service.form.value.MuajPage*this.service.form.value.PagaShtese);
console.log(this.service.form.value.PaguarShtese + this.pagesaShtese);
    if( (this.service.form.value.PaguarShtese + this.pagesaShtese)<= (this.service.form.value.MuajPage*this.service.form.value.PagaShtese) )   
    {
      this.service.updatePaguarShtese(this.service.form.value,this.pagesaShtese);
      this.printer.print22('PAGESE MESUESI',this.service.form.controls['Emri'].value,this.service.form.controls['Mbiemri'].value,this.pagesaShtese,'LEK');

      this.notification.success("Paga u ruajt");
    } 
    else
    this.notification.warn("Pagesa kalon pagesen totale te mesuesit");
      
    this.onClose();
    
   

   
  
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
