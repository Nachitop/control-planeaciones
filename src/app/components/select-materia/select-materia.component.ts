import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';


@Component({
  selector: 'app-select-materia',
  templateUrl: './select-materia.component.html',
  styleUrls: ['./select-materia.component.css']
})
export class SelectMateriaComponent implements OnInit {

  materias:Materia[]=[];
  materia_id:string;
  @Input() multiple:boolean=false;
  @Input() index:number;
  @Output() obtenerMateriaEvent= new EventEmitter<any>();
  constructor(public materiaService:MateriaService) {
    this.obtenerMaterias();
   }

  ngOnInit() {
  }

  obtenerMaterias(){
    this.materiaService.getMaterias().subscribe((res:Materia[])=>{
      this.materias=res;
      // if(this.multiple==false){
      //   this.materia_id=this.materias[0]._id;
      //   this.seleccionarMateria();
      // }
    },error=>console.log(error)); 
  }

  seleccionarMateria(){
    let objMateria={
      index:0,
      materia:''
    }

    objMateria.index=this.index;
    objMateria.materia=this.materia_id[0]
    this.obtenerMateriaEvent.emit(objMateria);
  }

}
