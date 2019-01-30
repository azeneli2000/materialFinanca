import { Injectable } from '@angular/core';

import { Observable,from } from 'rxjs';
 import { map } from 'rxjs/operators';
 import * as shajs from 'angular-sha';
 import {Sha256} from 'sha256';

 import * as RSVP from 'rsvp';
 import * as qz from 'qz-tray';

// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// declare var qz: any;

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

 
  removePrinter(): void {
     qz.websocket.disconnect();
  }

  print11(data : string[]){
  if(!qz.websocket.isActive()){
    qz.websocket.connect().then(()=> { 
      
      var config = qz.configs.create("ZDesigner");       
      return qz.print(config, data);
      
   }).catch((e)=> { console.error(e); });
  }else
  {
      var config = qz.configs.create("ZDesigner");       
      var data = ['Raw Data\n'];  
      return qz.print(config, data);
  }
  }




 






}
