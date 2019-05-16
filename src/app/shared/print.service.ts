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
      
      var config = qz.configs.create("Jolimark TP820");       
      var data = [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A' + '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , 
        '\x0A',
        'KLASA : ' + klasa +   indeksi , 
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , 
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper       
     ];
     
      return qz.print(config, data);
      
   }).catch((e)=> { console.error(e); });
  }else
  {
      var config = qz.configs.create("Jolimark TP820");       
      var data =  [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size
        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size
        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , 
        '\x0A',
        'KLASA : ' + klasa +   indeksi , 
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , 
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
       
     ];
      return qz.print(config, data);
  }
}
  printEskursione(llojiPagesa,emri,mbiemri,emriEskursioni,pagesa,monedha){
  if(!qz.websocket.isActive()){
     let data = new Date().toLocaleDateString()
    qz.websocket.connect().then(()=> { 
      
      var config = qz.configs.create("Jolimark TP820");       
      var data = [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
         '\x0A',
         'ESKU : ' + emriEskursioni , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
         '\x0A',
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric    
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
       
     ];
     
      return qz.print(config, data);
      
   }).catch((e)=> { console.error(e); });
  }else
  {
      var config = qz.configs.create("Jolimark TP820");       
      var data =  [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , 
         '\x0A',
         'ESKU : ' + emriEskursioni , 
         '\x0A',
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , 
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
       
     ];
      return qz.print(config, data);
  }
  }


  
  print22(llojiPagesa,emri,mbiemri,pagesa,monedha){
  if(!qz.websocket.isActive()){
     let data = new Date().toLocaleDateString()
    qz.websocket.connect().then(()=> { 
      
      var config = qz.configs.create("Jolimark TP820");       
      var data = [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
      
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
       
     ];
     
      return qz.print(config, data);
      
   }).catch((e)=> { console.error(e); });
  }else
  {
      var config = qz.configs.create("Jolimark TP820");       
      var data =  [
        // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
        '\x1B' + '\x40',          // init
        '\x1B' + '\x61' + '\x31', // center align
        '\x1B' + '\x45' + '\x0D', // bold on
        '\x1D' + '\x21' + '\x11', // double font size

        'Shkolla "Nr.1"' ,     // text and line break
        '\x0A',                   // line break
        '\x1B' + '\x45' + '\x0A', // bold off
        '\x1D' + '\x21' + '\x00', // standard font size

        new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
        '\x0A' + '\x0A' ,                   // line break
        '\x1B' + '\x45' + '\x0D', // bold on
         llojiPagesa + '\x0A',
         localStorage.getItem('VitiShkollor') +'\x0A',
         '\x1B' + '\x45' + '\x0A', // bold off
        '\x0A',
        '\x1B' + '\x61' + '\x30', // left align
         'EMRI :  ' + emri + ' '+  mbiemri , 
     
        '\x0A',
        'VLERA : ' + pagesa +   ' ' + monedha ,
        '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,

        '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
        '\x1B' + '\x69',          // cut paper
       
     ];
      return qz.print(config, data);
  }
  }




  printShpenzime(llojiPagesa : string,koment,pagesa,monedha){
    if(!qz.websocket.isActive()){
       let data = new Date().toLocaleDateString()
      qz.websocket.connect().then(()=> { 
        
        var config = qz.configs.create("Jolimark TP820");       
        var data = [
          // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
          '\x1B' + '\x40',          // init
          '\x1B' + '\x61' + '\x31', // center align
          '\x1B' + '\x45' + '\x0D', // bold on
          '\x1D' + '\x21' + '\x11', // double font size
  
          'Shkolla "Nr.1"' ,     // text and line break
          '\x0A',                   // line break
          '\x1B' + '\x45' + '\x0A', // bold off
          '\x1D' + '\x21' + '\x00', // standard font size
  
          new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
          '\x0A' + '\x0A' ,                   // line break
          '\x1B' + '\x45' + '\x0D', // bold on
          'PAGESE PER ' + llojiPagesa.toUpperCase() + '\x0A',
           '\x1B' + '\x45' + '\x0A', // bold off
          '\x0A',
          '\x1B' + '\x61' + '\x30', // left align
           'Persh :  ' +koment, 
        
          '\x0A',
          'VLERA : ' + pagesa +   ' ' + monedha , 
          '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
  
          '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
          '\x1B' + '\x69',          // cut paper
        
       ];
       
        return qz.print(config, data);
        
     }).catch((e)=> { console.error(e); });
    }else
    {
        var config = qz.configs.create("Jolimark TP820");       
        var data =  [
          // { type: 'raw', format: 'image', data: 'assets/img/image_sample_bw.png', options: { language: "ESCPOS", dotDensity: 'double' } },
          '\x1B' + '\x40',          // init
          '\x1B' + '\x61' + '\x31', // center align
          '\x1B' + '\x45' + '\x0D', // bold on
          '\x1D' + '\x21' + '\x11', // double font size
  
          'Shkolla "Nr.1"' ,     // text and line break
          '\x0A',                   // line break
          '\x1B' + '\x45' + '\x0A', // bold off
          '\x1D' + '\x21' + '\x00', // standard font size
  
          new Date().toLocaleDateString('fr') +'  ' + new Date().toLocaleTimeString('fr'),
          '\x0A' + '\x0A' ,                   // line break
          '\x1B' + '\x45' + '\x0D', // bold on
          'PAGESE PER ' + llojiPagesa.toUpperCase() + '\x0A',
           '\x1B' + '\x45' + '\x0A', // bold off
          '\x0A',
          '\x1B' + '\x61' + '\x30', // left align
          'Persh :  ' +koment, //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric       
          '\x0A',
          'VLERA : ' + pagesa +   ' ' + monedha , //+ '\x1B' + '\x74' + '\x13' + '\xAA', //print special char symbol after numeric
          '\x0A' +'\x0A'+'\x0A'+'Zyra e Finances'+ '           Arketuesi'+'\x0A'+ 'Klajd Billa'+'\x0A'+'\x0A'+'\x0A'+'\x0A' ,
  
          '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
          '\x1B' + '\x69',          // cut paper
       
       ];
        return qz.print(config, data);
    }
    }






}
