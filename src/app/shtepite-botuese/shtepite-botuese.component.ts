import { DatePipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PagesaShtepiteBotueseComponent } from '../pagesa-shtepite-botuese/pagesa-shtepite-botuese.component';
import { ArkaService } from '../shared/arka.service';
import { LibratService } from '../shared/librat.service';
import { PrintService } from '../shared/print.service';
import { ShtepiteBotueseService } from '../shared/shtepite-botuese.service';

@Component({
  selector: 'app-shtepite-botuese',
  templateUrl: './shtepite-botuese.component.html',
  styleUrls: ['./shtepite-botuese.component.css']
})
export class ShtepiteBotueseComponent implements OnInit {
  detyrimiShtepiaBotuese: number = 0;
  lekeTembledhura: number = 0;
  fitimi: number = 0;
  shiturShtepiaBotuese: number;

  constructor(public librat : LibratService, public shtepiteBotuese: ShtepiteBotueseService,private datePipe : DatePipe,private printer : PrintService,private arka : ArkaService,private dialog :MatDialog) { }


  isLoading : boolean = false;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Emri','Klasa','Sasia','Mbetur'];
  totEUR : number = 0;
  totLEK : number = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  displayDate;
  mobile : boolean = false
  
  
  arrayLibrat = [];
  arrayLibratShtepiaBotuese = [];
  arrayShtepiteBotuese = [];
  selectedBotuese = {};
  ngOnInit() {
     
    //populating arrayLibrat
    this.librat.getLibrat().subscribe(list=>{
    this.arrayLibrat = list.map(item =>{
     return {
       key : item.key,
       ...item.payload.val() as Object
      }

    }) 

    });


    // populating arrayShtepitebotuese
this.shtepiteBotuese.getShtepiteBotuese().subscribe(list=>{
  this.arrayLibratShtepiaBotuese = list.map(item => {
    return{
      key : item.key,
      ...item.payload.val() as Object
    }
  })
});

  }

  getLibrat(emri) {
    this.isLoading = true;
    this.shtepiteBotuese.getShtepiteBotuese().subscribe(
      list => {
        let array = list.map(item => {
        this.isLoading = false;
        return {
            $key: item.key,
            ...item.payload.val() as Object
          };
        
        });
        array.sort(function (a,b){
          let c = new Date(a["Data"]);
          let d = new Date(b["Data"]);
          return +d - +c;
        });
    
        //
        this.listData = new MatTableDataSource(array);

        this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Sasia-t.Paguar; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Sasia-t.Paguar;else return 0;}).reduce((acc, value) => acc + value, 0);
console.log('eur : ' + this.totEUR + 'lek :' + this.totLEK);
        if (this.listData.data.length == 0)
        {
          this.isLoading = false;
          console.log('bosh');
        }
      
        this.listData.sort = this.sort;
        if(!this.mobile)
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele pervec actions dhe $key
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'Actions' && ele != 'PagesaShkolla' && ele != 'PaguarShkolla' && ele != 'Indeksi' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
        //   });
        // };


      });
  }


  onChanageShtepiteBotuese(selectedValue) {
  
  this.selectedBotuese = this.arrayLibratShtepiaBotuese.find(item=>{return item["Emri"]==selectedValue.value});
  console.log(this.selectedBotuese)
  let newArray = []
   newArray = this.arrayLibrat.filter(item=> {return item["ShtepiaBotuese"]==selectedValue.value})
   this.listData = new MatTableDataSource(newArray);
   console.log(newArray)

   this.listData.sort = this.sort;
   this.listData.paginator = this.paginator;


   this.detyrimiShtepiaBotuese =
   newArray     
     .map((t) => t.CmimiBlerje*t.SasiaShitur)
     .reduce((acc, value) => acc + value, 0) - this.selectedBotuese["Paguar"];
   
   
    this.shiturShtepiaBotuese = 
    newArray     
    .map((t) => t.CmimiBlerje*t.SasiaShitur)
    .reduce((acc, value) => acc + value, 0) ;

     this.lekeTembledhura  = 
    newArray
    .map((t) => t.CmimiShitje*t.SasiaShitur)
    .reduce((acc, value) => acc + value, 0);
    this.fitimi =  this.lekeTembledhura - this.shiturShtepiaBotuese
}

onSubmit(){
  let arketimiDate = new Date().toLocaleDateString();
  this.datePipe.transform(arketimiDate,"dd-MM-yyyy");
// this.shtepiteBotuese.form.controls.Data.setValue(arketimiDate) ;
 let key =  this.selectedBotuese["key"]


  //insert transaksionin
  this.arka.insertTransaksion("ShtepiBotuese",key,this.selectedBotuese["Emri"],"LEK", this.shtepiteBotuese.form.controls.Paguar.value,"Pagese Shtepi Botuese " ,'')
  //update totali
   this.arka.updateTotali(Math.abs(parseInt( this.shtepiteBotuese.form.controls.Paguar.value)),"LEK");

   //update shtepine botuese
   this.shtepiteBotuese.updatePagesa(parseInt(this.shtepiteBotuese.form.controls.Paguar.value),this.selectedBotuese);
  
  // this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
  // this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
  
  

  
}

onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
 
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
  // this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Sasia-t.Paguar}).reduce((acc, value) => acc + value, 0);
  // this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Sasia-t.Paguar}).reduce((acc, value) => acc + value, 0);
}



onCreate(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  //dialogConfig.width = "60%";
  this.dialog.open(PagesaShtepiteBotueseComponent, dialogConfig);
}


}
