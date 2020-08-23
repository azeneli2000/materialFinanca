import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import{ ActivatedRoute,Router} from '@angular/router'
import { MesuesiZgjedhurService } from '../shared/mesuesi-zgjedhur.service';
import { NotificationService } from 'src/app/shared/notification.service';
import {MatTableDataSource, MatSort, MatPaginator,MatDialog,MatDialogConfig} from '@angular/material';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog.service';
import{LendaComponent} from 'src/app/lenda/lenda.component';
import { LendaService } from '../shared/lenda.service';
import * as XLSX from 'xlsx';
import { ExcelService } from '../shared/excel.service';
import { MesuesiComponent } from '../mesuesit/mesuesi/mesuesi.component';
import { MesuesiService } from '../shared/mesuesi.service';



@Component({
  selector: 'app-mesuesi-lenda',
  templateUrl: './mesuesi-lenda.component.html',
  styleUrls: ['./mesuesi-lenda.component.css']
})
export class MesuesiLendaComponent implements OnInit {
 
  constructor(private listLendet : LendaService, private dialog :MatDialog, private notification : NotificationService,  private dialogService : ConfirmDialogService,private route : ActivatedRoute, private mesuesiZgjedhur : MesuesiZgjedhurService,private router : Router,private mz:MesuesiZgjedhurService,private excelService:ExcelService,private mesuesiS : MesuesiService) { }
  @ViewChild('TABLE') table: ElementRef;
  public mesuesiId : string;
 // public mesuesi = this.mesuesiZgjedhur.mesuesiZgjedhur;
 isLoading = true;
 public mesuesi : ['','','','','']; 
 public emri;
 public mbiemri;
 public kategoria;
 public paga;
public vjetersia;
public pagaSig;
pagaTotMujore ; 
pagaNetoMujore; 
pagaShtese;
public jashtem;
public  llogari;

public nrMuaj ;
  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
  mesZgjedhurBosh : boolean = false;
 meskey = this.route.snapshot.paramMap.get('$key');
 mobile : boolean = false;
user : boolean = false;
lendetPrint:any ;
viti :any;
 ngOnInit() {
    if(window.innerWidth < 400)
    {
      this.mobile = true;
    this.displayedColumns = ['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga'];
    }
    else
    {
      this.mobile = false;
      this.displayedColumns =  ['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga','Actions'];
    
  }
  let c = JSON.parse(localStorage.getItem('user'));
  if(c.displayName == "Zenel Zeneli")
  this.user = true;    
    this.mesuesiZgjedhur.mbushMesuesin();
    let mz =this.mesuesiZgjedhur.mz;
    let mzArray;
     mz.subscribe((mes)=>{
      this.emri= mes[0];
      this.kategoria= mes[2];
      this.mbiemri= mes[4];
      this.paga= mes[6];
      this.vjetersia= mes[13];
      this.pagaSig = mes[9]; 
      this.pagaTotMujore = mes[10]; 
      this.pagaNetoMujore = mes[7]; 
      this.pagaShtese = mes[8]; 
      this.nrMuaj = mes[5];
      this.jashtem = mes[1];
      this.llogari = mes[4];
     });
   console.log(this.mesuesiZgjedhur);  





  //visualizon te dhenat e mesuesit
    let idMesuesi = this.route.snapshot.paramMap.get('$key');
    this.mesuesiId = idMesuesi.toString(); 
    if (this.mz.mesuesiZgjedhurId===undefined)
    this.mesZgjedhurBosh = true;
console.log(this.mesuesiId);
   //regjistrohet te observable qe kthen getLenda() te lenda service
   this.listLendet.getLendet(idMesuesi.toString()).subscribe(
    list => {
      let array = list.map(item =>{
        this.isLoading = false;
        return {
          $key : item.key,
          ...item.payload.val()};
          
      });
      this.lendetPrint = array;
      // console.log(this.lendetPrint[0]["Klasa"]);
      this.listData= new MatTableDataSource(array);
      console.log(this.listData.data.length);
      if(this.listData.data.length==0)
      this.isLoading = false;
     // let arr1 = array.map(lenda => lenda.Emri=lenda.Emri.viewValue) ;
      //console.log(arr1);
      this.listData.sort = this.sort;
      if(!this.mobile)
      this.listData.paginator = this.paginator;
      //filtron vetem kolnat e visualizuara ne tabele 
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'Actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }


   //shfaq formen ne nje dialogBox
   onCreate()
   {
     this.listLendet.initializeFormGroup();
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     //dialogConfig.width = "60%";
   this.dialog.open(LendaComponent,dialogConfig);
     
   }
 
   onEdit(row){
     this.listLendet.populateForm(row);
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
   //  dialogConfig.width = "60%";
     this.dialog.open(LendaComponent,dialogConfig);
   }
 
   onDelete($key,Paga){
     this.dialogService.openConfirmDialog('Jeni te sigurte qe doni te fshini lenden  ?')
     .afterClosed().subscribe(res =>{
       if(res){
        let p = this.paga -Paga;
        let psh = this.pagaShtese-Paga;
        let ptotmujore = this.pagaTotMujore-Paga;

         this.listLendet.deleteLenda($key,p,this.mesuesiId,this.pagaSig,this.pagaNetoMujore,psh,ptotmujore);
         this.notification.warn('Lenda u fshi !');
       }
     });
   }

   ExportTOExcel()
{
  this.excelService.exportAsExcelFile( this.listData.filteredData, 'sample');

  
}

getMesuesi()
{

  // this.mz.mesuesiZgjedhurId=this.route.snapshot.paramMap.get('$key').toString();
  this.mesuesiS.form.controls.$key.setValue(this.route.snapshot.paramMap.get('$key').toString());
   this.mesuesiS.form.controls.Emri.setValue(this.emri);
   this.mesuesiS.form.controls.Mbiemri.setValue(this.mbiemri);
   this.mesuesiS.form.controls.Vjetersia.setValue(this.vjetersia);
   this.mesuesiS.form.controls.Kategoria.setValue(this.kategoria);
   this.mesuesiS.form.controls.PagaSig.setValue(this.pagaSig);
   this.mesuesiS.form.controls.PagaNetoMujore.setValue(this.pagaNetoMujore);
   this.mesuesiS.form.controls.PagaShtese.setValue(this.pagaShtese);
   this.mesuesiS.form.controls.PagaTotMujore.setValue(this.pagaTotMujore);
   this.mesuesiS.form.controls.Jashtem.setValue(this.jashtem);
   this.mesuesiS.form.controls.MuajPage.setValue(this.nrMuaj);
   this.mesuesiS.form.controls.LLogariBankare.setValue(this.llogari);
   this.mesuesiS.form.controls.Paga.setValue(this.paga);
  
    //  LLogariBankare : mesuesi.LLogariBankare,
  

 // this.mesuesiS.populateForm(this.mz);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
//  dialogConfig.width = "60%";
  this.dialog.open(MesuesiComponent,dialogConfig);
}

print()
{
  let oreMesimore =0 ;
  let puneRezerve =0;


let ditePushimi;
if (this.jashtem==true)
{
  puneRezerve = 5;
  ditePushimi = 12;
}
else
{
  ditePushimi = 14;
  puneRezerve = 10;
}
  let printContentshenime =  "<div class = 'shkrimi'><p>Per sqarime me te hollesishme drejtohuni ne zyren e finances.</p></div>";

  
  // "<b> Paga Mujore Bruto : </b>"  + pagaSig + "LEK"+
  // "<b> Paga Mujore Bruto : </b>"  + pagaTotMujore + "LEK"
  var printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th>";
 let printContent1 ="";
  let par ="";
  let oreTot=0;
let inst = false;
let colspan;
let lejeZakonshme =0;
let festaZyrtare = 0;
let puneNeDispozicion =0;
let kujdestari = false;

this.lendetPrint.forEach(element => {
 //paralele
  if (element["Paralele"]==true)
 par ="Po";
 else
 par="";
 //oret totale
 //oreTot = oreTot + element["Javetot"]* element["Ore"];
 //oret mesimore vjetore
if(element["Emri"]=="Kujdestari")
kujdestari =true;
 if (element["Emri"]=="Mirembajtje"||element["Emri"]=="Shoqerim"||element["Emri"]=="Pune Admin"||element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
 {
   if(element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
   {
     oreMesimore = oreMesimore;
     oreTot=oreTot;
   }
  else
  {
    oreMesimore = oreMesimore + element["Javetot"]* element["Ore"]/2;
    oreTot = oreTot + element["Javetot"]* element["Ore"]/2;

  }
 }
 else 
 {
  oreMesimore = oreMesimore + element["Javetot"]* element["Ore"];
  oreTot = oreTot + element["Javetot"]* element["Ore"];

 }
 //shtesa institucionale
 if (element["ShtesaInst"]!=0)
 {
   colspan = 7;
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>";
 }
  else
  {
    colspan = 6;
    printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th>";
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>";
 

  
}
 
});

// if(kujdestari&&this.jashtem==true)
//   puneRezerve = 10;
let punaMesimore  = Math.round(oreMesimore/4) ;
if (punaMesimore>175)
    punaMesimore =175;
let muajVjetoreNeto = (punaMesimore+puneRezerve+ditePushimi +(((punaMesimore+puneRezerve)/22)*3))/22;
// if (muajVjetoreNeto>9)
//  muajVjetoreNeto=9;
lejeZakonshme = Math.round( ((punaMesimore+puneRezerve)/22)*3);
 if (this.jashtem==false)
{
 muajVjetoreNeto = 12;
 lejeZakonshme = 36;
}
 let pagaVjetoreNeto : number =Math.round((Math.round(muajVjetoreNeto*100)/100*this.pagaNetoMujore));

 
// let pagaVjetoreNeto : number =Math.round((((oreMesimore/4+puneRezerve+ditePushimi +(((oreMesimore/4+puneRezerve)/22)*3))/22) *this.pagaNetoMujore));

  
let printContent = 		"<h3 align='center'>SHKOLLA JOPUBLIKE “NR.1” VLORE</h3>"+
	" <h4 align='center'>  NJOFTIM PARAPRAK PER Z, ZNJ "+  this.emri + " " + this.mbiemri +  "</h4>" +

  "<div class = 'shkrimi'><p>Per vitin shkollor "+localStorage.getItem('VitiShkollor') + 									
" ,  si punemarres me detyre mesues, jane percaktuar me poshte oret e punes javore,  ditet vjetore te punes, ditet e lejes se zakonshme (te pagueshme), ditet e festave zyrtare pushim (te pagueshme), sasia e muajve te punes vjetore dhe paga mujore (bruto dhe neto), sipas ngarkeses tuaj mesimore. Ne shtator keto te dhena saktesohen dhe ne fund te vitit shkollor behen plotesimet e duhura. Ne raste te jashtezakonshme, si pandemi, apo fatkeqesi te tjera te natyres kjo kontrate anullohet.  Pasi te konfirmoni per sa me poshte, do te neneshkruhen kontratat e punes. Per sqarime me te hollesishme drejtohuni ne zyren e finances "   +	"</p></div>" + 
"<div class = 'conteiner'>"+
 "<div class = 'vjetersia'> <b>Vjetersia : </b> " + this.vjetersia + " Vjet" + "   </br> <b>Atestimi : </b> kateg. "  + Math.abs(this.kategoria -4 ) + "</br><b> Paga mujore bruto : </b>"  + this.pagaSig.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK" + "</br><b>   Paga mujore neto : </b>"  + this.pagaNetoMujore.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK </br>" + "<b>Paga vjetore neto : </b>"+ (Math.round( pagaVjetoreNeto/100)*100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK" + "</div>"+
 
 "<div class = 'paga'>"
  + "<b>Pune mesimore : </b>"+punaMesimore +" dite </br><b>Pune rezerve : </b>" +Math.round(puneRezerve) +" dite ("+Math.round(puneRezerve*2/5) +" jave 4 oreshe) </br><b>Leje zakonshme : </b>"+ lejeZakonshme+" dite</br><b>Festa zyrtare : </b>"+Math.round(ditePushimi) + " dite </br><b>Pune vjetore neto : </b>"  +muajVjetoreNeto.toFixed(2)  + " muaj</div></div></br>" 
 





 printContent1 = printContentTabela+  printContent1 + "  "+  "<tfoot><tr><td colspan='"+colspan + 1 +"'>Totali i oreve vjetore : "+ oreTot+"</td></tr> </tfoot></table></div> " ;
let style  = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;} th,td {text-align: center;} div.shkrimi { width:90%;padding-left :10%;} p{font-size:17px;} div.conteiner { display: flex;padding-left :10%;} div.vjetersia { width: 40%;} div.paga { flex: 1;} div.tbl { padding-left :10%;;}"+
"div.wraper { display: flex;padding-left :10%;margin-top: 10%;} div.data { width: 30%;} div.emri { flex: 1;} div.zeneli { flex: 1;}</style>";

let sot = new Date();
 const printContent2 = "<div class = 'wraper'>"+
 "<div class = 'data'> <b>Vlore me  </b> " + sot.getDate() + "/" + (sot.getMonth()+1) + "/"+sot.getFullYear() + "</div>"+
 "<div class = 'emri'>" + this.emri + " " + this.mbiemri + "</div>"

let html = printContent + printContent1  + printContent2 + style;
console.log(html);
if (inst)
 html = html ;
//  "Klasa" + this.lendetPrint[0]["Klasa"]
//   + "sdfsdf"
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(html);
  WindowPrt.document.close(); 
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}



printKonfidenciale()
{
let oreMesimore =0 ;
  let puneRezerve =0;


let ditePushimi;
if (this.jashtem==true)
{
  puneRezerve = 5;
  ditePushimi = 12;
}
else
{
  ditePushimi = 15;
  puneRezerve = 10;
}
  let printContentshenime =  "<div class = 'shkrimi'><p>Per sqarime me te hollesishme drejtohuni ne zyren e finances.</p></div>";

  
  // "<b> Paga Mujore Bruto : </b>"  + pagaSig + "LEK"+
  // "<b> Paga Mujore Bruto : </b>"  + pagaTotMujore + "LEK"
  var printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th><th>Klasa paralele</th><th>Numer nxenesish</th><th>Shtese nxenes</th><th>Shtese Institucioni</th>";
 let printContent1 ="";
  let par ="";
  let oreTot=0;
let inst = false;
let colspan;
let lejeZakonshme =0;
let festaZyrtare = 0;
let puneNeDispozicion =0;
let kujdestari =false

this.lendetPrint.forEach(element => {
 //paralele
  if (element["Paralele"]==true)
 par ="Po";
 else
 par="";
 //oret totale
 //oreTot = oreTot + element["Javetot"]* element["Ore"];
 //oret mesimore vjetore
 if(element["Emri"]=="Kujdestari")
kujdestari =true;
 if (element["Emri"]=="Mirembajtje"||element["Emri"]=="Shoqerim"||element["Emri"]=="Pune Admin"||element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
 {
   if(element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
   {
     oreMesimore = oreMesimore;
     oreTot=oreTot;
   }
  else
  {
    oreMesimore = oreMesimore + element["Javetot"]* element["Ore"]/2;
    oreTot = oreTot + element["Javetot"]* element["Ore"]/2;

  }
 }
 else 
 {
  oreMesimore = oreMesimore + element["Javetot"]* element["Ore"];
  oreTot = oreTot + element["Javetot"]* element["Ore"];

 }
 //shtesa institucionale
 if (element["ShtesaInst"]!=0)
 {
   colspan = 7;
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>"+
  "<td>"+par+"</td><td>"    + element["NrNxenesish"] + "</td><td>" + ((element["NrNxenesish"]-16)*2.5).toFixed(1) + "%</td><td>+" + element["ShtesaInst"] + "%</td></tr>";
 }
  else
  {
    colspan = 6;
    printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th><th>Klasa paralele</th><th>Numer nxenesish</th><th>Shtese nxenes</th>";
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>"+
  "<td>"+par+"</td><td>"    + element["NrNxenesish"] + "</td><td>" + (element["NrNxenesish"]-16)*2.5 + "%</td></tr>" ; 

  
}
 
});
// if(kujdestari&&this.jashtem==true)
//   puneRezerve = 10;
let punaMesimore  = Math.round(oreMesimore/4) ;
if (punaMesimore>175)
    punaMesimore =175;
let muajVjetoreNeto = (punaMesimore+puneRezerve+ditePushimi +(((punaMesimore+puneRezerve)/22)*3))/22;
// if (muajVjetoreNeto>9)
//  muajVjetoreNeto=9;
lejeZakonshme = Math.round( ((punaMesimore+puneRezerve)/22)*3);

 let pagaVjetoreNeto : number =Math.round((Math.round(12*100)/100*this.pagaNetoMujore));
let puneNeDispoziocion : number =0;
if (this.jashtem==true)
{
puneNeDispoziocion=0;
pagaVjetoreNeto=Math.round((Math.round(muajVjetoreNeto*100)/100*this.pagaNetoMujore));
}
else
{

  muajVjetoreNeto=12;
  lejeZakonshme = 36;
  puneNeDispoziocion =  260-(punaMesimore+puneRezerve+lejeZakonshme+ditePushimi);

}
let printContent = 		"<h3 align='center'>SHKOLLA JOPUBLIKE “NR.1” VLORE</h3>"+
 
 " <h4 align='center'> SHTOJCE KONTRATE PUNE INDIVIDUALE </h4>	"	+				
	
 " <h4 align='center'> DRAFT </h4>"	+

  "<div class = 'shkrimi'><p>Lidhet per vitin shkollor "+localStorage.getItem('VitiShkollor') +" midis administratorit te “ONA”.shpk," + 									
	"<b>ZENEL ZENELI</b> dhe mesuesit  <b>" + this.emri + " " + this.mbiemri +
	"</b> Eshte parashikuar ngarkesa juaj mesimore, ditet e punes, ditet e lejes, pagat mujore, " +								
	"duke patur parasysh vjetersine, atestimin, sasine e oreve mesimore, lenden mesimore, klasen, ciklin, cilesine e punes, numrin e nxenesve ne klasa. " 	+								
	"Ne shtator keto te dhena saktesohen dhe ne fund te vitit shkollor "								
	+ "behen plotesimet e duhura (per ndryshimet qe mund te ndodhin ne proces)."									
 + "	Pasi  te beheni me dije per sa me poshte, do te neneshkruhen kontratat perkatese.</br>Per sqarime me te hollesishme drejtohuni ne zyren e finances.	</p></div>" + 
"<div class = 'conteiner'>"+
 "<div class = 'vjetersia'> <b>Vjetersia : </b> " + this.vjetersia + " Vjet" + "   </br> <b>Atestimi : </b> kateg. "  + Math.abs(this.kategoria -4 ) + "</br><b> Paga mujore bruto : </b>"  + this.pagaSig.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK" + "</br><b>   Paga mujore neto : </b>"  + this.pagaNetoMujore.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK </br>" + "<b>Paga vjetore neto : </b>"+ (Math.round( pagaVjetoreNeto/100)*100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK </br>" +  "<b>Paga mujore : </b>"+ (this.pagaTotMujore).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK </br>" +"<b>Paga vjetore : </b>"+ Math.round(((this.pagaTotMujore*this.nrMuaj)/100)*100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " LEK" + "</div>"+
 
 "<div class = 'paga'>"
  + "<b>Pune mesimore : </b>"+punaMesimore +" dite </br><b>Pune rezerve : </b>" +Math.round(puneRezerve) +" dite ("+Math.round(puneRezerve*2/5) +" jave 4 oreshe) </br><b>Leje zakonshme : </b>"+lejeZakonshme +" dite</br><b>Festa zyrtare : </b>"+Math.round(ditePushimi) + " dite </br><b>Pune vjetore neto : </b>"  +muajVjetoreNeto.toFixed(2)  + " muaj" +"</br><b>Pune ne dispozicion : </b>"  +puneNeDispoziocion.toFixed(0)  + " dite" +"</br><b>Pune vjetore : </b>"  +this.nrMuaj  + " muaj" +"</div></div></br>" 
 

  printContent1 = printContentTabela+  printContent1 + "  "+  "<tfoot><tr><td colspan='"+colspan + 1 +"'>Totali i oreve vjetore : "+ oreTot+"</td></tr> </tfoot></table></div> " ;
  let style  = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;} th,td {text-align: center;} div.shkrimi { width:90%;padding-left :10%;} p{font-size:17px;} div.conteiner { display: flex;padding-left :10%;} div.vjetersia { width: 40%;} div.paga { flex: 1;} div.tbl { padding-left :10%;;}"+
  "div.wraper { display: flex;padding-left :10%;margin-top: 10%;} div.data { width: 50%;} div.emri { flex: 1;}</style>";
  
  let sot = new Date();
   const printContent2 = "<div class = 'wraper'>"+
   "<div class = 'data'> <b>Vlore me  </b> " + sot.getDate() + "/" + (sot.getMonth()+1) + "/"+sot.getFullYear() + "</div>"+
   "<div class = 'emri'>" + this.emri + " " + this.mbiemri + "</div>"
   
let html = printContent + printContent1  + printContent2 + style;
console.log(html);
if (inst)
 html = html ;
//  "Klasa" + this.lendetPrint[0]["Klasa"]
//   + "sdfsdf"
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(html);
  WindowPrt.document.close(); 
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}



printDrejtoria()
{
let oreMesimore =0 ;
  let puneRezerve =0;


let ditePushimi;
if (this.jashtem==true)
{
  puneRezerve = 5;
  ditePushimi = 12;
}
else
{
  ditePushimi = 14;
  puneRezerve = 10;
}
  let printContentshenime =  "<div class = 'shkrimi'><p>Per sqarime me te hollesishme drejtohuni ne zyren e finances.</p></div>";

  
  // "<b> Paga Mujore Bruto : </b>"  + pagaSig + "LEK"+
  // "<b> Paga Mujore Bruto : </b>"  + pagaTotMujore + "LEK"
  var printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th><th>Klasa paralele</th><th>Numer nxenesish</th><th>Shtese nxenes</th><th>Shtese Institucioni</th>";
 let printContent1 ="";
  let par ="";
  let oreTot=0;
let inst = false;
let colspan;
let lejeZakonshme =0;
let festaZyrtare = 0;
let puneNeDispozicion =0;
let kujdestari = false;

this.lendetPrint.forEach(element => {
 //paralele
  if (element["Paralele"]==true)
 par ="Po";
 else
 par="";
 //oret totale
 //oreTot = oreTot + element["Javetot"]* element["Ore"];
 //oret mesimore vjetore
 if(element["Emri"]=="Kujdestari")
kujdestari =true;
 if (element["Emri"]=="Mirembajtje"||element["Emri"]=="Shoqerim"||element["Emri"]=="Pune Admin"||element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
 {
   if(element["Emri"]=="Kujdestari"||element["Emri"]=="Veprimtari")
   {
     oreMesimore = oreMesimore;
     oreTot=oreTot;
   }
  else
  {
    oreMesimore = oreMesimore + element["Javetot"]* element["Ore"]/2;
    oreTot = oreTot + element["Javetot"]* element["Ore"]/2;

  }
 }
 else 
 {
  oreMesimore = oreMesimore + element["Javetot"]* element["Ore"];
  oreTot = oreTot + element["Javetot"]* element["Ore"];

 }
 //shtesa institucionale
 if (element["ShtesaInst"]!=0)
 {
   colspan = 7;
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>"+
  "<td>"+par+"</td><td>"    + element["NrNxenesish"] + "</td><td>" + (element["NrNxenesish"]-16)*2.5 + "%</td><td>+" + element["ShtesaInst"] + "%</td></tr>";
 }
  else
  {
    colspan = 6;
    printContentTabela = "<div class = 'tbl'><table style='width:60%'> <th>Emri i lendes</th><th>Klasa</th><th>Jave</th><th>Ore</th><th>Klasa paralele</th><th>Numer nxenesish</th><th>Shtese nxenes</th>";
  printContent1 = printContent1 + "<tr> <td style='white-space: nowrap'>" + element["Emri"] + "</td> <td>" + element["Klasa"] + "</td> <td>" + element["Javetot"] + "</td>"+"<td>" + element["Ore"] + "</td>"+
  "<td>"+par+"</td><td>"    + element["NrNxenesish"] + "</td><td>" + (element["NrNxenesish"]-16)*2.5 + "%</td></tr>" ; 

  
}
 
});
if(kujdestari&&this.jashtem==true)
  puneRezerve = 10;
let punaMesimore  = Math.round(oreMesimore/4) ;
if (punaMesimore>175)
    punaMesimore =175;
let muajVjetoreNeto = (punaMesimore+puneRezerve+ditePushimi +(((punaMesimore+puneRezerve)/22)*3))/22;
// if(muajVjetoreNeto>9)
// {
//   muajVjetoreNeto=9;
// }
lejeZakonshme = Math.round( ((punaMesimore+puneRezerve)/22)*3);

 let pagaVjetoreNeto : number =Math.round((Math.round(12*100)/100*this.pagaNetoMujore));
let puneNeDispoziocion : number = 0;
if (this.jashtem==true)
{
puneNeDispoziocion=0;
pagaVjetoreNeto=Math.round((Math.round(muajVjetoreNeto*100)/100*this.pagaNetoMujore));

}
else
{
  muajVjetoreNeto=12;
  lejeZakonshme = 36;
  puneNeDispoziocion =  260-(punaMesimore+puneRezerve+lejeZakonshme+ditePushimi);

}

 let printContent = 		"<h3 align='center'>SHKOLLA JOPUBLIKE “NR.1” VLORE</h3>"+
 
 " <h4 align='center'>  SHTOJCE KONTRATE PUNE INDIVIDUALE </h4>	"	+				
	


  "<div class = 'shkrimi'><p>Lidhet per vitin shkollor "+localStorage.getItem('VitiShkollor') +" midis drejtorit te shkolles " + 									
	"dhe mesuesit  <b>" + this.emri + " " + this.mbiemri +
	"</b> Eshte percaktuar ngarkesa juaj mesimore, ditet e punes, ditet e lejes,etj. " +																													
  "	Pasi  te konfirmoni per sa me poshte, do te neneshkruhen kontratat perkatese.</p></div>"+
 
"<div class = 'conteiner'>"+
 "<div class = 'vjetersia'> <b>Vjetersia : </b> " + this.vjetersia + " Vjet" + "   </br> <b>Atestimi : </b> kateg. "  + Math.abs(this.kategoria -4 ) +  
 
   " </br><b>Pune mesimore : </b>"+ punaMesimore +" dite </br><b>Pune rezerve : </b>" +Math.round(puneRezerve) +" dite ("+Math.round(puneRezerve*2/5) +" jave 4 oreshe) </br><b>Leje zakonshme : </b>"+lejeZakonshme +" dite</br><b>Festa zyrtare : </b>"+Math.round(ditePushimi) + " dite </br><b>Pune vjetore neto : </b>"  +muajVjetoreNeto.toFixed(2)  + " muaj" +"</br><b>Pune ne dispozicion : </b>"  +puneNeDispoziocion.toFixed(0)  + " dite" +"</br><b>Pune vjetore : </b>"  +this.nrMuaj  + " muaj" +"</div></div></br>" 
 

  printContent1 = printContentTabela+  printContent1 + "  "+  "<tfoot><tr><td colspan='"+colspan + 1 +"'>Totali i oreve vjetore : "+ oreTot+"</td></tr> </tfoot></table></div> " ;
  let style  = "<style> table, th, td {border: 1px solid black;border-collapse: collapse;} th,td {text-align: center;} div.shkrimi { width:90%;padding-left :10%;} p{font-size:17px;} div.conteiner { display: flex;padding-left :10%;} div.vjetersia { width: 40%;} div.paga { flex: 1;} div.tbl { padding-left :10%;;}"+
  "div.wraper { display: flex;padding-left :10%;margin-top: 10%;} div.data { width: 30%;} div.emri { flex: 1;}div.zeneli { flex: 1;}</style>";
  
  let sot = new Date();
   const printContent2 = "<div class = 'wraper'>"+
   "<div class = 'data'> <b>Vlore me  </b> " + sot.getDate() + "/" + (sot.getMonth()+1) + "/"+sot.getFullYear() + "</div>"+
   "<div class = 'emri'>" + this.emri + " " + this.mbiemri + "</div>"+
   "<div class = 'zeneli'>DREJTORI I SHKOLLES </div>"
let html = printContent + printContent1  + printContent2 + style;
console.log(html);
if (inst)
 html = html ;
//  "Klasa" + this.lendetPrint[0]["Klasa"]
//   + "sdfsdf"
  const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
  WindowPrt.document.write(html);
  WindowPrt.document.close(); 
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
}


}
