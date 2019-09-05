import { Component, OnInit, ViewChild } from '@angular/core';
import { ArkaService } from '../shared/arka.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { XchnageComponent } from './xchnage/xchnage.component';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';

@Component({
  selector: 'app-arka',
  templateUrl: './arka.component.html',
  styleUrls: ['./arka.component.css']
})
export class ArkaComponent implements OnInit {

  constructor(private arkaSevice : ArkaService,private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService) { }
  isLoading = true;
  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Koment','Sasia','Valuta','TeDhena','User','Data','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
mobile : boolean = false;
totEurKerkimi : number = 0;
totLekKerkimi : number = 0;
totDolKerkimi : number = 0;

  ngOnInit() {

   this.arkaSevice.getArka().subscribe( list => {
    let array = list.map(item =>{
      this.isLoading = false;
      return {
        $key : item.key,
        ...item.payload.val()};
    }

    );
    let array1 =  array.filter(item=>item["$key"]!=='Totali');

    this.listData= new MatTableDataSource(array1);
    if(this.listData.data.length==0)
    this.isLoading = false;
   let sum = this.listData.filteredData.map(t =>{
    if (t.Valuta=="EUR" )
    return Number(t.Sasia)
    else return 0;
   }    
    ).reduce((acc, value) => acc + value) ;
 
//euro
    this.totEurKerkimi = this.listData.filteredData.map((t)=>{
      if(t.Valuta=='EUR')
    { 
      if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
       return -Math.abs(Number(t.Sasia));

       if(t.Lloji=="Xchange")
       return 0;

      return Number(t.Sasia);
    } else return 0;
  }).reduce((acc, value) => acc + value, 0);
//leke
    this.totLekKerkimi = this.listData.filteredData.map((t)=>{
      if(t.Valuta=='LEK')
    { 
      if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
       return -Math.abs(Number(t.Sasia));

       if(t.Lloji=="Xchange")
       return 0;

      return Number(t.Sasia);
    } else return 0;
  }).reduce((acc, value) => acc + value, 0);
  //dollare
    this.totDolKerkimi = this.listData.filteredData.map((t)=>{
      if(t.Valuta=='DOLLARE')
    { 
      if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
       return -Math.abs(Number(t.Sasia));

       if(t.Lloji=="Xchange")
       return 0;

      return Number(t.Sasia);
    } else return 0;
  }).reduce((acc, value) => acc + value, 0);


console.log(sum);
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
  this.arkaSevice.getTotali();
  }


  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
   
//euro
this.totEurKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='EUR')
{ 
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
   return -Math.abs(Number(t.Sasia));

   if(t.Lloji=="Xchange")
   return 0;

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);
//leke
this.totLekKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='LEK')
{ 
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
   return -Math.abs(Number(t.Sasia));

   if(t.Lloji=="Xchange")
   return 0;

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);
//dollare
this.totDolKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='DOLLARE')
{ 
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
   return -Math.abs(Number(t.Sasia));

   if(t.Lloji=="Xchange")
   return 0;

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
   
  }


  onXchangeClick(row){      
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = "60%";
    this.dialog.open(XchnageComponent,dialogConfig);
  }
  

}
