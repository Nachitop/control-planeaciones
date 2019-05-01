import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  grupo:Grupo= new Grupo();
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  grupos:Grupo[]=[];
  constructor(public grupoService:GrupoService) {
  
    this.obtenerGrupos();
   }

  ngOnInit() {
  }

  recibirCarrera($event){
    this.grupo.carrera._id=$event;
  }

  obtenerGrupos(){
    this.grupoService.getGrupos().subscribe((res)=>{
      this.grupos=res as Grupo[];
      
    });
  }
  agregarGrupo(){
  
    this.grupoService.createGrupo(this.grupo).subscribe((res)=>{
      let responde=JSON.parse(JSON.stringify(res));
      
      this.titulo="Exito";this.cuerpo=responde.message; this.mostrar=true;
      this.obtenerGrupos();
      this.grupo= new Grupo();

    },(error)=>{this.titulo="Error";this.cuerpo=error; this.mostrar=true;});
  }

  ocultarToast($event){
    this.mostrar=$event;
  }
}
