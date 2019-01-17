import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';

export interface DialogData {
  monedha: 'EUR' | 'LEK' | '$';
}

@Component({
  selector: 'app-nxenesi-detaje',
  templateUrl: './nxenesi-detaje.component.html',
  styleUrls: ['./nxenesi-detaje.component.css']
})
export class NxenesiDetajeComponent implements OnInit {

  constructor(private nxenesiService: NxenesiService, private route: ActivatedRoute, public dialog: MatDialog, private notification: NotificationService) { }
  // listData : MatTableDataSource<any>

  // displayedColumns: string [] =['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga','Actions'];
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  nxenesi;

  perqShkolla: number = 0;
  perqTransporti: number = 0;
  perqUniforma: number = 0;
  perqLibrat: number = 0;
  mbetjaShkolla: number = 0;
  mbetjaTransporti: number = 0;
  mbetjaLibrat: number = 0;
  mbetjaUniforma: number = 0;

  hideShkolla: boolean = false;
  hideTransporti: boolean = false;
  hideUniforma: boolean = false;
  hideLibrat: boolean = false;


  ngOnInit() {
    let ididNxenesi = this.route.snapshot.paramMap.get('$key');
    let ob = this.nxenesiService.getNxenes(ididNxenesi).subscribe(

      data => {
      this.nxenesi = data.payload.val();
        this.nxenesiService.form.controls['$key'].setValue(ididNxenesi);
        console.log(ididNxenesi);
        this.nxenesiService.form.controls['Emri'].setValue(this.nxenesi.Emri);
        this.nxenesiService.form.controls['Mbiemri'].setValue(this.nxenesi.Mbiemri);
        this.nxenesiService.form.controls['Atesia'].setValue(this.nxenesi.Atesia);
        this.nxenesiService.form.controls['Klasa'].setValue(this.nxenesi.Klasa);
        this.nxenesiService.form.controls['Indeksi'].setValue(this.nxenesi.Indeksi);
        this.nxenesiService.form.controls['PagesaShkolla'].setValue(this.nxenesi.PagesaShkolla);
        this.nxenesiService.form.controls['PaguarShkolla'].setValue(this.nxenesi.PaguarShkolla);
        this.nxenesiService.form.controls['MonedhaShkolla'].setValue(this.nxenesi.MonedhaShkolla);
        this.nxenesiService.form.controls['PagesaTransporti'].setValue(this.nxenesi.PagesaTransporti);
        this.nxenesiService.form.controls['PaguarTransporti'].setValue(this.nxenesi.PaguarTransporti);
        this.nxenesiService.form.controls['MonedhaTransporti'].setValue(this.nxenesi.MonedhaTransporti);
        this.nxenesiService.form.controls['PagesaLibrat'].setValue(this.nxenesi.PagesaLibrat);
        this.nxenesiService.form.controls['PaguarLibrat'].setValue(this.nxenesi.PaguarLibrat);
        this.nxenesiService.form.controls['MonedhaLibrat'].setValue(this.nxenesi.MonedhaLibrat);
        this.nxenesiService.form.controls['PagesaUniforma'].setValue(this.nxenesi.PagesaUniforma);
        this.nxenesiService.form.controls['PaguarUniforma'].setValue(this.nxenesi.PaguarUniforma);
        this.nxenesiService.form.controls['MonedhaUniforma'].setValue(this.nxenesi.MonedhaUniforma);
        this.nxenesiService.form.controls['MeTransport'].setValue(this.nxenesi.MeTransport);
        this.nxenesiService.form.controls['MeUniforme'].setValue(this.nxenesi.MeUniforme);

        this.perqShkolla = Number(this.nxenesiService.form.controls['PaguarShkolla'].value) / Number(this.nxenesiService.form.controls['PagesaShkolla'].value) * 100;
        this.mbetjaShkolla = Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - Number(this.nxenesiService.form.controls['PaguarShkolla'].value);

        this.perqTransporti = Number(this.nxenesiService.form.controls['PaguarTransporti'].value) / Number(this.nxenesiService.form.controls['PagesaTransporti'].value) * 100;
        this.mbetjaTransporti = Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - Number(this.nxenesiService.form.controls['PaguarTransporti'].value);

        this.perqUniforma = Number(this.nxenesiService.form.controls['PaguarUniforma'].value) / Number(this.nxenesiService.form.controls['PagesaUniforma'].value) * 100;
        this.mbetjaUniforma = Number(this.nxenesiService.form.controls['PagesaUniforma'].value) - Number(this.nxenesiService.form.controls['PaguarUniforma'].value);

        this.perqLibrat = Number(this.nxenesiService.form.controls['PaguarLibrat'].value) / Number(this.nxenesiService.form.controls['PagesaLibrat'].value) * 100;
        this.mbetjaLibrat = Number(this.nxenesiService.form.controls['PagesaLibrat'].value) - Number(this.nxenesiService.form.controls['PaguarLibrat'].value);

      }
    );

  }
  onSubmitShkolla() {
    this.hideShkolla = !this.hideShkolla;
    this.hideTransporti = false;
    this.hideUniforma = false;
    this.hideLibrat = false;

  }
  onSubmitTransporti() {
    this.hideTransporti = !this.hideTransporti;
    this.hideShkolla = false;
    this.hideUniforma = false;
    this.hideLibrat = false;
  }
  onSubmitUniforma() {
    this.hideUniforma = !this.hideUniforma;
    this.hideTransporti = false;
    this.hideShkolla = false;
    this.hideLibrat = false;
  }
  onSubmitLibrat() {
    this.hideLibrat = !this.hideLibrat;
    this.hideTransporti = false;
    this.hideUniforma = false;
    this.hideShkolla = false;
  }

  shkolla(box) {
    console.log(box);
    if ((Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - (Number(this.nxenesiService.form.controls['PaguarShkolla'].value) + Number(box))) >= 0 && box != "" && Number(box) > 0) {
      this.nxenesiService.form.controls['PaguarShkolla'].setValue(Number(this.nxenesiService.form.controls['PaguarShkolla'].value) + Number(box));
      this.perqShkolla = Number(this.nxenesiService.form.controls['PaguarShkolla'].value) / Number(this.nxenesiService.form.controls['PagesaShkolla'].value) * 100;
      this.mbetjaShkolla = Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - Number(this.nxenesiService.form.controls['PaguarShkolla'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      this.hideShkolla = false;
      this.nxenesiService.form.reset();
      this.nxenesiService.initializeFormGroup();
      this.notification.success("Pagesa u krye me sukses !");
    }
    else {
      this.notification.warn("Vendosni pagesen ne formatin e duhur !");
      this.hideShkolla = false;

    }


  }

  transporti(box1) {
    console.log(box1);
    if ((Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - (Number(this.nxenesiService.form.controls['PaguarTransporti'].value) + Number(box1))) >= 0 && box1 != "" && Number(box1) > 0) {
      this.nxenesiService.form.controls['PaguarTransporti'].setValue(Number(this.nxenesiService.form.controls['PaguarTransporti'].value) + Number(box1));
      this.perqTransporti = Number(this.nxenesiService.form.controls['PaguarTransporti'].value) / Number(this.nxenesiService.form.controls['PagesaTransporti'].value) * 100;
      this.mbetjaTransporti = Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - Number(this.nxenesiService.form.controls['PaguarTransporti'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      console.log(this.hideTransporti);
      this.hideTransporti = false;
      this.notification.success("Pagesa u krye me sukses !");
    }
    else {
      this.notification.warn("Vendosni pagesen ne formatin e duhur !");
      this.hideTransporti = false;

    }

  }

  uniforma(box) {
    if ((Number(this.nxenesiService.form.controls['PagesaUniforma'].value) - (Number(this.nxenesiService.form.controls['PaguarUniforma'].value) + Number(box))) >= 0 && box != "" && Number(box) > 0) {
      console.log(box);
      this.nxenesiService.form.controls['PaguarUniforma'].setValue(Number(this.nxenesiService.form.controls['PaguarUniforma'].value) + Number(box));
      this.perqUniforma = Number(this.nxenesiService.form.controls['PaguarUniforma'].value) / Number(this.nxenesiService.form.controls['PagesaUniforma'].value) * 100;
      this.mbetjaUniforma = Number(this.nxenesiService.form.controls['PagesaUniforma'].value) - Number(this.nxenesiService.form.controls['PaguarUniforma'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      this.hideUniforma = false;
      this.notification.success("Pagesa u krye me sukses !");
    }
    else {
      this.notification.warn("Vendosni pagesen ne formatin e duhur !");
      this.hideUniforma = false;

    }

  }
  librat(box) {
    console.log(box);
    if ((Number(this.nxenesiService.form.controls['PagesaLibrat'].value) - (Number(this.nxenesiService.form.controls['PaguarLibrat'].value) + Number(box))) >= 0 && box != "" && Number(box) > 0) {
      this.nxenesiService.form.controls['PaguarLibrat'].setValue(Number(this.nxenesiService.form.controls['PaguarLibrat'].value) + Number(box));
      this.perqLibrat = Number(this.nxenesiService.form.controls['PaguarLibrat'].value) / Number(this.nxenesiService.form.controls['PagesaLibrat'].value) * 100;
      this.mbetjaLibrat = Number(this.nxenesiService.form.controls['PagesaLibrat'].value) - Number(this.nxenesiService.form.controls['PaguarLibrat'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      this.hideLibrat = false;
      this.notification.success("Pagesa u krye me sukses !");
    }
    else {
      this.notification.warn("Vendosni pagesen ne formatin e duhur !");
      this.hideLibrat = false;

    }
  }


}





