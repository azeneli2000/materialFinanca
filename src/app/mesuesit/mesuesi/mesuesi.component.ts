import { Component, OnInit } from '@angular/core';
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatDialogRef} from '@angular/material';


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
  pagaSig =this.service.form.controls['PagaSig'].value;
  pagaBruto =  this.service.form.controls['Paga'].value;
  // pagaNetoZyrtare =this.service.form.controls['PagaNetoMujore'].value;;
  // pagaNetoMujore =this.service.form.controls['PagaTotMujore'].value;;
  // pagaShtese =this.service.form.controls['PagaShtese'].value;;
  pagaNetoZyrtare =0;
  pagaNetoMujore =0;
  pagaShtese =0;
 
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


  onCheck(){

    //
  }
  onChangePagaSig(){
    this.pagaSig =this.service.form.controls['PagaSig'].value;
   this.llogaritPagaSig(this.pagaBruto,this.pagaSig);
   this.service.form.controls['PagaNetoMujore'].setValue(this.pagaNetoZyrtare);
   this.service.form.controls['PagaShtese'].setValue(this.pagaShtese);
   this.service.form.controls['PagaTotMujore'].setValue(this.pagaNetoMujore);
  }

  onChangePagaTot(totValue){
    // this.llogaritPagaSig(this.pagaBruto,this.pagaSig);
    // this.service.form.controls['PagaNetoMujore'].setValue(this.pagaNetoZyrtare);
 
   
    this.pagaShtese =Math.round (totValue -  this.service.form.controls['PagaNetoMujore'].value);
    
     this.service.form.controls['PagaShtese'].setValue(this.pagaShtese);
  
  }

  llogaritPagaSig(pagaBruto, pagaSig) {
    let dp = pagaSig * 0.112; //sigurimet e punonjesit
    let pnz = pagaSig - dp;  // paga neto zyrtare  
   let prm = pagaBruto-dp; // paga bruto mesuesi
    let pnm: number = 0;
    //tatimi mbi pagen
    if (pagaSig <= 30000)
    { 
    pnm = pnz;
    this.pagaNetoZyrtare = Math.round(pnz);
    this.pagaShtese = Math.round(pagaBruto - this.pagaNetoZyrtare);
    }
    if (pagaSig > 30000 && pagaSig < 130000)
    {
      this.pagaNetoZyrtare =Math.round( pnz - ((pagaSig - 30000) * 0.13));
     this.pagaShtese = Math.round( pagaBruto- (dp + ((pagaSig - 30000) * 0.13))  - this.pagaNetoZyrtare);
    }

    if (pagaSig >= 130000)
      pnm = pnz - ((pagaSig - 30000) * 0.15);
  
     
    
   // this.pagaShtese = prm-this.pagaNetoZyrtare-((pagaSig - 30000) * 0.13);
    this.pagaNetoMujore = this.pagaShtese + this.pagaNetoZyrtare;  
    }


  ngOnInit() {
    // this.service.form.controls['PagaNetoMujore'].disable();
    // this.service.form.controls['PagaShtese'].disable();
    // this.service.form.controls['PagaTotMujore'].disable();
  }

}
