import { Component, OnInit, ViewChild } from '@angular/core';
import { ShpenzimeService } from '../shared/shpenzime.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PrintService } from '../shared/print.service';
import { ArkaService } from '../shared/arka.service';

@Component({
  selector: 'app-shpenzime',
  templateUrl: './shpenzime.component.html',
  styleUrls: ['./shpenzime.component.css']
})
export class ShpenzimeComponent implements OnInit {

  constructor(public shpenzime: ShpenzimeService,private datePipe : DatePipe,private printer : PrintService,private arka : ArkaService) { }
  myControl = new FormControl();
  options = ['Dieta','Shperblime','Interes kredie','Interes huaje','Transporti','Uniformat','Librat','Eskursion','Kancelari','Mjete mesimore','Mjete pastrimi','Karburant','Zbukurime','Lyerje','Qera','Energji','Uje','Telefona','Internet','Kamera','Mirembajtje','Sherbime noteriale','Blerje mjetesh mesimore','Komisione bankare','Tatim fitimi','Taksa Vendore','Tatime te tjera','Gjoba','Shpenzime personale','Sigurime',]
  filteredOptions: Observable<string[]>;
  Shpenzime = [
    { value: 'Kredi' },{ value: 'Hua' }, { value: 'Qera' }, { value: 'Rroga' }, { value: 'Ekskursione' }, { value: 'Uniforma' }, { value: 'Libra' }, { value: 'Energji' }, { value: 'Uje' }, { value: 'Mirembajtje' }, { value: 'Materiale te qendrueshme' }, { value: 'Materiale konsumi' }, { value: 'Tatime-Taksa' }, { value: 'Shpenzime Personale' }

  ];
  Monedhat = [
    { value: 'LEK' }, { value: 'EUR' }, { value: 'DOLLARE' }

  ];
  tablaVisible : boolean = false;
  insertVisible: boolean = true;
  isLoading : boolean = true;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Data','Kosto', 'Koment'];
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

    if(this.insertVisible){
    this.filteredOptions = this.shpenzime.form.controls.Koment.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      }
    if(window.innerWidth < 400)
    {
      this.mobile = true;
   
    }
    else
    {
      this.mobile = false;
     
    
  }
    
    this.shpenzime.initializeFormGroup();
    this.arka.getTotali();

  }


  getKategoria(kategoria) {
    this.isLoading = true;
    this.shpenzime.getShpenzime(kategoria).subscribe(
      list => {
        let array = list.map(item => {
        this.isLoading = false;
        return {
            $key: item.key,
            ...item.payload.val()
          };
        
        });
        //
        array.sort(function (a,b){
          let c = new Date(a["Data"]);
          let d = new Date(b["Data"]);
          return +d - +c;
        });
        console.log(array);
        this.listData = new MatTableDataSource(array);

        this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Kosto; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Kosto; else return 0;}).reduce((acc, value) => acc + value, 0);
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

  onChanageShpenzime(selectedValue) {
    if (selectedValue.value == 'Ekskursione' ||selectedValue.value == 'Rroga')
      this.insertVisible = false;
      else
      this.insertVisible = true;   
      console.log(selectedValue.value);

      this.getKategoria(selectedValue.value);
      this.tablaVisible = true;
      this.shpenzime.form.controls.Monedha.setValue('LEK');
      this.shpenzime.form.controls.Kosto.setValue('');
      this.shpenzime.form.controls.Koment.setValue('');

  }
  onSubmit(){
    let shpenzimiDate = new Date().toLocaleDateString();
    this.datePipe.transform(shpenzimiDate,"dd-MM-yyyy");
console.log(shpenzimiDate);
this.shpenzime.form.controls.Data.setValue(shpenzimiDate) ;
   let key =  this.shpenzime.insertShpenzime(this.shpenzime.form.controls.Shpenzime.value,this.shpenzime.form.value);
    //insert transaksionin
    this.arka.insertTransaksion("Shpenzime",key,this.shpenzime.form.controls.Koment.value,this.shpenzime.form.controls.Monedha.value,this.shpenzime.form.controls.Kosto.value,"Shpenzime "+this.shpenzime.form.controls["Shpenzime"].value,this.shpenzime.form.controls["Shpenzime"].value)
   //update totali
    this.arka.updateTotali(-Math.abs(this.shpenzime.form.controls.Kosto.value),this.shpenzime.form.controls.Monedha.value);
   
    this.printer.printShpenzime(this.shpenzime.form.controls.Shpenzime.value,this.shpenzime.form.controls.Koment.value,this.shpenzime.form.controls.Kosto.value,this.shpenzime.form.controls.Monedha.value);
    this.printer.printShpenzime(this.shpenzime.form.controls.Shpenzime.value,this.shpenzime.form.controls.Koment.value,this.shpenzime.form.controls.Kosto.value,this.shpenzime.form.controls.Monedha.value);
    
    this.shpenzime.form.controls.Kosto.setValue('');
    this.shpenzime.form.controls.Koment.setValue('');
    this.shpenzime.form.controls.Kosto.reset();

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
   
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
    this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Kosto}).reduce((acc, value) => acc + value, 0);
    this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Kosto}).reduce((acc, value) => acc + value, 0);
  }

}
