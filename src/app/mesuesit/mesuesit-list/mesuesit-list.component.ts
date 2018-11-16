import { Component, OnInit,ViewChild } from '@angular/core';
import {MesuesiComponent} from './../mesuesi/mesuesi.component'
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatTableDataSource, MatSort, MatPaginator,MatDialog,MatDialogConfig} from '@angular/material'
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
@Component({
  selector: 'app-mesuesit-list',
  templateUrl: './mesuesit-list.component.html',
  styleUrls: ['./mesuesit-list.component.css']
})
export class MesuesitListComponent implements OnInit {

  constructor(private listMesuesit : MesuesiService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService) { }


  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Emri','Mbiemri','Vjetersia','Kategoria','Paga','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  ngOnInit() {
    //regjistrohet te observable qe kthen getMesuesit() te mesuasi service
    this.listMesuesit.getMesuesit().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key : item.key,
            ...item.payload.val()};
        }

        );
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
  //shfaq formen ne nje dialogBox
  onCreate()
  {
    this.listMesuesit.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "60%";
  this.dialog.open(MesuesiComponent,dialogConfig);
    
  }

  onEdit(row){
    this.listMesuesit.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = "60%";
    this.dialog.open(MesuesiComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te fshini mesuesin  ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.listMesuesit.deleteMesuesi($key);
        this.notification.warn('Mesuesi u fshi !');
      }
    });
  }
}

