import { Component, OnInit, ViewChild } from '@angular/core';
import { ArkaService } from '../shared/arka.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatSortable } from '@angular/material';
import { XchnageComponent } from './xchnage/xchnage.component';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';
import { NxenesiService } from '../shared/nxenesi.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { resolve } from 'q';
import { first } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';
import { ShpenzimeService } from '../shared/shpenzime.service';
import { AeketimeService } from '../shared/aeketime.service';
import { PrintService } from '../shared/print.service';

@Component({
  selector: 'app-arka',
  templateUrl: './arka.component.html',
  styleUrls: ['./arka.component.css']
})
export class ArkaComponent implements OnInit {

  constructor(private db: AngularFireDatabase,private nxensiService : NxenesiService, public arkaSevice : ArkaService,private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private shpenzimeProva : ShpenzimeService,private arketimeProva : AeketimeService,private print : PrintService) { }
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
//anulimet
//nxenesiAnullim ;
anullim : boolean = false;

  ngOnInit() {
    // this.kaloRrrogaZyrtare();
    let c = JSON.parse(localStorage.getItem('user'));
if(c.displayName == "Zenel Zeneli")
  this.anullim = true;
   this.arkaSevice.getArka().subscribe( list => {
    let array = list.map(item =>{
      this.isLoading = false;
      return {
        $key : item.key,
        ...item.payload.val()};
    }

    );
    let array1 =  array.filter(item=>item["$key"]!=='Totali');


    array1.sort(function (a,b){
      let c = new Date(a["Data"]+ " "+ a["Koha"]);
      let d = new Date(b["Data"]+ " " +b["Koha"]);
      return +d - +c;
    });

    this.listData= new MatTableDataSource(array1);


    this.listData.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'Data': return new Date(item.Data);
        default: return item[property];
      }
    };
 
    if(this.listData.data.length==0)
    this.isLoading = false;
  //  let sum = this.listData.filteredData.map(t =>{
  //   if (t.Valuta=="EUR" )
  //   return Number(t.Sasia)
  //   else return 0;
  //  }    
  //   ).reduce((acc, value) => acc + value) ;
 
//euro
    this.totEurKerkimi = this.listData.filteredData.map((t)=>{
      if(t.Valuta=='EUR')
    { 
      if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
       return -Math.abs(Number(t.Sasia));

       if(t.Lloji=="Xchange"||t.Anulluar==true)
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

       if(t.Lloji=="Xchange"||t.Anulluar==true)
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

       if(t.Lloji=="Xchange"||t.Anulluar==true)
       return 0;

      return Number(t.Sasia);
    } else return 0;
  }).reduce((acc, value) => acc + value, 0);


// console.log(sum);
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
  // console.log(this.listData.filteredData);
  // console.log(this.listData.filteredData);
//euro
this.totEurKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='EUR')
{ 
  if(t.Lloji=="Xchange"||t.Anulluar==true)
  return 0;
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT")
   return -Math.abs(Number(t.Sasia));

  

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);
//leke
this.totLekKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='LEK')
{ 
  if(t.Lloji=="Xchange"||t.Anulluar==true)
  return 0;
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
   return -Math.abs(Number(t.Sasia));

  

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);
//dollare
this.totDolKerkimi = this.listData.filteredData.map((t)=>{
  if(t.Valuta=='DOLLARE')
{ 
  if(t.Lloji=="Xchange"||t.Anulluar==true)
  return 0;
  if(t.Lloji=="Shpenzime" || t.Lloji=="PZ"||t.Lloji=="PSHT" )
   return -Math.abs(Number(t.Sasia));

  

  return Number(t.Sasia);
} else return 0;
}).reduce((acc, value) => acc + value, 0);

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
   
  }


  onXchangeClick(){      
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  //  dialogConfig.width = "60%";
    this.dialog.open(XchnageComponent,dialogConfig);
  }

  getNxenesiAnullim(key) : Promise<any>{
    
    return this.db
    .object( localStorage.getItem('VitiShkollor') +'/'+key).valueChanges().pipe(first()).toPromise();
    }
  getMesuesiAnullim(key) : Promise<any>{
    
    return this.db
    .object( localStorage.getItem('VitiShkollor') +'/Mesuesit/'+key).valueChanges().pipe(first()).toPromise();
    }
  getBankaAnullim(key,kategoria) : Promise<any>{
    
    return this.db
    .object( 'Bankat/' + kategoria+ '/'+ key).valueChanges().pipe(first()).toPromise();
    }


  onAnulloClick(row)

  {
    console.log(row.DocRef);
    switch (row.Lloji)
    {

      case "PSH" :
        {       
      this.getNxenesiAnullim(row.DocRef).then(
       (data)=>{     
       //ul totalin e arkes sa sasia
      this.arkaSevice.updateTotali(-(row.Sasia),data.MonedhaShkolla);
     //ul totalin e paguar se nxenesit sa sasia (nxensi gjendet ne docREf)  
      this.db.list( localStorage.getItem('VitiShkollor')).update(row.DocRef,{
      PaguarShkolla:  data.PaguarShkolla - row.Sasia,
      });
      //bej anulluar true
      this.arkaSevice.anullo(row.$key);
       });
     break;
        }

      case "PT" :
        {       
      this.getNxenesiAnullim(row.DocRef).then(
       (data)=>{     
       //ul totalin e arkes sa sasia
      this.arkaSevice.updateTotali(-(row.Sasia),data.MonedhaTransporti);
     //ul totalin e paguar se nxenesit sa sasia (nxensi gjendet ne docREf)  
      this.db.list( localStorage.getItem('VitiShkollor')).update(row.DocRef,{
        PaguarTransporti:  data.PaguarTransporti - row.Sasia,
      });
      //bej anulluar true
      this.arkaSevice.anullo(row.$key);
       });
     break;
        }

      case "Arketime" :
        {       
       
       //ul totalin e arkes sa sasia
      this.arkaSevice.updateTotali(-Math.abs(row.Sasia),row.Valuta);
     //fshin arketimin
     const arketimi =   this.db.list( localStorage.getItem('VitiShkollor') + '/Arketime/' + row.DocRef1);
     arketimi.remove(row.DocRef);
      //bej anulluar true
      this.arkaSevice.anullo(row.$key);
      
     break;
        }
      case "Shpenzime" :
        {       
       
       //ngre totalin e arkes sa sasia
      this.arkaSevice.updateTotali(Math.abs(row.Sasia),row.Valuta);
     //fshin shpenzimin
     const shpenzimi =   this.db.list( localStorage.getItem('VitiShkollor') + '/Shpenzime/' + row.DocRef1);
     shpenzimi.remove(row.DocRef);
      //bej anulluar true
      this.arkaSevice.anullo(row.$key);
      
     break;
        }
      case "PSHTS" :
        {       
          this.getMesuesiAnullim(row.DocRef1).then(
            (data)=>{     
         //heq nga mesuesi sasine e paguar
           this.db.list( localStorage.getItem('VitiShkollor') +'/Mesuesit').update(row.DocRef1,{
            PaguarShtese:  data.PaguarShtese - row.Sasia,
           });
    
            //ul totalin e arkes sa sasia
            this.arkaSevice.updateTotali(Math.abs(row.Sasia),row.Valuta);
            //fshin shpenzimin perkates
            const shpenzimi =   this.db.list(localStorage.getItem('VitiShkollor') + '/Shpenzime/');
            shpenzimi.remove(row.DocRef);
            //bej anulluar true
            this.arkaSevice.anullo(row.$key);
          });
     break;
        }
      case "PZ" :
        {       
          this.getMesuesiAnullim(row.DocRef1).then(
            (data)=>{     
         //heq nga mesuesi sasine e paguar
           this.db.list( localStorage.getItem('VitiShkollor') +'/Mesuesit').update(row.DocRef1,{
            PaguarNeto:  data.PaguarNeto - row.Sasia,
           });
    
            //ul totalin e arkes sa sasia
            this.arkaSevice.updateTotali(Math.abs(row.Sasia),row.Valuta);
            //fshin shpenzimin perkates
            const shpenzimi =   this.db.list(localStorage.getItem('VitiShkollor') + '/Shpenzime/');
            shpenzimi.remove(row.DocRef);
            //bej anulluar true
            this.arkaSevice.anullo(row.$key);
          });
     break;
        }
        case "PP" :
          { 
            const banka =   this.db.list( 'Bankat/' + row.DocRef1);
            this.getBankaAnullim(row.DocRef,row.DocRef1).then(
              (data)=>{     
           //heq nga principali sasine e paguar
             banka.update(row.DocRef,{
              Paguar:  data.Paguar - row.Sasia,
             });
            });
         //ngre totalin e arkes sa sasia
        this.arkaSevice.updateTotali(Math.abs(row.Sasia),row.Valuta);
       //fshin shpenzimin
     
        //bej anulluar true
        this.arkaSevice.anullo(row.$key);
        
       break;
          }
    
    }

  }
  onDelete(row) {
    this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te anulloni transaksionin  ?')
      .afterClosed().subscribe(res => {
        if (res) {
        this.onAnulloClick(row);          
        this.notification.warn('Transaksioni u anullua me sukses !'); 
        }
      });
  }


  printArka()
  {
this.print.printArka(this.listData.filteredData,this.totEurKerkimi,this.totLekKerkimi,this.totDolKerkimi);

  }
  printFatura(row)
  {
    this.print.printArkaThermal(row.Koment,row.TeDhena,row.Sasia,row.Valuta,row.Lloji);

  }

//   kaloShpenzime()
//   {
//     this.arkaSevice.getArka().subscribe( list => {
//       let array = list.map(item =>{
       
//         return {
//           $key : item.key,
//           ...item.payload.val()};
//       });
//     let  array1 =array.filter((item)=>{
      
//        return (item["Koment"] == "Shpenzime Libra" && item["Anulluar"]==false);
//     });
//     let arketimi = { 
//     Kosto:0,
//     Koment: '',
//     Shpenzime: '',
//     Monedha : '',
//     Data : ''}
//     for(let i=0;i<=array1.length-1;i++)
// {
 
//   arketimi.Kosto = array1[i]["Sasia"];
//   arketimi.Koment = array1[i]["TeDhena"];
//   arketimi.Monedha = array1[i]["Valuta"];
//   arketimi.Data = array1[i]["Data"];

// this.shpenzimeProva.insertShpenzime("Libra",arketimi);
// }
// console.log(array1);
//   })
// }

  kaloRrrogaZyrtare()
  {
    this.arkaSevice.getArka().subscribe( list => {
      let array = list.map(item =>{
       
        return {
          $key : item.key,
          ...item.payload.val()};
      });
    let  array1 =array.filter((item)=>{
      
       return (item["Koment"] == "Paga Zyrtare" && item["Anulluar"]==false);
    });
    let arketimi = { 
    Kosto:0,
    Koment: '',
    Shpenzime: '',
    Monedha : '',
    Data : ''}
    for(let i=0;i<=array1.length-1;i++)
{
 
  arketimi.Kosto = array1[i]["Sasia"];
  arketimi.Koment = array1[i]["TeDhena"];
  arketimi.Monedha = array1[i]["Valuta"];
  arketimi.Data = array1[i]["Data"];

this.shpenzimeProva.insertShpenzime("Rroga",arketimi);
}
console.log(array1);
  })
}


//   fshiZyrtare()
//   {
//     this.arkaSevice.getArka().subscribe( list => {
//       let array = list.map(item =>{
       
//         return {
//           $key : item.key,
//           ...item.payload.val()};
//       });
//     let  array1 =array.filter((item)=>{
      
//        return (item["Koment"] == "Paga Zyrtare" && item["Anulluar"]==false);
//     });
//     let  sh: AngularFireList<any>;
//     sh = this.db.list('2019-2020/Shpenzime/Rroga');
//  (sh.valueChanges().subscribe((d)=>console.log(d)));
//     for(let i=0;i<=array1.length-1;i++)
// {
 

// console.log(array1[i]["DocRef"].split("/")[1]);
// sh.remove(array1[i]["DocRef"].split("/")[1]);
// }
//   })
// }

}
