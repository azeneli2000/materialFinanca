import { Component, OnInit, Input } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import { MatDialogRef } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { KonfigurimeService } from 'src/app/shared/konfigurime.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { VitiService } from 'src/app/shared/viti.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nxenesi',
  templateUrl: './nxenesi.component.html',
  styleUrls: ['./nxenesi.component.css']
})
export class NxenesiComponent implements OnInit {


  Klasat = [
    { value: '0', viewValue: "0" },
    { value: '1', viewValue: "I" },
    { value: '2', viewValue: "II" },
    { value: '3', viewValue: "III" },
    { value: '4', viewValue: "IV" },
    { value: '5', viewValue: "V" },
    { value: '6', viewValue: "VI" },
    { value: '7', viewValue: "VII" },
    { value: '8', viewValue: "VIII" },
    { value: '9', viewValue: "IX" },
    { value: '10', viewValue: "X" },
    { value: '11', viewValue: "XI" },
    { value: '12', viewValue: "XII" }
  ];
  Indekset = [
    { value: 'A', viewValue: "A" },
    { value: 'B', viewValue: "B" },
    { value: 'C', viewValue: "C" },
    { value: 'D', viewValue: "D" },

  ];
 
Eskursionet  = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
perqindjaTot : number = 0;
vitiZgjedhur = '2020-2021';
klasaZgjedhur;
pagesaKlasa;
pagesaTransporti;
pagesaLibrat;
pagesaUniforma;

cmimiKlasa : number = 0;
  Uljet = [] ;
    // {name: 'Lemon'},
    // {name: 'Lime'},
    // {name: 'Apple'},
  disabled = false;
  visible = true;
  selectable = true;
  removable = false;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public service: NxenesiService, private notification: NotificationService, private dialogRef: MatDialogRef<NxenesiComponent>,private konfigurime : KonfigurimeService) { }



  //chips
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && !isNaN(Number(value.slice(-4))) && (Number(value.slice(-4)) != 0)) {
      this.Uljet.push(  value.trim() );
      let perqindja = Number(value.slice(-4));
this.pagesaKlasa = Math.round( this.pagesaKlasa - this.pagesaKlasa*perqindja/100);
    }
    if (input) {
      input.value = '';
    }
  }

  remove(ulje): void {
    const index = this.Uljet.indexOf(ulje);
    if (index >= 0) {
      this.Uljet.splice(index, 1);
      let perqindja = Number(ulje.slice(-4));
     this.pagesaKlasa =Math.round(this.pagesaKlasa*(100/(100-perqindja)));
    }
  }
  //chips

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
       //insert        
       this.service.form.controls['PagesaShkolla'].setValue(this.pagesaKlasa);
       this.service.form.controls['PagesaUniforma'].setValue(this.pagesaUniforma);
       this.service.form.controls['PagesaLibrat'].setValue(this.pagesaLibrat);
       this.service.form.controls['PagesaTransporti'].setValue(this.pagesaTransporti);
        if (this.Uljet.length > 0){
          this.service.form.controls['Skonto'].setValue(this.Uljet);

        }
        else
        {
         this.service.form.controls['Skonto'].setValue(null);
        }
        console.log(this.Eskursionet);
       this.service.form.controls['Eskursione'].setValue(this.Eskursionet);
      //  for(let i =1; i<300;i++ )
        this.service.insertNxenes(this.service.form.value);
      }
      //modifikim
      else {
        this.service.skontoUpdate = false;
        this.service.form.controls['PagesaShkolla'].setValue(this.pagesaKlasa);
       
        this.service.form.controls['Skonto'].setValue(this.Uljet);
        this.service.updateNxenes(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notification.success("Nxenesi u ruajt");
      this.onClose();
    }
  }
  onClose() {
    this.service.form.reset();

    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onCheck(t) {
   
      console.log('insert');
     let klasaPagesa = 'ShkollaKlasa'+ this.klasaZgjedhur;
      let v= this.konfigurime.getKonfigurime().subscribe(
      list => { if(list.length>0){
        list.map(item =>{
       
          this.pagesaTransporti =item.payload.val()["TransportiKlasa" + this.klasaZgjedhur];
          this.pagesaUniforma =item.payload.val()["UniformaKlasa" + this.klasaZgjedhur];
          console.log(this.pagesaTransporti)});
          this.service.form.controls['PagesaTransporti'].setValue(this.pagesaTransporti);
          this.service.form.controls['PagesaUniforma'].setValue(this.pagesaUniforma);
      }
      else {
        this.pagesaKlasa = 1;
      }
      v.unsubscribe();
        });
       
     
    
  }
  ngOnInit() {
    console.log(this.Eskursionet);
  //   let obj : any;
  //   if (this.service.form.get('$key').value) 
  //   {
  //    obj = this.service.getNxenes(this.service.form.get('$key').value).subscribe(

  //       data => {
  //       let nxenesi = data.payload.val();
      
  //         this.Uljet=nxenesi["Skonto"];
  //        console.log(nxenesi);
  //       }
  //     );
  // }

      // po behet modifikim  
     if(this.service.form.get('Skonto').value)//nqs uljet nuk jane null
     this.Uljet =  this.service.form.get('Skonto').value;//vendos vleren e skontos te array uljet            
     this.pagesaKlasa = this.service.form.get('PagesaShkolla').value;
     this.klasaZgjedhur = this.service.form.get('Klasa').value;
console.log(this.Uljet);

    
  }
  onChangeKlasa(klasa) {
   // this.vitiZgjedhur = viti.value;
   if (!this.service.form.get('$key').value)
   {
     console.log('insert');
    this.klasaZgjedhur = klasa.value;
    let klasaPagesa = 'ShkollaKlasa'+ this.klasaZgjedhur;
    console.log(klasa.value);
     let v= this.konfigurime.getKonfigurime().subscribe(
     list => { if(list.length>0){
       list.map(item =>{
         this.pagesaKlasa =item.payload.val()["ShkollaKlasa" + this.klasaZgjedhur];
         this.pagesaTransporti =item.payload.val()["TransportiKlasa" + this.klasaZgjedhur];
         this.pagesaUniforma =item.payload.val()["UniformaKlasa" + this.klasaZgjedhur];
         this.pagesaLibrat =item.payload.val()["LibratKlasa" + this.klasaZgjedhur];
         console.log(this.pagesaKlasa)});
     }
     else {
       this.pagesaKlasa = 1;
     }
     v.unsubscribe();
       });
      }
      else{
        this.pagesaKlasa = this.service.form.get('PagesaShkolla').value;
        console.log('modifikim');
      }
    }

    
}
