import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatChipInputEvent, MatDialogConfig } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { EskursioneService } from 'src/app/shared/eskursione.service';
import { CurrencyPipe } from '@angular/common';
import { PrintService } from 'src/app/shared/print.service';
import { ArkaService } from 'src/app/shared/arka.service';
import { auth } from 'firebase';
import { LibratNxenesiComponent } from 'src/app/librat-nxenesi/librat-nxenesi.component';

export interface DialogData {
  monedha: 'EUR' | 'LEK' | '$';
}

@Component({
  selector: 'app-nxenesi-detaje',
  templateUrl: './nxenesi-detaje.component.html',
  styleUrls: ['./nxenesi-detaje.component.css']
})
export class NxenesiDetajeComponent implements OnInit {

  constructor(private cp : CurrencyPipe , public nxenesiService: NxenesiService,private eskursionetShkolla : EskursioneService, private route: ActivatedRoute, public dialog: MatDialog, private notification: NotificationService,private printer:PrintService,private arka : ArkaService ) { }
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

  hideShkolla: boolean = true;
  hideTransporti: boolean = true;
  hideUniforma: boolean = true;
  hideLibrat: boolean = true;


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
     //insert transaksion
      this.arka.insertTransaksion('PE-' + this.eskursioneDisponibel.eskursione[Number(value)].Emri ,this.nxenesiService.form.controls["$key"].value,this.nxenesiService.form.controls["Emri"].value + this.nxenesiService.form.controls["Mbiemri"].value,this.eskursioneDisponibel.eskursione[Number(value)].MonedhaEskursioni,this.eskursioneDisponibel.eskursione[Number(value)].Pagesa,'Arketim per eskursion',"0")
      this.arka.updateTotali(this.eskursioneDisponibel.eskursione[Number(value)].Pagesa,this.eskursioneDisponibel.eskursione[Number(value)].MonedhaEskursioni);

      //print fatura
      this.printer.printEskursione('ARKETIM PER ESKURSION',this.nxenesiService.form.controls['Emri'].value,this.nxenesiService.form.controls['Mbiemri'].value,this.eskursioneDisponibel.eskursione[Number(value)].Emri,this.eskursioneDisponibel.eskursione[Number(value)].Pagesa,this.eskursioneDisponibel.eskursione[Number(value)].MonedhaEskursioni);
console.log(this.eskursioneDisponibel.eskursione[Number(value)].Emri);
      console.log('adeded');
    }
      if (input) {
      input.value = '';
    }
  }
  
  ngOnInit() {
   //  this.printer.getPrinters().subscribe(res=>console.log(res));
 
   //  this.printer.printData('OneNote','Andi').subscribe(res=>console.log(res));
  //  this.printer.print();
  //  this.printer.removePrinter();
    this.arka.getTotali();
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
        this.nxenesiService.form.controls["Skonto"].setValue(this.nxenesi.Skonto);
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

  shkolla(box ) {
   
    // if ((Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - (Number(this.nxenesiService.form.controls['PaguarShkolla'].value) + Number(box))) >= 0 && box != "" && Number(box) != 0) {
      this.nxenesiService.form.controls['PaguarShkolla'].setValue(Number(this.nxenesiService.form.controls['PaguarShkolla'].value) + Number(box));
      this.perqShkolla = Number(this.nxenesiService.form.controls['PaguarShkolla'].value) / Number(this.nxenesiService.form.controls['PagesaShkolla'].value) * 100;
      this.mbetjaShkolla = Number(this.nxenesiService.form.controls['PagesaShkolla'].value) - Number(this.nxenesiService.form.controls['PaguarShkolla'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      //gjenerimi i transksionit per pagesen e shkolles
     this.arka.insertTransaksion('PSH',this.nxenesiService.form.controls["$key"].value,this.nxenesiService.form.controls["Emri"].value + this.nxenesiService.form.controls["Mbiemri"].value,this.nxenesiService.form.controls["MonedhaShkolla"].value,Number(box),'Arketim per shkollim',"0")
    this.arka.updateTotali(Number(box),this.nxenesiService.form.controls["MonedhaShkolla"].value);
     console.log(JSON.parse(localStorage.getItem('user')).displayName);
     //printimi i fatures
      let printerArray : string[] = ['Nxenesi ka paguar : '];
      printerArray.push(box);
      this.printer.print11('ARKETIM PER SHKOLLIM',this.nxenesiService.form.controls['Emri'].value,this.nxenesiService.form.controls['Mbiemri'].value,this.nxenesiService.form.controls['Klasa'].value,this.nxenesiService.form.controls['Indeksi'].value,box,this.nxenesiService.form.controls['MonedhaShkolla'].value);
      this.printer.print11('ARKETIM PER SHKOLLIM',this.nxenesiService.form.controls['Emri'].value,this.nxenesiService.form.controls['Mbiemri'].value,this.nxenesiService.form.controls['Klasa'].value,this.nxenesiService.form.controls['Indeksi'].value,box,this.nxenesiService.form.controls['MonedhaShkolla'].value);

     


      this.hideShkolla = false;
      this.nxenesiService.form.reset();
      this.nxenesiService.initializeFormGroup();
      this.notification.success("Pagesa u krye me sukses !");
    // }
    // else {
    //   this.notification.warn("Vendosni pagesen ne formatin e duhur !");
    //   this.hideShkolla = false;

    // }
    this.boxRef.nativeElement.value  = "";
    this.boxRef1.nativeElement.value  = "";
    this.boxRef2.nativeElement.value  = "";
    this.boxRef3.nativeElement.value  = "";


  }

  transporti(box1) {
    
    // if ((Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - (Number(this.nxenesiService.form.controls['PaguarTransporti'].value) + Number(box1))) >= 0 && box1 != "" && Number(box1) != 0) {
      this.nxenesiService.form.controls['PaguarTransporti'].setValue(Number(this.nxenesiService.form.controls['PaguarTransporti'].value) + Number(box1));
      this.perqTransporti = Number(this.nxenesiService.form.controls['PaguarTransporti'].value) / Number(this.nxenesiService.form.controls['PagesaTransporti'].value) * 100;
      this.mbetjaTransporti = Number(this.nxenesiService.form.controls['PagesaTransporti'].value) - Number(this.nxenesiService.form.controls['PaguarTransporti'].value);
      this.nxenesiService.updateNxenes(this.nxenesiService.form.value);
      //gjenerimi i transaksionit
      this.arka.insertTransaksion('PT',this.nxenesiService.form.controls["$key"].value,this.nxenesiService.form.controls["Emri"].value + this.nxenesiService.form.controls["Mbiemri"].value,this.nxenesiService.form.controls["MonedhaTransporti"].value,Number(box1),'Arketim per transport',"0")
      this.arka.updateTotali(Number(box1),this.nxenesiService.form.controls["MonedhaTransporti"].value);

      //printimi i fatures
      this.printer.print11('ARKETIM PER TRANSPORTIN',this.nxenesiService.form.controls['Emri'].value,this.nxenesiService.form.controls['Mbiemri'].value,this.nxenesiService.form.controls['Klasa'].value,this.nxenesiService.form.controls['Indeksi'].value,box1,this.nxenesiService.form.controls['MonedhaTransporti'].value);
      this.printer.print11('ARKETIM PER SHKOLLIM',this.nxenesiService.form.controls['Emri'].value,this.nxenesiService.form.controls['Mbiemri'].value,this.nxenesiService.form.controls['Klasa'].value,this.nxenesiService.form.controls['Indeksi'].value,box1,this.nxenesiService.form.controls['MonedhaTransporti'].value);

      console.log(this.hideTransporti);
      this.hideTransporti = false;
      this.notification.success("Pagesa u krye me sukses !");
    // }
    // else {
    //   this.notification.warn("Vendosni pagesen ne formatin e duhur !");
    //   this.hideTransporti = false;

    // }

    this.boxRef.nativeElement.value  = "";
    this.boxRef1.nativeElement.value  = "";
    this.boxRef2.nativeElement.value  = "";
    this.boxRef3.nativeElement.value  = "";

  }

  
  

  gjejEskursionetShkolla(){
   this.eskursionetShkolla.getEskursione(localStorage.getItem('VitiShkollor')).subscribe(l=>{
   l.map(i=>{ this.eskursioneDisponibel = i.payload.val();
//  this.eskursioneDisponibel = arr;
  console.log(this.eskursioneDisponibel.eskursione[0].Emri);
   });
  })
 

}


onClickLibrat(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    Klasa : this.nxenesi.Klasa,
    key : this.nxenesiService.form.controls["$key"].value,
    Emri : this.nxenesi.Emri,
    Mbiemri:this.nxenesi.Mbiemri
  };
  dialogConfig.height = "100%";
  dialogConfig.width = "50%";

  this.dialog.open(LibratNxenesiComponent,dialogConfig)
 
}


}





