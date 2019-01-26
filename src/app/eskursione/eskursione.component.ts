import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { EskursioneService } from '../shared/eskursione.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';
import { ShpenzimeService } from '../shared/shpenzime.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eskursione',
  templateUrl: './eskursione.component.html',
  styleUrls: ['./eskursione.component.css']
})
export class EskursioneComponent implements OnInit {
  insert: boolean;
  isLoading = true;

  Shpenzimi = {
    Kosto: 0,
    Data: '',
    Monedha: '',
    Koment: ''
  };
  error;
  constructor(private eskursione: EskursioneService, private notification: NotificationService, private dialogService: ConfirmDialogService, private shpenzimeService: ShpenzimeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.eskursione.initializeFormGroup();
    console.log(this.eskursione.form.get('eskursione').value[0].Emri);

    let v = this.eskursione.getEskursione(localStorage.getItem('VitiShkollor')).subscribe(
      list => {
        console.log(list.length);
        if (list.length > 0) {
          this.isLoading = false;
          this.insert = false;
          list.map(item => { console.log(item.payload.val()); console.log(item.key); this.eskursione.populateForm(item.payload.val(), item.key); });
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
        this.eskursione.updateEskursione(this.eskursione.form.value, localStorage.getItem('VitiShkollor'));
      }
      // this.konfigurime.form.reset();
      // this.konfigurime.initializeFormGroup();
      this.notification.success("Eskursionet u ruajten !");
    }
  }

  insertShpenzim1(i) {

    this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te beni pagesen per eskursionin e zgjedhur ?')
      .afterClosed().subscribe(res => {
        if (res) {
          if (this.eskursione.form.get('eskursione').value[i].Emri != '' && this.eskursione.form.get('eskursione').value[i].Monedha != '' && this.eskursione.form.get('eskursione').value[i].PagesaAgjensia != '') {


            let shpenzimiDate = new Date().toLocaleDateString();
            this.datePipe.transform(shpenzimiDate, "dd/MM/yyyy");
            this.Shpenzimi.Kosto = Number(this.eskursione.form.get('eskursione').value[i].PagesaAgjensia);
            this.Shpenzimi.Data = shpenzimiDate;
            this.Shpenzimi.Monedha = this.eskursione.form.get('eskursione').value[i].MonedhaEskursioni;
            this.Shpenzimi.Koment = this.eskursione.form.get('eskursione').value[i].Emri + '  ' +this.eskursione.form.get('eskursione').value[i].Data;

            this.eskursione.form.controls['eskursione'].value[i] = {
              Agjensia: true,
              Emri: this.eskursione.form.get('eskursione').value[i].Emri,
              Data: this.eskursione.form.get('eskursione').value[i].Data,
              MonedhaEskursioni: this.eskursione.form.get('eskursione').value[i].MonedhaEskursioni,
              Pagesa: this.eskursione.form.get('eskursione').value[i].Pagesa,
              PagesaAgjensia: this.eskursione.form.get('eskursione').value[i].PagesaAgjensia
            };
            this.shpenzimeService.insertShpenzime('Ekskursione', this.Shpenzimi);

            this.eskursione.updateEskursione(this.eskursione.form.value, localStorage.getItem('VitiShkollor'));
            this.notification.success('Pagesa u krye !')

          }

          else
            this.notification.warn('Plotesoni te gjitha fushat e duhura perpara se te beni pagesen !')
        }
      });

  }
}