import { Component, OnInit, ViewChild } from '@angular/core';
import { MesuesiService } from '../shared/mesuesi.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';
import { Router } from '@angular/router';
import { MesuesiZgjedhurService } from '../shared/mesuesi-zgjedhur.service';
import { VitiService } from '../shared/viti.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PagashteseComponent } from './pagashtese/pagashtese.component';

@Component({
  selector: 'app-pagesamesuesit',
  templateUrl: './pagesamesuesit.component.html',
  styleUrls: ['./pagesamesuesit.component.css']
})

export class PagesamesuesitComponent implements OnInit {
  isLoading : boolean;
  vitiZgjedhur;
  data;
  constructor(private listMesuesit : MesuesiService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private router : Router,private mesuesiZ : MesuesiZgjedhurService,private _viti: VitiService,public dialog1: MatDialog) { }
  listData : MatTableDataSource<any>
  displayedColumns: string [] =['select','Emri','Mbiemri','LlogariBankare','PagaSig','MbetjaSig','MbetjaShtese','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  PagaShteseFillestare = 0;
  PagaShteseTot = 0;
  selection ;

  
  ngOnInit() {

    this.getAll();

    //regjistrohet te observable qe kthen getMesuesit() te mesuasi service
    this._viti.msgMenu$.subscribe(mes => { this.vitiZgjedhur = mes; this.getAll(); });
  }

  getAll()
  {
    this.isLoading = true;

    this.listMesuesit.getMesuesit().subscribe(
      list => {
        let array = list.map(item =>{
          this.isLoading = false;
          return {
            $key : item.key,
            ...item.payload.val()};
        }

        );
        this.listData= new MatTableDataSource(array);
        this.selection = new SelectionModel<any>(true, []);
        console.log(this.selection.selected);
        this.data = array;

        if(this.listData.data.length==0)
        this.isLoading = false;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele 
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'Actions' && ele != 'select' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
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
  console.log(this.listData)
}

onSelect(row){
    
  
  this.listMesuesit.populateForm(row);
 
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
//  dialogConfig.width = "60%";
  this.dialog.open(PagashteseComponent,dialogConfig);
}


paguajZyrtare(array){
this.listMesuesit.updatePaguarBanke(this.selection.selected);

}










displayedColumns1 = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(this.data);
 
  /** Whether the number of selected elements matches the total number of rows. */
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
      this.listData = new MatTableDataSource<any>(this.data);
    });
    this.selection = new SelectionModel<any>(true, []);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row => this.selection.select(row));
      console.log(this.selection.selected);

  }
}
// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: Element[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];

