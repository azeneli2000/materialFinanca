import { Component, OnInit, ViewChild } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-nxenesit-list',
  templateUrl: './nxenesit-list.component.html',
  styleUrls: ['./nxenesit-list.component.css']
})
export class NxenesitListComponent implements OnInit {
  nxenesit: any;
  nx = {
    Emri: 'Stela',
    Mbiemri: 'Kovaci',
    Atesia: 'Miri',
    Klasa: '1',
    Indeksi: 'A',
    PagesaShkolla: 1000,
    PaguarShkolla: 100,
    MonedhaShkolla: 'EUR',
    PagesaTransporti: 1000,
    PaguarTransporti: 120,
    MonedhaTransporti: 'LEK',
    PagesaLibrat: 120,
    PaguarLibrat: 120,
    MonedhaLibrat: 'LEK',
    PagesaUniforma: 'Stela',
    PaguarUniforma: 120,
    MonedhaUniforma: 'LEK',
    MeTransport: false,
    Skonto: [{ s1: '10' }],
    Eskursione: [{ Emri: 'E1', Pagesa: 12, Monedha: 'LEK' }],
  };
  constructor(private nxenesitService: NxenesiService) { }


  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Emri','Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    //this.nxenesitService.insertNxenes(this.nx);
    this.nxenesitService.getNxenesit().subscribe( 
      list => {
        let array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()};
        });
        this.listData= new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele 
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'Actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
 

}
