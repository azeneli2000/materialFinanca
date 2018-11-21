import { Component, OnInit,ViewChild } from '@angular/core';
import{ ActivatedRoute,Router} from '@angular/router'
import { MesuesiZgjedhurService } from '../shared/mesuesi-zgjedhur.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatTableDataSource, MatSort, MatPaginator,MatDialog,MatDialogConfig} from '@angular/material';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import{LendaComponent} from 'src/app/lenda/lenda.component';
import { LendaService } from '../shared/lenda.service';


@Component({
  selector: 'app-mesuesi-lenda',
  templateUrl: './mesuesi-lenda.component.html',
  styleUrls: ['./mesuesi-lenda.component.css']
})
export class MesuesiLendaComponent implements OnInit {
 
  constructor(private listLendet : LendaService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private route : ActivatedRoute, private mesuesiZgjedhur : MesuesiZgjedhurService,private router : Router,private mz:MesuesiZgjedhurService) { }
  public mesuesiId : string;
 // public mesuesi = this.mesuesiZgjedhur.mesuesiZgjedhur;
 
 public mesuesi : ['','','','','']; 
 public emri;
 public mbiemri;
 public kategoria;
 public paga;
public vjetersia

  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  mesZgjedhurBosh : boolean = false;
 meskey = this.route.snapshot.paramMap.get('$key');
 
  ngOnInit() {
    this.mesuesiZgjedhur.mbushMesuesin();
    let mz =this.mesuesiZgjedhur.mz;
    let mzArray;
     mz.subscribe((mes)=>{
      this.emri= mes[0];
      this.kategoria= mes[1];
      this.mbiemri= mes[2];
      this.paga= mes[3];
      this.vjetersia= mes[4];
       
     });
     





  //visualizon te dhenat e mesuesit
    let idMesuesi = this.route.snapshot.paramMap.get('$key');
    this.mesuesiId = idMesuesi.toString(); 
    if (this.mz.mesuesiZgjedhurId===undefined)
    this.mesZgjedhurBosh = true;
console.log(this.mesuesiId);
   //regjistrohet te observable qe kthen getLenda() te lenda service
   this.listLendet.getLendet(idMesuesi.toString()).subscribe(
    list => {
      let array = list.map(item =>{
        return {
          $key : item.key,
          ...item.payload.val()};
          
      }

      );
      this.listData= new MatTableDataSource(array);
     // let arr1 = array.map(lenda => lenda.Emri=lenda.Emri.viewValue) ;
      //console.log(arr1);
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


   //shfaq formen ne nje dialogBox
   onCreate()
   {
     this.listLendet.initializeFormGroup();
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     //dialogConfig.width = "60%";
   this.dialog.open(LendaComponent,dialogConfig);
     
   }
 
   onEdit(row){
     this.listLendet.populateForm(row);
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
   //  dialogConfig.width = "60%";
     this.dialog.open(LendaComponent,dialogConfig);
   }
 
   onDelete($key,Paga){
     this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te fshini lenden  ?')
     .afterClosed().subscribe(res =>{
       if(res){
        let p = this.paga -Paga;
         this.listLendet.deleteLenda($key,p,this.mesuesiId,);
         this.notification.warn('Lenda u fshi !');
       }
     });
   }


}
