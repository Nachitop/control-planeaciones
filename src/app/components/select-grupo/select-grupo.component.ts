import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { Grupo } from 'src/app/models/Grupo';


@Component({
  selector: 'app-select-grupo',
  templateUrl: './select-grupo.component.html',
  styleUrls: ['./select-grupo.component.css']
})
export class SelectGrupoComponent implements OnInit {

  grupos:Grupo[]=[];
  grupo_id:string;
  @Input() multiple:boolean=false;
  @Output() obtenerGrupoEvent = new EventEmitter<string>();
  constructor(public grupoService:GrupoService) { 
    this.obtenerGrupos();
  }

  ngOnInit() {
  }

  obtenerGrupos(){
    this.grupoService.getGrupos().subscribe((res)=>{
      this.grupos=res as Grupo[];
      if(this.multiple==false){
        this.grupo_id=this.grupos[0]._id;
        this.seleccionarGrupo();
      }else{

      }
    },error=>console.log(error));
  }

  seleccionarGrupo(){
    this.obtenerGrupoEvent.emit(this.grupo_id);
  }
}
