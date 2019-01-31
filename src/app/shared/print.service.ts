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

  print11(llojiPagesa,emri,mbiemri,klasa,indeksi,pagesa,monedha){
  if(!qz.websocket.isActive()){
     let data = new Date().toLocaleDateString()
    qz.websocket.connect().then(()=> { 
      
      var config = qz.configs.create("Two Pilots Demo Printer");       
      var data = [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla Nr 1' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',
        'KLASA : ' + klasa +   indeksi , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',




        
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',       
        '\x1B' + '\x45' + '\x0D', // bold on
        'Here\'s some bold text!',
        '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x11', // double font size
        'Here\'s large text!',
        '\x0A',
        '\x1D' + '\x21' + '\x00', // standard font size
        '\x1B' + '\x61' + '\x32', // right align
        '\x1B' + '\x21' + '\x30', // em mode on
        'DRINK ME',
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '------------------------------------------' + '\x0A',
        '\x1B' + '\x4D' + '\x31', // small text
        'EAT ME' + '\x0A',
        '\x1B' + '\x4D' + '\x30', // normal text
        '------------------------------------------' + '\x0A',
        'normal text',
        '\x1B' + '\x61' + '\x30', // left align
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
        '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                     // **for legacy drawer cable CD-005A.  Research before using.
                                                     // see also http://keyhut.com/popopen4.htm
     ];
     
      return qz.print(config, data);
      
   }).catch((e)=> { console.error(e); });
  }else
  {
      var config = qz.configs.create("Two Pilots Demo Printer");       
      var data =  [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla Nr 1' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',
        'KLASA : ' + klasa +   indeksi , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A',




        
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',       
        '\x1B' + '\x45' + '\x0D', // bold on
        'Here\'s some bold text!',
        '\x0A',
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x11', // double font size
        'Here\'s large text!',
        '\x0A',
        '\x1D' + '\x21' + '\x00', // standard font size
        '\x1B' + '\x61' + '\x32', // right align
        '\x1B' + '\x21' + '\x30', // em mode on
        'DRINK ME',
        '\x1B' + '\x21' + '\x0A' + '\x1B' + '\x45' + '\x0A', // em mode off
        '\x0A' + '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
        '------------------------------------------' + '\x0A',
        '\x1B' + '\x4D' + '\x31', // small text
        'EAT ME' + '\x0A',
        '\x1B' + '\x4D' + '\x30', // normal text
        '------------------------------------------' + '\x0A',
        'normal text',
        '\x1B' + '\x61' + '\x30', // left align
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
        '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
                                                     // **for legacy drawer cable CD-005A.  Research before using.
                                                     // see also http://keyhut.com/popopen4.htm
     ];
      return qz.print(config, data);
  }
  }




 






}
