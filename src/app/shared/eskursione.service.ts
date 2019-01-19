import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EskursioneService {

 eskursioneList: AngularFireList<any>;

  form: FormGroup = new FormGroup({

    $key: new FormControl(null),
    
    eskursione : new FormControl(  [{Emri : 'Eskursioni0', Pagesa : 0,Data :'',PagesaAgjensia:''},
    {Emri : 'Eskursioni1', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni2', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni4', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni5', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni6', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni3', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni7', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni8', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni9', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni10',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni11',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
    {Emri : 'Eskursioni12',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},]),
    

  });

  constructor(private db: AngularFireDatabase) { }
  insertEskursione(viti) {
    this.eskursioneList = this.db.list(viti + '/Eskursione');
    this.eskursioneList.push({
     eskursione :  [{Emri : '', Pagesa : 0,Data :'',Agjensia:'', PagesaAgjensia: '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
                    {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia :  '',MonedhaEskursioni:'EUR' },
                    {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia :  '',MonedhaEskursioni:'EUR' },
                    {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia :  '',MonedhaEskursioni:'EUR' }]
    }
    )
}

updateEskursione(es,viti){
  console.log(viti);
  this.eskursioneList = this.db.list(viti+'/Eskursione');
console.log(es.$key,viti,es);
  this.eskursioneList.update(es.$key,
    {
    eskursione : es.eskursione,
  });
}

getEskursione(viti) {
  console.log(viti);
  return this.db.list(viti+'/Eskursione').snapshotChanges().pipe(take(1));
 }


 populateForm(data,fkey) {
      data.$key = fkey;
      console.log(data);
      this.form.patchValue(data);
    }

    initializeFormGroup() {
      this.form.setValue(  {$key : null,eskursione : [{Emri : '', Pagesa : 0,Data :'',PagesaAgjensia:''},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '', Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},
      {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '' ,MonedhaEskursioni:'EUR'},
      {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '' ,MonedhaEskursioni:'EUR'},
      {Emri : '',Pagesa : 0,Data :'',Agjensia:'',PagesaAgjensia : '',MonedhaEskursioni:'EUR'},]})
      
}

}