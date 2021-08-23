import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { PrintService } from '../shared/print.service';
import { ShtepiteBotueseService } from '../shared/shtepite-botuese.service';

@Component({
  selector: 'app-pagesa-shtepite-botuese',
  templateUrl: './pagesa-shtepite-botuese.component.html',
  styleUrls: ['./pagesa-shtepite-botuese.component.css']
})
export class PagesaShtepiteBotueseComponent implements OnInit {

  constructor(public service : ShtepiteBotueseService, private notification : NotificationService ,private dialogRef : MatDialogRef<PagesaShtepiteBotueseComponent>) { }

  ngOnInit() {

  }
  
  onSubmit(){
    this.service.insertShtepiBotuese(this.service.form.controls["Emri"]);
    this.notification.success("Shtepia botuese u ruajt !");
    this.onClose();
  
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
  

}
