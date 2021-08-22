import { Component, OnInit, ViewChild } from '@angular/core';
import { AeketimeService } from '../shared/aeketime.service';
import { DatePipe } from '@angular/common';
import { PrintService } from '../shared/print.service';
import { ArkaService } from '../shared/arka.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-arketime',
  templateUrl: './arketime.component.html',
  styleUrls: ['./arketime.component.css']
})
export class ArketimeComponent implements OnInit {

  constructor(public arketime: AeketimeService,private datePipe : DatePipe,private printer : PrintService,private arka : ArkaService) { }

  myControl = new FormControl();
  options = ['Dieta','Shperblime','Interes kredie','Interes huaje','Transporti','Uniformat','Librat','Eskursion','Kancelari','Mjete mesimore','Mjete pastrimi','Karburant','Zbukurime','Lyerje','Qera','Energji','Uje','Telefona','Internet','Kamera','Mirembajtje','Sherbime noteriale','Blerje mjetesh mesimore','Komisione bankare','Tatim fitimi','Taksa Vendore','Tatime te tjera','Gjoba','Shpenzime personale','Sigurime',]
  filteredOptions: Observable<string[]>;
  Arketime = [
    { value: 'Libra' },{ value: 'Uniforma' }, { value: 'Dyqani' }, { value: 'Arketim  i posatshem'  }

  ];
  Monedhat = [
    { value: 'LEK' }, { value: 'EUR' }, { value: 'DOLLARE' }

  ];

  isLoading : boolean = false;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Data','Sasia', 'Koment'];
  totEUR : number = 0;
  totLEK : number = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  displayDate;
  mobile : boolean = false
  insertVisible: boolean = true;

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
    
    this.arketime.initializeFormGroup();
    this.arka.getTotali();

  }



  getKategoria(kategoria) {
    this.isLoading = true;
    this.arketime.getArketime(kategoria).subscribe(
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

        this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Sasia; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Sasia;else return 0;}).reduce((acc, value) => acc + value, 0);
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



  onChanageArketime(selectedValue) {
    if (selectedValue.value == 'Libra')
      this.insertVisible = false;
      else
      this.insertVisible = true;   

      this.getKategoria(selectedValue.value);
      this.arketime.form.controls.Monedha.setValue('LEK');
      this.arketime.form.controls.Sasia.setValue('');
      this.arketime.form.controls.Koment.setValue('');

  }


  onSubmit(){
    let arketimiDate = new Date().toLocaleDateString();
    this.datePipe.transform(arketimiDate,"dd-MM-yyyy");
this.arketime.form.controls.Data.setValue(arketimiDate) ;
   let key =  this.arketime.insertArketime(this.arketime.form.controls.Arketime.value,this.arketime.form.value);
    //insert transaksionin
    this.arka.insertTransaksion("Arketime",key,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Monedha.value,this.arketime.form.controls.Sasia.value,"Arketime "+this.arketime.form.controls["Arketime"].value,this.arketime.form.controls["Arketime"].value)
   //update totali
    this.arka.updateTotali(Math.abs(this.arketime.form.controls.Sasia.value),this.arketime.form.controls.Monedha.value);
    
    this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
    this.printer.printShpenzime(this.arketime.form.controls.Arketime.value,this.arketime.form.controls.Koment.value,this.arketime.form.controls.Sasia.value,this.arketime.form.controls.Monedha.value);
    
    this.arketime.form.controls.Sasia.setValue('');
    this.arketime.form.controls.Koment.setValue('');
    this.arketime.form.controls.Sasia.reset();

  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
   
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Sasia}).reduce((acc, value) => acc + value, 0);
    this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Sasia}).reduce((acc, value) => acc + value, 0);
  }



}
