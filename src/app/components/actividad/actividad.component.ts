import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/Actividad';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;

  actividad:Actividad= new Actividad();
  actividades:Actividad[]=[];
  tipoUsuario:string="";
  constructor(public actividadService:ActividadService) {
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
    this.obtenerActividades();
   }

  ngOnInit() {
  }

  obtenerActividades(){
    this.actividadService.getS().subscribe((res:Actividad[])=>{
      this.actividades=res;
    })
  }

  guardar(){
    if(this.actividad._id==""){
      this.actividadService.crear(this.actividad).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.actividad= new Actividad();
        this.obtenerActividades();
        this.mostrarToast("Exito",res2.message);
      });
    }else{
      console.log(this.actividad);
      this.actividadService.actualizar(this.actividad).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.actividad= new Actividad();
        this.obtenerActividades();
        this.mostrarToast("Exito",res2.message);
      });
    }
  }

  editar(actividad:Actividad){
    this.actividad=actividad;
  }

  mostrarToast(titulo,cuerpo){
    this.titulo=titulo;
    this.cuerpo=cuerpo;
    this.mostrar=true;
  }
  ocultarToast($event){
    this.mostrar=$event;
  }

}
