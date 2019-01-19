import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { EskursioneService } from '../shared/eskursione.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';

@Component({
  selector: 'app-eskursione',
  templateUrl: './eskursione.component.html',
  styleUrls: ['./eskursione.component.css']
})
export class EskursioneComponent implements OnInit {
  insert: boolean;
  isLoading = true;
  constructor(private eskursione: EskursioneService, private notification: NotificationService, private dialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.eskursione.initializeFormGroup();
    console.log(this.eskursione.form.get('eskursione').value[0].Emri);

    let v = this.eskursione.getEskursione(localStorage.getItem('VitiShkollor')).subscribe(
      list => { console.log(list.length);
        if (list.length > 0) {
        this.isLoading = false;
          this.insert = false;
          list.map(item => { console.log(item.payload.val());  console.log(item.key); this.eskursione.populateForm(item.payload.val(),item.key);  });
        }
        else {
          this.insert = true;
          //this.konfigurime.initializeFormGroup();
          this.eskursione.form.reset;
          this.isLoading = false;

        }
        v.unsubscribe();
      });
  }


  onSubmit() {
    if (this.eskursione.form.valid) {
      if (this.insert) {
        this.eskursione.insertEskursione(localStorage.getItem('VitiShkollor'))
        
      }
      else {
        console.log(this.eskursione.form.value);
        console.log(localStorage.getItem('VitiShkollor'));
        this.eskursione.updateEskursione(this.eskursione.form.value,localStorage.getItem('VitiShkollor'));
      }
      // this.konfigurime.form.reset();
      // this.konfigurime.initializeFormGroup();
      this.notification.success("Eskursionet u ruajten !");
    }
  }


}
