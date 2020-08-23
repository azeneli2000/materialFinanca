import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ArkaService {

  constructor(private db: AngularFireDatabase) { }
  arkaList: AngularFireList<any>;
TotaliEuro ; TotaliLeke ; TotaliDoll ;
  getArka(){

     return  this.db.list('Arka',ref=>ref.orderByChild("Data")).snapshotChanges();
  }


   insertTransaksion( lloji : string,docRef : string, tedhena:string, valuta : string, sasia : number,koment : string, docRef1) {
    let vitiShkollor = localStorage.getItem('VitiShkollor');
 
    this.arkaList = this.db.list('Arka');
     
    this.arkaList.push(
      {
        Lloji : lloji,
        DocRef : docRef,
        DocRef1 : docRef1, 
        TeDhena :tedhena,
        Valuta : valuta,
        Sasia : sasia,
        Anulluar : false,
        VitiShkollor : vitiShkollor,
        Data : new Date().toLocaleDateString(),
        Koha : new Date().toLocaleTimeString(),
        User : JSON.parse(localStorage.getItem('user')).displayName,
        Koment : koment,

      });
  }

  insertXchange(monedhaFillestare : string, monedhaPerfundimtare : string, sasia : number, kursi : number,koment : string) {
    let vitiShkollor = localStorage.getItem('VitiShkollor');

    this.arkaList = this.db.list('Arka');
     
  this.arkaList.push(
      {
        Lloji : 'Xchange',
        DocRef : '',
        DocRef1 : '',
        TeDhena : monedhaPerfundimtare + ' @ ' + kursi ,
        Valuta : monedhaFillestare,
        Sasia : sasia,
        Anulluar : false,
        VitiShkollor : vitiShkollor,
        Data : new Date().toLocaleDateString(),
        Koha : new Date().toLocaleTimeString(),
        User : JSON.parse(localStorage.getItem('user')).displayName,
        Koment : koment,
      });
    // this.updateTotali(sasia,monedhaPerfundimtare);


  }

  updateTotali(sasia:number , valuta : string)
{
  // let TotaliEuro ;
  // let  TotaliLeke ;
  // let TotaliDoll ;
  // let totaliList = this.db.list("Arka/Totali").valueChanges().subscribe( (data)=>{
  //   TotaliEuro = data[1];
  //   TotaliLeke = data[2];
  //   TotaliDoll = data[0];
    switch(valuta)
    {
      case  "EUR":{
        this.TotaliEuro = Number(this.TotaliEuro) + sasia;
        this.db.list("Arka").update("Totali",{
          TotaliEur : this.TotaliEuro,
         
          });
        break;
      }
      case "LEK" :
        {
         this. TotaliLeke = Number(this.TotaliLeke) + sasia;
         this.db.list("Arka").update("Totali",{
          
          TotaliLek :this.TotaliLeke,
         
          });
          break;
          
        }
    
        case "DOLLARE" :
            {
              this.TotaliDoll = Number(this.TotaliDoll) + sasia;
              this.db.list("Arka").update("Totali",{
              
                TotaliDol: this.TotaliDoll,
                });
              break;
              
            }
    }
  console.log(this.TotaliLeke);
  
  
 


}
getTotali()
{
  this.db.list("Arka/Totali").valueChanges().subscribe( (data)=>{
    this.TotaliEuro = data[1];
    this.TotaliLeke = data[2];
    this.TotaliDoll = data[0];
   },first());
  
}
  updateTotaliX(sasia:number , valutaFillimi : string,valutaMbarimi : string,kursi : number)
{
  // let TotaliEuro ;
  // let  TotaliLeke ;
  // let TotaliDoll ;
console.log(this.TotaliEuro);
    switch(valutaFillimi)
    {
      case  "EUR":{
        this.TotaliEuro = Number(this.TotaliEuro) - sasia;

        if (valutaMbarimi == "LEK")
        this.TotaliLeke =  Number(this.TotaliLeke) + kursi*sasia;
        if (valutaMbarimi == "DOLLARE")
         this.TotaliDoll =  Number(this.TotaliDoll) + kursi*sasia;
        
         this.db.list("Arka").update("Totali",{
          TotaliEur : this.TotaliEuro,
          TotaliLek :this.TotaliLeke,
          TotaliDol: this.TotaliDoll,
          });
        break;
      }
      case "LEK" :
        {
          this.TotaliLeke = Number(this.TotaliLeke) - sasia;

         if (valutaMbarimi == "EUR")
          this.TotaliEuro = this.TotaliEuro + sasia/kursi;
          if (valutaMbarimi == "DOLLARE")
          this.TotaliDoll = this.TotaliDoll + sasia/kursi;

          this.db.list("Arka").update("Totali",{
            TotaliEur : this.TotaliEuro,
            TotaliLek :this.TotaliLeke,
            TotaliDol: this.TotaliDoll,
            });
          break;
          
        }
    
        case "DOLLARE" :
            {
              this.TotaliDoll = Number(this.TotaliDoll) - sasia;

              if (valutaMbarimi == "EUR")
               this.TotaliEuro = this.TotaliEuro + sasia*kursi;
               if (valutaMbarimi == "LEK")
               this.TotaliLeke = this.TotaliLeke + sasia*kursi;

               this.db.list("Arka").update("Totali",{
                TotaliEur : this.TotaliEuro,
                TotaliLek :this.TotaliLeke,
                TotaliDol: this.TotaliDoll,
                });
               break;
              
            }
    }

   
 
  this.db.list("Arka").update("Totali",{
    TotaliEur : this.TotaliEuro,
    TotaliLek :this.TotaliLeke,
    TotaliDol: this.TotaliDoll,
    });
  
 


}

  anullo($key ){
// //nqs eshte shpenzim
// this.db.list(docref).remove();

this.db.list('Arka').update($key,{
Anulluar : true

})
  }
}
