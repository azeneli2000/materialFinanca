import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { BankatService } from '../shared/bankat.service';
import { DatePipe } from '@angular/common';
import { PrintService } from '../shared/print.service';
import { ArkaService } from '../shared/arka.service';
import { FormControl } from '@angular/forms';
import { PagesebankaComponent } from '../pagesebanka/pagesebanka.component';

@Component({
  selector: 'app-bankat',
  templateUrl: './bankat.component.html',
  styleUrls: ['./bankat.component.css']
})
export class BankatComponent implements OnInit {

  constructor(public bankat: BankatService,private datePipe : DatePipe,private printer : PrintService,private arka : ArkaService,private dialog :MatDialog) { }

  myControl = new FormControl();
  options = ['Principali'];
  filteredOptions: Observable<string[]>;
  Bankat = [
    { value: 'FIB' },{ value: 'BKT' }, { value: 'Intesa' }, { value: 'Credins'  }, { value: 'Personale'  }

  ];
  Monedhat = [
    { value: 'LEK' }, { value: 'EUR' }, { value: 'DOLLARE' }

  ];

  isLoading : boolean = false;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Data','Sasia','Paguar','Mbetur','Koment','Actions'];
  totEUR : number = 0;
  totLEK : number = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  displayDate;
  mobile : boolean = false

  private _filter(value: string): string[] {
    if(value!=''&& value!=null)
{
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
}
  }

  ngOnInit() {
    if(window.innerWidth < 400)
    {
      this.mobile = true;
   
    }
    else
    {
      this.mobile = false;
     
    
  }
    
    this.bankat.initializeFormGroup();
    this.arka.getTotali();

  }



  getKategoria(kategoria) {
    this.isLoading = true;
    this.bankat.getBankat(kategoria).subscribe(
      list => {
        let array = list.map(item => {
        this.isLoading = false;
        return {
            $key: item.key,
            ...item.payload.val()
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



  onChanageBankat(selectedValue) {
  

      this.getKategoria(selectedValue.value);
      this.bankat.form.controls.Monedha.setValue('LEK');
      this.bankat.form.controls.Sasia.setValue('');
      this.bankat.form.controls.Koment.setValue('');

  }


  onSubmit(){
    let arketimiDate = new Date().toLocaleDateString();
    this.datePipe.transform(arketimiDate,"dd-MM-yyyy");
this.bankat.form.controls.Data.setValue(arketimiDate) ;
   let key =  this.bankat.insertBankat(this.bankat.form.controls.Bankat.value,this.bankat.form.value);
    //insert transaksionin
    this.arka.insertTransaksion("Hua",key,this.bankat.form.controls.Koment.value,this.bankat.form.controls.Monedha.value,this.bankat.form.controls.Sasia.value,"Hua "+this.bankat.form.controls["Bankat"].value,this.bankat.form.controls["Bankat"].value)
   //update totali
    this.arka.updateTotali(Math.abs(this.bankat.form.controls.Sasia.value),this.bankat.form.controls.Monedha.value);
    
    // this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
    // this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
    
    this.bankat.form.controls.Sasia.setValue('');
    this.bankat.form.controls.Koment.setValue('');
    this.bankat.form.controls.Sasia.reset();

  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
   
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Sasia-t.Paguar}).reduce((acc, value) => acc + value, 0);
    this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Sasia-t.Paguar}).reduce((acc, value) => acc + value, 0);
  }

  onSelect(row){  
        
this.bankat.formPaguar.Paguar = row.Paguar;
this.bankat.formPaguar.$key = row.$key;
this.bankat.formPaguar.Koment = row.Koment;
this.bankat.formPaguar.Monedha = row.Monedha;
this.bankat.formPaguar.Banka = this.bankat.form.controls["Bankat"].value;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = "60%";
    this.dialog.open(PagesebankaComponent,dialogConfig);
  }



}

