import { Component, OnInit, ViewChild } from '@angular/core';
import { NxenesiService } from 'src/app/shared/nxenesi.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-nxenesi-detaje',
  templateUrl: './nxenesi-detaje.component.html',
  styleUrls: ['./nxenesi-detaje.component.css']
})
export class NxenesiDetajeComponent implements OnInit {

  constructor(private nxenesiService : NxenesiService, private route : ActivatedRoute) { }
  // listData : MatTableDataSource<any>

  // displayedColumns: string [] =['Emri','Javetot','Klasa','NrNxenesish','Ore','Paga','Actions'];
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  nxenesi;
  emriNxenesi;
  ngOnInit() {
    let ididNxenesi = this.route.snapshot.paramMap.get('$key');
    this.nxenesiService.getNxenes(ididNxenesi).subscribe(
      list => {
        let array = list.map(item =>{
          return item;//{
            // Emri : item.key ,
          // Vlera : item.payload.val()};
                             
       // }
        });
        this.nxenesi= array;
        console.log(this.nxenesi[0].Vlera);
        this.emriNxenesi= this.nxenesi[0].Vlera;
      });
  }

}
