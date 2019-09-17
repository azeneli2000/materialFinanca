import { Component, OnInit,ViewChild } from '@angular/core';
import {MesuesiComponent} from './../mesuesi/mesuesi.component'
import { MesuesiService } from 'src/app/shared/mesuesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatTableDataSource, MatSort, MatPaginator,MatDialog,MatDialogConfig} from '@angular/material';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import {Router} from "@angular/router";
import { MesuesiZgjedhurService } from 'src/app/shared/mesuesi-zgjedhur.service';
import { VitiService } from 'src/app/shared/viti.service';



@Component({
  selector: 'app-mesuesit-list',
  templateUrl: './mesuesit-list.component.html',
  styleUrls: ['./mesuesit-list.component.css']
})


export class MesuesitListComponent implements OnInit {
  
  isLoading = true;
  vitiZgjedhur;
  constructor(private listMesuesit : MesuesiService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private router : Router,private mesuesiZ : MesuesiZgjedhurService,private _viti: VitiService) { }

  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Emri','Mbiemri','Vjetersia','Kategoria','Paga','PagaTotMujore','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
mobile : boolean = false;
user : boolean = false;

  ngOnInit() {
    if(window.innerWidth < 400)
    {
      this.mobile = true;
    this.displayedColumns = ['Emri',  'Mbiemri', 'Paga','PagaTotMujore','Actions'];
    }
    else
    {
      this.mobile = false;
      this.displayedColumns =  ['Emri','Mbiemri','Vjetersia','Kategoria','Paga','PagaTotMujore','Actions'];
    
  }

      let c = JSON.parse(localStorage.getItem('user'));
       if(c.displayName == "Zenel Zeneli")
       this.user = true;    
  
  this.getAll();

    //regjistrohet te observable qe kthen getMesuesit() te mesuasi service
    this._viti.msgMenu$.subscribe(mes => { this.vitiZgjedhur = mes; this.getAll(); });
    // this.listMesuesit.getMesuesit().subscribe(
    //   list => {this.isLoading = false;
    //     let array = list.map(item =>{
    //       return {
    //         $key : item.key,
    //         ...item.payload.val()};
    //     }

    //     );
    //     this.listData= new MatTableDataSource(array);
    //     if(this.listData.data.length==0)
    //     this.isLoading = false;
    //     this.listData.sort = this.sort;
    //     this.listData.paginator = this.paginator;
    //     //filtron vetem kolnat e visualizuara ne tabele 
    //     this.listData.filterPredicate = (data, filter) => {
    //       return this.displayedColumns.some(ele => {
    //         return ele != 'Actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
    //       });
    //     };
    //   });
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
        if(this.listData.data.length==0)
        this.isLoading = false;
        this.listData.sort = this.sort;
        if(!this.mobile)
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
    
    this.mesuesiZ.mesuesiZgjedhur=row;
    this.mesuesiZ.mesuesiZgjedhurId = row.$key;
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


  onSelect(mesuesi){
   this.mesuesiZ.mesuesiZgjedhur=mesuesi;
  
   this.mesuesiZ.mesuesiZgjedhurPaga = mesuesi.Paga;
   this.mesuesiZ.mesuesiZgjedhurId = mesuesi.$key;
   
   
    this.router.navigate(['/mesuesit',mesuesi.$key]);
  
  }

 
}

