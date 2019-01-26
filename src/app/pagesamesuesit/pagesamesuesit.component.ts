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
  listData : MatTableDataSource<any>;
  displayedColumns: string [] =['select','Emri','Mbiemri','LlogariBankare','PagaSig','MbetjaSig','MbetjaShtese','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  PagaShteseFillestare = 0;
  PagaShteseTot = 0;
  selection = new SelectionModel(true, []) ;
  selected : number;
  totalRows : number;

  
  ngOnInit() {

    this.getAll();
    
    //regjistrohet te observable qe kthen getMesuesit() te mesuasi service
    this._viti.msgMenu$.subscribe(mes => { this.vitiZgjedhur = mes; this.getAll(); this.listData.data.forEach(row => this.selection.select(row));
    });
   
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
        {
        this.isLoading = false;
        this.listData.data.forEach(row => this.selection.select(row));
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        }
        //filtron vetem kolnat e visualizuara ne tabele 
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'Actions' && ele != 'select' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
        //   });
        // };
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
  this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te beni pagesen Zyrtare per te gjithe mesuesit e zgjedhur ?')
  .afterClosed().subscribe(res => {
    if (res) {
      if (!(this.selection.selected.some((el)=>{console.log(el.PaguarNeto+el.PagaNetoMujore); return (el.PaguarNeto+el.PagaNetoMujore>=el.PagaNetoMujore*(el.MuajPage+1))})))
      {
    this.listMesuesit.updatePaguarBanke(this.selection.selected);
    this.notification.success('Mesuesve te seleksionuar iu kaloi paga ! ')
    
      }
    else
    this.notification.warn('Ka mesues qe nuk mund tiu hidhet paga Zyrtare ! ')
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
     
    });
    this.selection = new SelectionModel(true, []);
  
    // this.applyFilter();
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row => this.selection.select(row));
      this.selected =  this.selection.selected.length;
      this.totalRows = this.listData.data.length;
      // console.log(this.selection.selected);
// this.applyFilter();
this.listData.sort = this.sort;
this.listData.paginator = this.paginator;
  }
}


