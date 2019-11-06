import { Component, OnInit, ViewChild } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { NxenesiComponent } from '../nxenesi/nxenesi.component';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import { Router } from '@angular/router';
import { VitiService } from 'src/app/shared/viti.service';
import { PrintService } from 'src/app/shared/print.service';
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
  //per skonton
  vitiZgjedhur
  isLoading = true;

  constructor(private nxenesitService: NxenesiService, private dialog: MatDialog, private notification: NotificationService, private dialogService: ConfirmDialogService, private router: Router, private _viti: VitiService, private printer : PrintService) { }

  mbeturShkolla: number;
  mbeturTrans: number;
  mbeturLibra: number;
  mbeturUni: number;
  detyrimiMujorShkolla : number = 0;
  detyrimiMujorTransporti : number = 0;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['index','Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaShkolla', 'PaguarShkolla','DetyrimiShkolla', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
mobile: boolean =false;
checked = false;



  ngOnInit() {
    //this.nxenesitService.insertNxenes(this.nx);
    if(window.innerWidth < 400)
    {
      this.mobile = true;
     this.displayedColumns = ['index','Emri',  'Mbiemri', 'Klasa',  'PagesaShkolla', 'PaguarShkolla','MbeturShkolla'];
    }
     else
     {
       if (this.checked==false)
     this.displayedColumns =  ['index','Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaShkolla', 'PaguarShkolla','MbeturShkolla','DetyrimiShkolla', 'Actions'];
     else
     this.displayedColumns =  ['index','Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaTransporti', 'PaguarTransporti','MbeturTransporti','DetyrimiTransporti', 'Actions'];

     this.mobile = false;
     }
    
     this.getAll();
    this._viti.msgMenu$.subscribe(mes => { this.vitiZgjedhur = mes; this.getAll() });

  }
  getAll() {
    this.isLoading = true;
    this.nxenesitService.getNxenesit().subscribe(
      list => {
        let array = list.map(item => {
        this.isLoading = false;
        return {
            $key: item.key,
            ...item.payload.val()
          };
        
        });
        //
     let array1 =  array.filter(item=>item.$key!=='Eskursione' &&item.$key!=='Mesuesit'&& item.$key!=='Shpenzime'&& item.$key!=='Arketime');
        this.listData = new MatTableDataSource(array1);
        // console.log(array1) ; 

        if (this.listData.data.length == 0)
          this.isLoading = false;
        this.mbeturShkolla = this.listData.filteredData.map(t => t.PagesaShkolla).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarShkolla).reduce((acc, value) => acc + value, 0);
        this.mbeturTrans = this.listData.filteredData.map(t => t.PagesaTransporti).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarTransporti).reduce((acc, value) => acc + value, 0);
        this.mbeturLibra = this.listData.filteredData.map(t => t.PagesaLibrat).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarLibrat).reduce((acc, value) => acc + value, 0);
        this.mbeturUni = this.listData.filteredData.map(t => t.PagesaUniforma).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarUniforma).reduce((acc, value) => acc + value, 0);
         this.detyrimiMujorShkolla = 0;
         this.detyrimiMujorTransporti = 0;
        this.listData.filteredData.forEach(el=>{
          this.detyrimiMujorShkolla =this .detyrimiMujorShkolla + this.gjejVonesaSasia(el.PagesaShkolla,el.PaguarShkolla);
          this.detyrimiMujorTransporti =this .detyrimiMujorTransporti + this.gjejVonesaSasiaTransporti(el.PagesaTransporti,el.PaguarTransporti);
   
       });
      

        this.listData.sort = this.sort;
        if(!this.mobile)
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele pervec actions dhe $key
        this.listData.filterPredicate = (data, filter) => {
         // this.detyrimiMujorShkolla = 0;
      
          if (this.searchKey =="shkolla"  )
          {
          // this.detyrimiMujorShkolla = 0;
         //  this.detyrimiMujorShkolla = this.detyrimiMujorShkolla + this.gjejVonesaSasia(data.PagesaShkolla,data.PaguarShkolla);
           return this.gjejVonesa(data.PagesaShkolla,data.PaguarShkolla);

          }
          if (this.searchKey =="transporti" )
          {
          // this.detyrimiMujorTransporti = this.detyrimiMujorTransporti + this.gjejVonesaSasia(data.PagesaTransporti,data.PaguarTransporti);
           return this.gjejVonesaTransporti(data.PagesaTransporti,data.PaguarTransporti);

          }
         
          if(this.searchKey!="transporti"&&this.searchKey!="shkolla")
          
          return this.displayedColumns.some(ele => {
            return ele != 'MbeturShkolla' &&  ele != 'DetyrimiShkolla' && ele != 'Actions' && ele != 'PagesaShkolla' && ele != 'PaguarShkolla' && ele != 'MbeturTransporti' && ele != 'DetyrimiTransporti' && ele != 'PagesaTransporti' && ele != 'PaguarTransporti' && ele != 'Indeksi' && ele != 'index' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          
          });
         
        };


      });
  }
onCheck()
{
  if (this.checked==false)
  this.displayedColumns =  ['index','Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaShkolla', 'PaguarShkolla','MbeturShkolla','DetyrimiShkolla', 'Actions'];
  else
  this.displayedColumns =  ['index','Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaTransporti', 'PaguarTransporti','MbeturTransporti','DetyrimiTransporti', 'Actions'];
  
}
  onSearchClear() {

    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
   
    this.detyrimiMujorShkolla = 0;
    this.detyrimiMujorTransporti = 0;

  
    this.listData.filter = this.searchKey.trim().toLowerCase();
  
    this.mbeturShkolla = this.listData.filteredData.map(t => t.PagesaShkolla).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarShkolla).reduce((acc, value) => acc + value, 0);
    this.mbeturTrans = this.listData.filteredData.map(t => t.PagesaTransporti).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarTransporti).reduce((acc, value) => acc + value, 0);
    this.mbeturLibra = this.listData.filteredData.map(t => t.PagesaLibrat).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarLibrat).reduce((acc, value) => acc + value, 0);
    this.mbeturUni = this.listData.filteredData.map(t => t.PagesaUniforma).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarUniforma).reduce((acc, value) => acc + value, 0);
    this.listData.filteredData.forEach(el=>{
       this.detyrimiMujorShkolla =this .detyrimiMujorShkolla + this.gjejVonesaSasia(el.PagesaShkolla,el.PaguarShkolla);
       this.detyrimiMujorTransporti =this .detyrimiMujorTransporti + this.gjejVonesaSasiaTransporti(el.PagesaTransporti,el.PaguarTransporti);

    });
  }


  onCreate() {
    this.nxenesitService.skontoUpdate = true;
    this.nxenesitService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "60%";
    this.dialog.open(NxenesiComponent, dialogConfig);

  }
  onEdit(row) {
    let c = JSON.parse(localStorage.getItem('user'));
    console.log(c.displayName);
    if (!row.Skonto || c.displayName == 'Zenel Zeneli')
      this.nxenesitService.skontoUpdate = true;
    else
      this.nxenesitService.skontoUpdate = false;

    this.nxenesitService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //  dialogConfig.width = "60%";
    this.dialog.open(NxenesiComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te fshini nxenesin  ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.nxenesitService.deleteNxenesi($key);
          this.notification.warn('Nxenesi u fshi !');
        }
      });
  }
  onSelect(nxenesi) {



    this.router.navigate(['/nxenesit', nxenesi.$key]);

  }
  gjejVonesaSasia(pagesa,paguar) 
  {
    let kesti = (pagesa)/9;
    // console.log(kesti);
    let nrKesteshPaguar =(paguar)/kesti;
    var currentdate = new Date(); 
//  console.log('keste : ' + nrKesteshPaguar);
     let dateNow =  new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate());
   
    let dateFillimi =  new Date("09/20/2019");
    
    let muaj = dateNow.getMonth() - dateFillimi.getMonth() + (12 * (dateNow.getFullYear() - dateFillimi.getFullYear()));
    // console.log(muaj);
    let res =( muaj+1)*kesti - nrKesteshPaguar*kesti;
    if (res>=0 && !(pagesa==0) )
       return res
    else
       return 0;
  }
  gjejVonesaSasiaTransporti(pagesa,paguar) 
  {
    let kesti = (pagesa)/9;
    // console.log(kesti);
    let nrKesteshPaguar =(paguar)/kesti;
    var currentdate = new Date(); 
//  console.log('keste : ' + nrKesteshPaguar);
     let dateNow =  new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate());
   
    let dateFillimi =  new Date("09/20/2019");
    
    let muaj = dateNow.getMonth() - dateFillimi.getMonth() + (12 * (dateNow.getFullYear() - dateFillimi.getFullYear()));
    // console.log(muaj);
    let res =( muaj+1)*kesti - nrKesteshPaguar*kesti;
    if (res>=0 && !(pagesa==0) )
       return res
    else
       return 0;
  }
  gjejVonesa(pagesa,paguar) 
  {
    let kesti = Math.round((pagesa)/9);
    // console.log(kesti);
    let nrKesteshPaguar =Math.floor((paguar)/kesti);
    var currentdate = new Date(); 
//  console.log('keste : ' + nrKesteshPaguar);
     let dateNow =  new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate());
   
    let dateFillimi =  new Date("09/20/2019");
    
    let muaj = dateNow.getMonth() - dateFillimi.getMonth() + (12 * (dateNow.getFullYear() - dateFillimi.getFullYear()));
    // console.log(muaj);
    return (nrKesteshPaguar<=muaj);
  }
  gjejVonesaTransporti(pagesa,paguar) 
  {
    let kesti = Math.round((pagesa- 100)/9);
    // console.log(kesti);
    let nrKesteshPaguar =Math.floor((paguar-100)/kesti);
    var currentdate = new Date(); 
//  console.log('keste : ' + nrKesteshPaguar);
     let dateNow =  new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate());
   
    let dateFillimi =  new Date("09/20/2019");
    
    let muaj = dateNow.getMonth() - dateFillimi.getMonth() + (12 * (dateNow.getFullYear() - dateFillimi.getFullYear()));
    // console.log(muaj);
    return (nrKesteshPaguar<=muaj);
  }
  gjejVonesaJshile(pagesa,paguar) 
  {
    let kesti = Math.round((pagesa)/9);
    // console.log(kesti);
    let nrKesteshPaguar =Math.floor((paguar)/kesti);
    var currentdate = new Date(); 
//  console.log('keste : ' + nrKesteshPaguar);
     let dateNow =  new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate());
   
    let dateFillimi =  new Date("09/20/2019");
    
    let muaj = dateNow.getMonth() - dateFillimi.getMonth() + (12 * (dateNow.getFullYear() - dateFillimi.getFullYear()));
   //  console.log(muaj);
    return (nrKesteshPaguar==muaj);
  }

  printVonesa()
  {
    if (this.searchKey == "shkolla")
   this.printer.printVonesa(this.listData.filteredData,"VONESAT SHKOLLA KLASA ");
   
    if (this.searchKey == "transporti")
     this.printer.printVonesa(this.listData.filteredData,"VONESAT TRANSPORTI KLASA ");

     if (this.searchKey != "shkolla" && this.searchKey != "transporti")
     this.printer.printVonesa(this.listData.filteredData,"KLASA ");

  }

}
