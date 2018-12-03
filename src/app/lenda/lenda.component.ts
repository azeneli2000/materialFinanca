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
    {value : '20', viewValue : "Matematike" } ,
    {value :  '20', viewValue : "Gjuhe" } ,
    {value :  '15', viewValue : "Fizike" } ,
    {value :  '15', viewValue : "Kimi" }, 
    {value :  '15', viewValue : "Anglisht" }, 
    {value :  '15', viewValue : "Dituri" }, 
    {value :  '15', viewValue : "Ekonomi" }, 
    {value :  '15', viewValue : "TIK gjimnaz" }, 
    {value :  '15', viewValue : "Frengjisht" }, 

    {value :  '10', viewValue : "Biologji" }, 
    {value :  '10', viewValue : "Histori" }, 
    {value :  '10', viewValue : "Gjeografi" }, 
    {value :  '10', viewValue : "TIK CMU" }, 
    {value :  '10', viewValue : "Ed Fizik" }, 
    {value :  '5', viewValue : "Ed Shoq" }, 
    {value :  '5', viewValue : "Ed karriere"}, 
    {value :  '5', viewValue : "Arte" }, 
    {value :  '5', viewValue : "Module" } ,
    {value :  '5', viewValue : "Teater" } ,
    {value :  '5', viewValue : "Aftesim" } ,
    {value :  '30', viewValue : "Mat pjekurie" } ,
    {value :  '30', viewValue : "Gjuhe pjekurie" } ,
    {value :  '30', viewValue : "Letersi pjekurie" } ,
    {value :  '20', viewValue : "Anglisht Pjekurie" } ,
    {value :  '20', viewValue : "Anglisht lirimi" } ,
    {value :  '30', viewValue : "Mat lirimi" } ,
    {value :  '30', viewValue : "Gjuhe lirimi" } ,
    {value :  '30', viewValue : "Gjuhe lirimi" } ,
    {value :  '0', viewValue : "Pune Admin" } ,
    {value :  '0', viewValue : "Veprimtari" } ,
    {value :  '0', viewValue : "Shoqerim" } ,
    {value :  '0', viewValue : "Kujdestari" }
    
];
Klasat : combo[]= [
  {value : '0', viewValue : "0" } ,
  {value : '1', viewValue : "I" } ,
  {value :  '2', viewValue : "II" } ,
  {value :  '3', viewValue : "III" } ,
  {value :  '4', viewValue : "IV" }, 
  {value :  '5', viewValue : "V" }, 
  {value :  '6', viewValue : "VI" }, 
  {value :  '7', viewValue : "VII" }, 
  {value :  '8', viewValue : "VIII" }, 
  {value :  '9', viewValue : "IX" } ,
  {value :  '10', viewValue : "X" } ,
  {value :  '11', viewValue : "XI" } ,
  {value :  '12', viewValue : "XII" } 
];
constructor(private service : LendaService, private notification : NotificationService ,private dialogRef : MatDialogRef<LendaComponent>,private mesZ : MesuesiZgjedhurService) { }
  idMesuesi;   
  pagaFillestareMesuesi;
  difUpdate : number;
  fillimiUpdate : number;
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
shtesaInst : number = 0;
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
  this.llogaritPagen();

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
onChangeShtesa(shtesaInst){
  this.shtesaInst =parseInt(shtesaInst) ;
  this.llogaritPagen();
}
onCheck(checked){
  if(checked)
  this.paraleleNr = 0;
  else 
  this.paraleleNr = 1;
  this.llogaritPagen();
}


llogaritPagen()
{
  this.pagaLenda = ((this.perqindjaLenda+this.perqindjaKlasa + this.vjetersia*0.5 + (this.nrNxenesishKlase-16)*2.5 + this.paraleleNr*2 + this.kategoria*5 + this.cikliNr + this.shtesaInst-10) * this.baza/100) + this.baza;
  this.pagaBrutoMujore = Math.round((this.pagaLenda* this.oreJave*this.javeTot/12)*100/116.7);
  this.pagaBrutoVjetore = Math.round(  this.pagaLenda* this.oreJave*this.javeTot);
   this.difUpdate =  this.pagaBrutoMujore- this.fillimiUpdate;
   //this.service.form.controls['Paga'].setValue(this.pagaBrutoMujore);
}

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        this.service.form.controls['Paga'].setValue(this.pagaBrutoMujore);
        console.log("paga e mesuesit u vendos :" + this.service.form.controls['Paga'].value);
        let pagaTotMesuesi = this.pagaFillestareMesuesi + this.service.form.controls['Paga'].value;
        this.service.insertLenda(this.service.form.value, pagaTotMesuesi);
      }
      else
      {
        this.service.form.controls['Paga'].setValue(this.pagaBrutoMujore);
        let dif = this.pagaFillestareMesuesi + this.difUpdate;
        this.service.updateLendet(this.service.form.value,dif);
      }

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

  ngAfterContentInit(){
   
    
       this.javeTot=this.service.form.controls['Javetot'].value;
       this.oreJave=this.service.form.controls['Ore'].value;
       this.nrNxenesishKlase=this.service.form.controls['NrNxenesish'].value;
       this.onCheck(this.service.form.controls['Paralele'].value); //vendos paralelenr
       this.onSelectLenda(this.service.form.controls['Emri'].value);//vemdos perqindjen lenda
       this.onSelectKlasa(this.service.form.controls['Klasa'].value);//vendos perqindjen klasa
       this.shtesaInst =this.service.form.controls['ShtesaInst'].value; //vendos paralelenr

       
      this.fillimiUpdate = this.service.form.controls['Paga'].value;
       this.pagaBrutoMujore=this.service.form.controls['Paga'].value;

       console.log( this.javeTot,
       this.oreJave,
       this.nrNxenesishKlase,
       this.paraleleNr, 
       this.perqindjaLenda,
       this.perqindjaKlasa,this.baza,this.kategoria,this.mesZ.mesuesiZgjedhurId);

     
  }

 

}
