import { Component, OnInit,  AfterContentInit } from '@angular/core';
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatDialogRef} from '@angular/material';
import { LendaService } from 'src/app/shared/lenda.service';


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
   lendet : [] ;
   muajReale=0;

  Kategorite : kat[]= [
    {value : 3, viewValue : "Kat I" } ,
    {value : 2, viewValue : "Kat II" } ,
    {value : 1, viewValue : "Kat III" } ,
    {value : 0, viewValue : "Kat IV" } 
];
  constructor(public service : MesuesiService, private notification : NotificationService ,private dialogRef : MatDialogRef<MesuesiComponent>,private listLendet : LendaService, ) { }

  onSubmit(){

    if(this.service.form.valid)
    {
      let changed : boolean;
      if(!(this.service.form.controls['Kategoria'].pristine && this.service.form.controls['Vjetersia'].pristine))
      changed = true;
      else
      changed = false;
      if (!this.service.form.get('$key').value)
      this.service.insertMesuesi(this.service.form.value);
      else
      this.service.updateMesuesit(this.service.form.value,changed);
      // this.service.form.reset();
      // this.service.initializeFormGroup();
      this.notification.success("Mesuesi u ruajt");
    this.onClose();
    }
   

   
  
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }


  onCheck(a){

    //
  }
  onChangePagaSig(a){
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
     //this.service.form.controls['PagaTotMujore'].setValue(this.pagaNetoMujore);

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
    this.pagaShtese = Math.round(pagaBruto - this.pagaSig);
   
  }
    if (pagaSig > 30000 && pagaSig < 130000)
    {
      this.pagaNetoZyrtare =Math.round( pnz - ((pagaSig - 30000) * 0.13));
     this.pagaShtese = Math.round( pagaBruto- (dp + ((pagaSig - 30000) * 0.13))  - this.pagaNetoZyrtare);
    }

    if (pagaSig >= 130000)
     {

      this.pagaNetoZyrtare =Math.round( pnz - ((pagaSig - 30000) * 0.15));
      this.pagaShtese = Math.round( pagaBruto- (dp + ((pagaSig - 30000) * 0.15))  - this.pagaNetoZyrtare);
     }
  
     
    
   // this.pagaShtese = prm-this.pagaNetoZyrtare-((pagaSig - 30000) * 0.13);
    this.pagaNetoMujore = this.pagaShtese + this.pagaNetoZyrtare;  
    }


  ngOnInit() {
    // this.service.form.controls['PagaNetoMujore'].disable();
    // this.service.form.controls['PagaShtese'].disable();
    // this.service.form.controls['PagaTotMujore'].disable();
    if (this.service.form.get('$key').value)
    this.gjejLendet();

  }
  // ngAfterContentInit()
  // {
  //   if (this.service.form.get('$key').value)
  //   this.muajReale= this.llogaritMuajPuneReale();
  // }
  gjejLendet()
  {
    

    let idMesuesi = this.service.form.controls["$key"].value;
  
    this.listLendet.getLendet(idMesuesi.toString()).subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()
          };       
        });
       
       this.lendet = array as [];
       this.llogaritMuajPuneReale()

      });
  }


llogaritMuajPuneReale()
  { 
    let oreMesimore =0 ;
      let puneRezerve =0;
    
    
    let ditePushimi;
    if (this.service.form.controls["Jashtem"].value==true)
    {
      puneRezerve = 5;
      ditePushimi = 12;
    }
    else
    {
      ditePushimi = 14;
      puneRezerve = 10;
    }
    
       
    let oreTot=0;
    let inst = false;
    let colspan;
    let lejeZakonshme =0;
    let festaZyrtare = 0;
    let puneNeDispozicion =0; 
    let kujdestari = false;
    console.log(this.lendet);
 
    this.lendet.forEach(element => {
    
    
     if(element["Emri"]=="Kujdestari")
    kujdestari =true;
     if (element["Emri"]=="Mirembajtje"||element["Emri"]=="Shoqerim"||element["Emri"]=="Pune Admin"||element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
     {
       if(element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
       {
         oreMesimore = oreMesimore;
         oreTot=oreTot;
       }
      else
      {
        oreMesimore = oreMesimore + element["Javetot"]* element["Ore"]/2;
        oreTot = oreTot + element["Javetot"]* element["Ore"]/2;
    
      }
     }
     else 
     {
      oreMesimore = oreMesimore + element["Javetot"]* element["Ore"];
      oreTot = oreTot + element["Javetot"]* element["Ore"];
    
     }
    
    });
    if(this.service.form.controls["Jashtem"].value==false)
      puneRezerve = 10;
    let punaMesimore  = Math.round(oreMesimore/4) ;
    if (punaMesimore>175)
        punaMesimore =175;
    let muajVjetoreNeto = (punaMesimore+puneRezerve+ditePushimi +(((punaMesimore+puneRezerve)/22)*3))/22;
   console.log(muajVjetoreNeto);
      if (this.service.form.get('$key').value)
    this.muajReale=Math.round( muajVjetoreNeto*100)/100;
    return muajVjetoreNeto;
    //  let pagaVjetoreNeto : number =Math.round((Math.round(12*100)/100*this.pagaNetoMujore));
    // let puneNeDispoziocion : number = (12-((punaMesimore+puneRezerve+ditePushimi +(((punaMesimore+puneRezerve)/22)*3))/22))*22;
    
    }

}
