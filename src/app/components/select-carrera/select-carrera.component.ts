import { Component, OnInit ,Output, EventEmitter, Input} from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';
import { Carrera } from 'src/app/models/Carrera';


@Component({
  selector: 'app-select-carrera',
  templateUrl: './select-carrera.component.html',
  styleUrls: ['./select-carrera.component.css']
})
export class SelectCarreraComponent implements OnInit {
  carreras:Carrera[]=[];
  carrera_id:string;
  @Input() multiple:boolean=false;
  @Output() obtenerCarreraEvent = new EventEmitter<string>();
  constructor(public carreraService:CarreraService) {
    this.carreraService.getCarreras().subscribe((res:Carrera[])=>{
      this.carreras=res;
      if(this.multiple==false){
      this.carrera_id=this.carreras[0]._id;
      this.seleccionarCarrera();
      }
    },error=>console.log(error))
   }

  ngOnInit() {
  }

  seleccionarCarrera(){
    this.obtenerCarreraEvent.emit(this.carrera_id);
  }

}
