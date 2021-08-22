import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { AeketimeService } from '../shared/aeketime.service';
import { ArkaService } from '../shared/arka.service';
import { LibratService } from '../shared/librat.service';
import { NotificationService } from '../shared/notification.service';
import { PrintService } from '../shared/print.service';

@Component({
  selector: 'app-librat-nxenesi',
  templateUrl: './librat-nxenesi.component.html',
  styleUrls: ['./librat-nxenesi.component.css']
})
export class LibratNxenesiComponent implements OnInit {
  displayedColumns: string [] =['select','EmriLibri','CmimiShitje','ShtepiaBotuese'];
  listData : MatTableDataSource<any>;
 data : any;
  isLoading : boolean;
  searchKey :string;
  PagaShteseFillestare = 0;
  PagaShteseTot = 0;
  selection = new SelectionModel(true, []) ;
  selected : number = 0;
  totalRows : number;
  mobile : boolean = false
  totZyrtare : number =0
  totShtese : number = 0
  nxenesiData : any;
  totali : number = 0;
  constructor(public arketime : AeketimeService, public  service : LibratService, private notification : NotificationService ,private dialogRef : MatDialogRef<LibratNxenesiComponent>,@Inject(MAT_DIALOG_DATA) data , private datePipe : DatePipe,private printer : PrintService,private arka : ArkaService ) { 
    this.nxenesiData = data;
  }

  ngOnInit() {
    console.log(this.nxenesiData)
    this.getAll()
  }

  getAll()
  {
    this.isLoading = true;
    this.service.getLibrat().subscribe(
      list => {
        let array = list.map(item =>{
          this.isLoading = false;

          return {
            key : item.key,
            ...item.payload.val() as Object};
        }

        );
       let array1  = array.filter(x=>x["Klasa"]==this.nxenesiData.Klasa)
        console.log(array)
        this.listData= new MatTableDataSource(array1);
        // this.totZyrtare = this.listData.filteredData.map((t)=>{ return t.PagaNetoMujore*t.MuajPage -t.PaguarNeto; }).reduce((acc, value) => acc + value, 0);
        // this.totShtese = this.listData.filteredData.map((t)=>{ return t.PagaShtese*t.MuajPage -t.PaguarShtese }).reduce((acc, value) => acc + value, 0);
        
        this.totalRows = this.listData.data.length;

        this.selection = new SelectionModel<any>(true, []);
        console.log(this.selection.selected);
        this.calculateToatal()
        this.data = array;

        if(this.listData.data.length==0)
        {
        this.isLoading = false;
        this.listData.data.forEach(row => this.selection.select(row));
        
        }
      });

}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.listData.data.length;
  return numSelected === numRows;
}
removeSelectedRows() {

  this.selection.selected.forEach(item => {
    let index: number = this.data.findIndex(d => d === item);
    console.log(this.data.findIndex(d => d === item));
    this.data.slice(index)
    this.listData = new MatTableDataSource(this.data);
    this.calculateToatal();
  });
  this.selection = new SelectionModel(true, []);
console.log(this.selection.selected.length)
  // this.applyFilter();


}
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.listData.data.forEach(row => {this.selection.select(row);});
    this.selected =  this.selection.selected.length;
    this.totalRows = this.listData.data.length;
    console.log(this.selection.selected.length);
    // this.applyFilter();
    this.calculateToatal() 

}
selNr(){
this.selected = this.selection.selected.length;
}

onClose() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.dialogRef.close(); 
 }




  onSubmit(){
  this.service.shitLibra(this.selection.selected,this.nxenesiData.key);
  let arketimiDate = new Date().toLocaleDateString();
  this.datePipe.transform(arketimiDate,"dd-MM-yyyy");
  let arketimi  = {
    Data :arketimiDate,
    Koment : this.nxenesiData.Emri + ' ' + this.nxenesiData.Mbiemri,
    Monedha : 'LEK',
    Sasia : this.totali
  }
//  let key =  this.arketime.insertArketime("Libra",arketimi);
  //insert transaksionin
 this.arka.insertTransaksion("BlerjeLibra","",arketimi.Koment,"LEK",this.totali,"Arketime Libra",this.selection.selected);
 //update totali
  this.arka.updateTotali(Math.abs(this.totali),"LEK");
  
  this.printer.printShpenzime("Libra",arketimi.Koment,this.totali,"LEK");
  this.printer.printShpenzime("Libra",arketimi.Koment,this.totali,"LEK");

  //this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);

  }


  ktheLibra(){
    this.service.ktheLibra(this.selection.selected,this.nxenesiData.key);
    let arketimiDate = new Date().toLocaleDateString();
    this.datePipe.transform(arketimiDate,"dd-MM-yyyy");
    let arketimi  = {
      Data :arketimiDate,
      Koment : this.nxenesiData.Emri + ' ' + this.nxenesiData.Mbiemri,
      Monedha : 'LEK',
      Sasia : this.totali
    }
  //  let key =  this.arketime.insertArketime("Libra",arketimi);
    //insert transaksionin
   this.arka.insertTransaksion("KthimLibra","",arketimi.Koment,"LEK",this.totali,"Kthim Libra",this.selection.selected);
   //update totali
    this.arka.updateTotali(-Math.abs(this.totali),"LEK");
    
    this.printer.printShpenzime("Blerje Libra",arketimi.Koment,this.totali,"LEK");
    this.printer.printShpenzime("Kthim Libra",arketimi.Koment,this.totali,"LEK");
  }



  calculateToatal(){
    this.totali = 0;
    for (let index = 0; index < this.selection.selected.length; index++) {
   this.totali = this.totali +  this.selection.selected[index].CmimiShitje;
    }

  }

  
}
