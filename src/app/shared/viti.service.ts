import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitiService {


  private _msgMenu = new Subject<string>()
  msgMenu$  = this._msgMenu.asObservable();
  private totaliArka = new Subject<string>()
  totaliAraka$  = this._msgMenu.asObservable();

  constructor() { }

  dergoMsg(msg){

this._msgMenu.next(msg);
  }

  dergoTotaliArka(totali){
    this.totaliArka.next(totali)
  }
}
