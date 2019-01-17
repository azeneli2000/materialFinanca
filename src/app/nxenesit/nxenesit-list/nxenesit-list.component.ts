import { Component, OnInit, ViewChild } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { NxenesiComponent } from '../nxenesi/nxenesi.component';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import { Router } from '@angular/router';
import { VitiService } from 'src/app/shared/viti.service';
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

  constructor(private nxenesitService: NxenesiService, private dialog: MatDialog, private notification: NotificationService, private dialogService: ConfirmDialogService, private router: Router, private _viti: VitiService) { }

  mbeturShkolla: number;
  mbeturTrans: number;
  mbeturLibra: number;
  mbeturUni: number;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Emri', 'Atesia', 'Mbiemri', 'Klasa', 'Indeksi', 'PagesaShkolla', 'PaguarShkolla', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;




  ngOnInit() {
    //this.nxenesitService.insertNxenes(this.nx);
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
        this.listData = new MatTableDataSource(array);
        if (this.listData.data.length == 0)
          this.isLoading = false;
        this.mbeturShkolla = this.listData.filteredData.map(t => t.PagesaShkolla).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarShkolla).reduce((acc, value) => acc + value, 0);
        this.mbeturTrans = this.listData.filteredData.map(t => t.PagesaTransporti).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarTransporti).reduce((acc, value) => acc + value, 0);
        this.mbeturLibra = this.listData.filteredData.map(t => t.PagesaLibrat).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarLibrat).reduce((acc, value) => acc + value, 0);
        this.mbeturUni = this.listData.filteredData.map(t => t.PagesaUniforma).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarUniforma).reduce((acc, value) => acc + value, 0);

        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        //filtron vetem kolnat e visualizuara ne tabele pervec actions dhe $key
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'Actions' && ele != 'PagesaShkolla' && ele != 'PaguarShkolla' && ele != 'Indeksi' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
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
    this.mbeturShkolla = this.listData.filteredData.map(t => t.PagesaShkolla).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarShkolla).reduce((acc, value) => acc + value, 0);
    this.mbeturTrans = this.listData.filteredData.map(t => t.PagesaTransporti).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarTransporti).reduce((acc, value) => acc + value, 0);
    this.mbeturLibra = this.listData.filteredData.map(t => t.PagesaLibrat).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarLibrat).reduce((acc, value) => acc + value, 0);
    this.mbeturUni = this.listData.filteredData.map(t => t.PagesaUniforma).reduce((acc, value) => acc + value, 0) - this.listData.filteredData.map(t => t.PaguarUniforma).reduce((acc, value) => acc + value, 0);

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

}
