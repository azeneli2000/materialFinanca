import { Component, OnInit } from '@angular/core';
import { BankatService } from '../shared/bankat.service';
import { NotificationService } from '../shared/notification.service';
import { MatDialogRef } from '@angular/material';
import { PrintService } from '../shared/print.service';
import { ArkaService } from '../shared/arka.service';

@Component({
  selector: 'app-pagesebanka',
  templateUrl: './pagesebanka.component.html',
  styleUrls: ['./pagesebanka.component.css']
})
export class PagesebankaComponent implements OnInit {

  principali = 0;

  constructor(public service : BankatService, private notification : NotificationService ,private dialogRef : MatDialogRef<PagesebankaComponent>,private printer : PrintService,private arka : ArkaService) { }

  ngOnInit() {
  //   this.principali  = this.service.form.controls['principali'].value;
  }

  onSubmit(){
//     console.log(this.service.form.value.MuajPage*this.service.form.value.PagaShtese);
// console.log(this.service.form.value.PaguarShtese + this.pagesaShtese);
 
      this.service.updatePaguar(this.principali);
     // this.printer.print22('PAGESE MESUESI',this.service.form.controls['Emri'].value,this.service.form.controls['Mbiemri'].value,this.pagesaShtese,'LEK');
this.arka.getTotali();
     this.arka.insertTransaksion("PP",this.service.formPaguar.$key,this.service.formPaguar.Koment,this.service.formPaguar.Monedha,this.principali,"Principali " + this.service.formPaguar.Banka,this.service.formPaguar.Banka);
this.arka.updateTotali(-Math.abs(this.principali),this.service.formPaguar.Monedha);      
this.notification.success("Principali u modifikua me sukses !");
      this.onClose();
    } 
    
      
  
    
   

   
  
  

  onClose() {
    this.service.initializePaguar();
    this.dialogRef.close();
  }

}

