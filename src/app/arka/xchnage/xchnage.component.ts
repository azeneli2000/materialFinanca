import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArkaService } from 'src/app/shared/arka.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-xchnage',
  templateUrl: './xchnage.component.html',
  styleUrls: ['./xchnage.component.css']
})
export class XchnageComponent implements OnInit {

  constructor(private arkaservice : ArkaService,private notification : NotificationService ,private dialogRef : MatDialogRef<XchnageComponent>,) { }
  
  res;
  monedhat = [{value :"EUR"},{value :"LEK"},{value :"DOLLARE"}];
  form: FormGroup = new FormGroup({
   
    MonedhaFillestare: new FormControl('', [Validators.required]),
    MonedhaPerfundimtare: new FormControl('', [Validators.required]),
    Sasia: new FormControl('', [Validators.required]),
    Kursi: new FormControl('', [Validators.required]),
    Koment: new FormControl('Xchange'),

  });
  ngOnInit() {
    this.arkaservice.getTotali();
  }
  onSubmit()
  {
    this.arkaservice.updateTotaliX (Number(this.form.get("Sasia").value),this.form.get("MonedhaFillestare").value,this.form.get("MonedhaPerfundimtare").value,this.form.get("Kursi").value);

this.arkaservice.insertXchange(this.form.get("MonedhaFillestare").value,this.form.get("MonedhaPerfundimtare").value,Number(this.form.get("Sasia").value),this.form.get("Kursi").value,this.form.get("Koment").value);
// this.arkaservice.updateTotaliX()
// this.updateTotaliX(sasia,monedhaFillestare,monedhaPerfundimtare,kursi);

this.onClose();

  }

  onClose() {
    this.form.reset();
    //this.form.initializeFormGroup();
    this.dialogRef.close();
  }
  llogaritXchange()
  {
    switch(this.form.get("MonedhaFillestare").value)
    {
      case  "EUR":{
      

        if (this.form.get("MonedhaPerfundimtare").value == "LEK")
        this.res =  Number(this.form.get("Sasia").value)*Number(this.form.get("Kursi").value);
        if (this.form.get("MonedhaPerfundimtare").value == "DOLLARE")
         this.res =  Number(this.form.get("Sasia").value)*Number(this.form.get("Kursi").value);
        
       
        break;
      }
      case "LEK" :
        {
          if (this.form.get("MonedhaPerfundimtare").value == "EUR")
          this.res =  Number(this.form.get("Sasia").value)/Number(this.form.get("Kursi").value);
          if (this.form.get("MonedhaPerfundimtare").value == "DOLLARE")
           this.res =  Number(this.form.get("Sasia").value)/Number(this.form.get("Kursi").value);
          break;
          
        }
    
        case "DOLLARE" :
            {
              if (this.form.get("MonedhaPerfundimtare").value == "LEK")
              this.res =  Number(this.form.get("Sasia").value)*Number(this.form.get("Kursi").value);
              if (this.form.get("MonedhaPerfundimtare").value == "DOLLARE")
               this.res =  Number(this.form.get("Sasia").value)*Number(this.form.get("Kursi").value);
               break;
              
            }
    }


  }


}
