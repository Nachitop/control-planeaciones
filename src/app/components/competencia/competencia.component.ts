import { Component, OnInit } from '@angular/core';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaService } from 'src/app/services/competencia.service';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css']
})
export class CompetenciaComponent implements OnInit {
  compe:Competencia= new Competencia();
  competencias:Competencia[]=[];
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  tipoUsuario:string="";
  constructor(public competenciaService:CompetenciaService) { 
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
    this.obtenerCompetencias();
  }

  ngOnInit() {
  }

  guardar(){
    if(this.compe._id==""){
      console.log(this.compe);
      this.competenciaService.crear(this.compe).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.compe= new Competencia();
        this.obtenerCompetencias();
      },error=>{
        this.mostrarToast("Error",error.message);
      });
    }else{
      this.competenciaService.actualizar(this.compe).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.compe= new Competencia();
        this.obtenerCompetencias();
      },error=>{
        this.mostrarToast("Error",error.message);
      });
    }
  }
  actualizar(competencia:Competencia){
    this.compe=competencia;
  }

  obtenerCompetencias(){
    this.competenciaService.getS().subscribe((res:Competencia[])=>{
      this.competencias=res;
    });
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
