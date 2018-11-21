import { Component, OnInit, AfterContentInit } from '@angular/core';
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
    {value : '25', viewValue : "Matematike111" } ,
    {value :  '12', viewValue : "Fizike222" } ,
    {value :  '10', viewValue : "Kimi22" } ,
    {value :  '7', viewValue : "Kimi44" } 
];

Klasat : combo[]= [
  {value : '1', viewValue : "I" } ,
  {value :  '2', viewValue : "II" } ,
  {value :  '3', viewValue : "III" } ,
  {value :  '4', viewValue : "IV" } 
];
constructor(private service : LendaService, private notification : NotificationService ,private dialogRef : MatDialogRef<LendaComponent>,private mesZ : MesuesiZgjedhurService) { }
  idMesuesi;   
  pagaFillestareMesuesi;

  lendaZgjedhur : string;
//te dhena per llogaritjen e pages
  baza : number = 0;
perqindjaLenda : number = 0;
perqindjaKlasa : number = 0;
mesuesiVjetersia : number =0 ;
kategoria : number = 0;
vjetersia : number = 0;
nrNxenesishKlase : number= 0;
paraleleNr :number = 0;
cikliNr : number = 0;
pagaLenda : number= 0;
oreJave : number= 0;
javeTot : number= 0;
pagaBrutoMujore : number = 0;
pagaBrutoVjetore : number =0;
onSelectLenda(lenda){
    this.baza = this.service.getBaza(lenda);
    this.perqindjaLenda = this.service.getPerqindjaLenda(lenda);
    this.llogaritPagen();
   
}

onSelectKlasa(klasa){
  this.perqindjaKlasa = this.service.getPerqindjaKlasa(klasa);
  this.cikliNr = this.service.getCikli(klasa);
  this.llogaritPagen;

}
onChangeNxenesit(nrNxenes){
  this.nrNxenesishKlase = nrNxenes;
 
  this.llogaritPagen();
  

}
onChangeJavet(javet){
  this.javeTot = javet;
 
  this.llogaritPagen();
  

}
onChangeOret(oret){
  this.oreJave = oret;
  this.llogaritPagen();
  

}

onCheck(checked){
  if(checked)
  this.paraleleNr = 1;
  else 
  this.paraleleNr = 0;
  this.llogaritPagen();

}


llogaritPagen()
{
  this.pagaLenda = ((this.perqindjaLenda+this.perqindjaKlasa + this.vjetersia*0.5 + (this.nrNxenesishKlase-16)*2.5 + this.paraleleNr*2 + this.kategoria*5 + this.cikliNr) * this.baza/100) + this.baza;
  this.pagaBrutoMujore = Math.round(this.pagaLenda* this.oreJave*this.javeTot/12);
  this.pagaBrutoVjetore = Math.round(  this.pagaLenda* this.oreJave*this.javeTot);
}
 
onSubmit(){
  if(this.service.form.valid)
  {
    this.service.form.controls['Paga'].setValue(this.pagaBrutoMujore) ;
    console.log("paga e mesuesit u vendos :" + this.service.form.controls['Paga'].value);
  let pagaTotMesuesi = this.pagaFillestareMesuesi + this.service.form.controls['Paga'].value;
   
    this.service.insertLenda(this.service.form.value,pagaTotMesuesi);
   
  
  
    // this.service.updateLendet(this.service.form.value);
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
    this.mesZ.mz.subscribe((mes)=>{
      this.kategoria= mes[1];      
      this.vjetersia= mes[4];      
      this.pagaFillestareMesuesi= mes[3]; 
     });

     //this.llogaritPagen();
  }

  // ngAfterContentInit(){
   
    
  //      this.javeTot=this.service.form.controls['Javetot'].value;
  //      this.oreJave=this.service.form.controls['Ore'].value;
  //      this.nrNxenesishKlase=this.service.form.controls['NrNxenesish'].value;
  //      this.onCheck(this.service.form.controls['Paralele'].value); //vendos paralelenr
  //      this.onSelectLenda(this.service.form.controls['Emri'].value);//vemdos perqindjen lenda
  //      this.onSelectKlasa(this.service.form.controls['Klasa'].value);//vendos perqindjen klasa

       

  //      this.pagaBrutoMujore=this.service.form.controls['Paga'].value;

  //      console.log( this.javeTot,
  //      this.oreJave,
  //      this.nrNxenesishKlase,
  //      this.paraleleNr, 
  //      this.perqindjaLenda,
  //      this.perqindjaKlasa,this.baza,this.kategoria,this.mesZ.mesuesiZgjedhurId)

     
  // }

 

}
