import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LibriRiComponent } from '../libri-ri/libri-ri.component';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';
import { LibratService } from '../shared/librat.service';
import { NotificationService } from '../shared/notification.service';
import { PrintService } from '../shared/print.service';
import { VitiService } from '../shared/viti.service';

@Component({
  selector: 'app-librat',
  templateUrl: './librat.component.html',
  styleUrls: ['./librat.component.css']
})
export class LibratComponent implements OnInit {

  isLoading = true;
  vitiZgjedhur;
  constructor(private listLibrat : LibratService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private router : Router,private _viti: VitiService,private printer : PrintService) { }

  listData : MatTableDataSource<any>
  displayedColumns: string [] =['EmriLibri','SasiaFillestare','SasiaShitur','CmimiBlerje','CmimiShitje','Klasa','ShtepiaBotuese','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  mobile : boolean = false;
  user : boolean = false;


  ngOnInit() {
    this.getAll()
  }


  getAll()
  {
    this.isLoading = true;

    this.listLibrat.getLibrat().subscribe(
      list => {
        let array = list.map(item =>{
          this.isLoading = false;
          return {
            $key : item.key,
            ...item.payload.val()};
        }

        );
        this.listData= new MatTableDataSource(array);
        if(this.listData.data.length==0)
        this.isLoading = false;
        this.listData.sort = this.sort;
        if(!this.mobile)
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele 
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            console.log(data[ele])
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
    this.listLibrat.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "60%";
  this.dialog.open(LibriRiComponent,dialogConfig);
    
  }

  onEdit(row){
    
    // this.mesuesiZ.mesuesiZgjedhur=row;
    // this.mesuesiZ.mesuesiZgjedhurId = row.$key;
    this.listLibrat.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = "60%";
    this.dialog.open(LibriRiComponent,dialogConfig);
  }

  onDelete($key){
    this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te fshini librin  ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.listLibrat.deleteLiber($key);
        this.notification.warn('Libri  u fshi !');
      }
    });
  }


  onSelect(mesuesi){
  //  this.mesuesiZ.mesuesiZgjedhur=mesuesi;
  
  //  this.mesuesiZ.mesuesiZgjedhurPaga = mesuesi.Paga;
  //  this.mesuesiZ.mesuesiZgjedhurId = mesuesi.$key;
   
   
  //   this.router.navigate(['/mesuesit',mesuesi.$key]);
  
  }
  printMesuesit()
  {

    this.printer.printMesuesit(this.listData.filteredData);
  }

}
