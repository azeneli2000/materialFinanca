import { Component, OnInit, ViewChild } from '@angular/core';
import { ArkaService } from '../shared/arka.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-arka',
  templateUrl: './arka.component.html',
  styleUrls: ['./arka.component.css']
})
export class ArkaComponent implements OnInit {

  constructor(private arkaSevice : ArkaService) { }
  isLoading = true;
  listData : MatTableDataSource<any>
  displayedColumns: string [] =['Koment','Sasia','Valuta','TeDhena','User','Data','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey :string;
mobile : boolean = false;

  ngOnInit() {

   this.arkaSevice.getArka().subscribe( list => {
    let array = list.map(item =>{
      this.isLoading = false;
      return {
        $key : item.key,
        ...item.payload.val()};
    }

    );
    this.listData= new MatTableDataSource(array);
    if(this.listData.data.length==0)
    this.isLoading = false;
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
}
