import { Component, OnInit, ViewChild } from '@angular/core';
import { ShpenzimeService } from '../shared/shpenzime.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shpenzime',
  templateUrl: './shpenzime.component.html',
  styleUrls: ['./shpenzime.component.css']
})
export class ShpenzimeComponent implements OnInit {

  constructor(private shpenzime: ShpenzimeService,private datePipe : DatePipe) { }
  Shpenzime = [
    { value: 'Kredi' }, { value: 'Qera' }, { value: 'Rroga' }, { value: 'Ekskursione' }, { value: 'Uniforma' }, { value: 'Libra' }, { value: 'Energji' }, { value: 'Uje' }

  ];
  Monedhat = [
    { value: 'LEK' }, { value: 'EUR' }

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

  ngOnInit() {
    if(window.innerWidth < 400)
    {
      this.mobile = true;
   
    }
    else
    {
      this.mobile = false;
     
    
  }
    
    this.shpenzime.initializeFormGroup();
     

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
        this.listData = new MatTableDataSource(array);

        this.totEUR = this.listData.filteredData.map((t)=>{if(t.Monedha=='EUR') return t.Kosto; else return 0;}).reduce((acc, value) => acc + value, 0);
        this.totLEK = this.listData.filteredData.map((t)=>{if(t.Monedha=='LEK') return t.Kosto;else return 0;}).reduce((acc, value) => acc + value, 0);
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

  }
  onSubmit(){
    let shpenzimiDate = new Date().toLocaleDateString();
    this.datePipe.transform(shpenzimiDate,"dd-MM-yyyy");
console.log(shpenzimiDate);
this.shpenzime.form.controls.Data.setValue(shpenzimiDate) ;
    this.shpenzime.insertShpenzime(this.shpenzime.form.controls.Shpenzime.value,this.shpenzime.form.value);
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
