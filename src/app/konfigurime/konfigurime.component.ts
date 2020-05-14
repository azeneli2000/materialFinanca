import { Component, OnInit } from '@angular/core';
import { KonfigurimeService } from '../shared/konfigurime.service';
import { NotificationService } from '../shared/notification.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';

@Component({
  selector: 'app-konfigurime',
  templateUrl: './konfigurime.component.html',
  styleUrls: ['./konfigurime.component.css']
})
export class KonfigurimeComponent implements OnInit {
  insert: boolean;
  vitiShkollor = [{ value: '2019-2020' }, { value: "2020-2021" }, { value: "2021-2022" }, { value: "2022-2023" }, { value: "2023-2024" }, { value: "2024-2025" }, { value: "2025-2026" }, { value: "2026-2027" }];
  vitiZgjedhur;
  isLoading = true;
  user : boolean = false;
  constructor(public konfigurime: KonfigurimeService, private notification: NotificationService, private dialogService: ConfirmDialogService) { }

  onSubmit() {
    if (this.konfigurime.form.valid) {
      if (this.insert) {
        this.konfigurime.insertVitShkollor(this.konfigurime.form.value);
      }
      else {
        console.log(this.vitiZgjedhur);
        this.konfigurime.updateViti(this.konfigurime.form.value);
      }
      // this.konfigurime.form.reset();
      // this.konfigurime.initializeFormGroup();
      this.notification.success("Konfigurimet  u ruajten ");
    }
  }


  ngOnInit() {
    let c = JSON.parse(localStorage.getItem('user'));
    if(c.displayName == "Zenel Zeneli")
    this.user = true;    
    let v = this.konfigurime.getKonfigurime().subscribe(
      list => {
        if (list.length > 0) {
        this.isLoading = false;
          this.insert = false;
          list.map(item => { this.konfigurime.populateForm(item.payload.val(), item.key); console.log(item.payload.val()) });
        }
        else {
          this.insert = true;
          this.konfigurime.initializeFormGroup();
          this.konfigurime.form.reset;
          this.isLoading = false;

        }
        v.unsubscribe();
      });
  }



}





