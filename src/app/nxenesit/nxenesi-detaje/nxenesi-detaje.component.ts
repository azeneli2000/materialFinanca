import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatChipInputEvent } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { EskursioneService } from 'src/app/shared/eskursione.service';
import { CurrencyPipe } from '@angular/common';

export interface DialogData {
  monedha: 'EUR' | 'LEK' | '$';
}

@Component({
  selector: 'app-nxenesi-detaje',
  templateUrl: './nxenesi-detaje.component.html',
  styleUrls: ['./nxenesi-detaje.component.css']
})
export class NxenesiDetajeComponent implements OnInit {

  constructor(private cp : CurrencyPipe , private nxenesiService: NxenesiService,private eskursionetShkolla : EskursioneService, private route: ActivatedRoute, public dialog: MatDialog, private notification: NotificationService) { }
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


  //viewchild
 @ViewChild('box') boxRef : ElementRef;
 @ViewChild('box1') boxRef1 : ElementRef;
 @ViewChild('box2') boxRef2 : ElementRef;
 @ViewChild('box3') boxRef3 : ElementRef;
  //chips
  disabled = false;
  visible = true;
  selectable = true;
  removable = false;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  eskursione =[] ;
eskursioneDisponibel;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if(!(this.eskursioneDisponibel.eskursione[Number(value)].Pagesa==0)&&this.eskursione[Number(value)] =='')
    {
      this.eskursione[Number(value)] = value  +' :    ' + this.eskursioneDisponibel.eskursione[Number(value)].Emri + '     Pagesa : ' + this.cp.transform(this.eskursioneDisponibel.eskursione[Number(value)].Pagesa,this.eskursioneDisponibel.eskursione[Number(value)].MonedhaEskursioni,'symbol','1.0-0') ;
      this.nxenesiService.form.controls['Eskursione'].setValue(this.eskursione);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      console.log('added');
    }
      if (input) {
      input.value = '';
    }
  }
//!!!!!! custom key firebase :  firebase.database.ref().child('/path/with/custom/key/goes/here').set();
  
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
        this.nxenesiService.form.controls['Eskursione'].setValue(this.nxenesi.Eskursione);
        this.eskursione  = this.nxenesi.Eskursione;
        // this.eskursione.filter( x => x!='');
        console.log(this.eskursione);
        this.perqShkolla = Number(this.nxenesiService.form.controls['PaguarShkolla'].value) / Number(this.nxenesiService.form.controls['PagesaShkolla'].value) * 100;
        this.mbetjaShkolla = Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - Number(this.nxenesiService.form.controls['PaguarShkolla'].value);

        this.perqTransporti = Number(this.nxenesiService.form.controls['PaguarTransporti'].value) / Number(this.nxenesiService.form.controls['PagesaTransporti'].value) * 100;
        this.mbetjaTransporti = Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - Number(this.nxenesiService.form.controls['PaguarTransporti'].value);

        this.perqUniforma = Number(this.nxenesiService.form.controls['PaguarUniforma'].value) / Number(this.nxenesiService.form.controls['PagesaUniforma'].value) * 100;
        this.mbetjaUniforma = Number(this.nxenesiService.form.controls['PagesaUniforma'].value) - Number(this.nxenesiService.form.controls['PaguarUniforma'].value);

        this.perqLibrat = Number(this.nxenesiService.form.controls['PaguarLibrat'].value) / Number(this.nxenesiService.form.controls['PagesaLibrat'].value) * 100;
        this.mbetjaLibrat = Number(this.nxenesiService.form.controls['PagesaLibrat'].value) - Number(this.nxenesiService.form.controls['PaguarLibrat'].value);
        this.gjejEskursionetShkolla();
      }
    );

  }
  onSubmitShkolla() {
    this.hideShkolla = !this.hideShkolla;
    this.hideTransporti = false;
    this.hideUniforma = false;
    this.hideLibrat = false;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      ; this.boxRef.nativeElement.focus();
 }, 200);
   

  }
  onSubmitTransporti() {
    this.hideTransporti = !this.hideTransporti;
    this.hideShkolla = false;
    this.hideUniforma = false;
    this.hideLibrat = false;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      ; this.boxRef1.nativeElement.focus();
 }, 200);
  }
  onSubmitUniforma() {
    this.hideUniforma = !this.hideUniforma;
    this.hideTransporti = false;
    this.hideShkolla = false;
    this.hideLibrat = false;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      ; this.boxRef2.nativeElement.focus();
 }, 200);
  }
  onSubmitLibrat() {
    this.hideLibrat = !this.hideLibrat;
    this.hideTransporti = false;
    this.hideUniforma = false;
    this.hideShkolla = false;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      ; this.boxRef3.nativeElement.focus();
 }, 200);
  }

  shkolla(box) {
   
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


  gjejEskursionetShkolla(){
   this.eskursionetShkolla.getEskursione(localStorage.getItem('VitiShkollor')).subscribe(l=>{
   l.map(i=>{ this.eskursioneDisponibel = i.payload.val();
//  this.eskursioneDisponibel = arr;
  console.log(this.eskursioneDisponibel.eskursione[0].Emri);
   });
  })


}
}





