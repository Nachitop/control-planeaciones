import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { Semana } from 'src/app/models/semana';
import { SemanaService } from 'src/app/services/semana.service';

@Component({
  selector: 'app-semanas',
  templateUrl: './semanas.component.html',
  styleUrls: ['./semanas.component.css']
})
export class SemanasComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;

  usuario:Usuario= new Usuario();
  tipoUsuario:string;
  semana:Semana= new Semana();
  semanas:Semana[]=[];
  semestres:string[]=["Semestre 1", "Semestre 2", "Semestre 3", "Semestre 4", "Semestre 5", "Semestre 6", "Semestre 7", "Semestre 8", "Semestre 9"];

  constructor(public semanaService:SemanaService) { 

    this.usuario= JSON.parse(localStorage.getItem("usuario"));
    this.tipoUsuario=JSON.parse(localStorage.getItem("tipoUsuario")).tipo;
    this.obtenerSemanas();


  }

  obtenerSemanas(){
    this.semanaService.obtener('').subscribe((res)=>{
      console.log(res);
      this.semanas= res as Semana[];
    });
  }

  ngOnInit() {
  }

  guardar(){

    if(this.semana._id==""){

      this.semanaService.crear(this.semana).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.obtenerSemanas();
        this.semana= new Semana();
      },error=>{
        this.mostrarToast("Error",error.error);
      });
    }else{
      this.semanaService.actualizar(this.semana).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.obtenerSemanas();
        this.semana= new Semana();
      },error=>{
        this.mostrarToast("Error",error.error);
      });
    }
  }




editarSemana(semana:Semana){
  this.semana=semana;
}
eliminarSemana(_id:string){
  this.semanaService.eliminar(_id).subscribe((res)=>{
    let res2= JSON.parse(JSON.stringify(res));
    this.mostrarToast("Exito",res2.message);
    this.obtenerSemanas();
    this.semana= new Semana();
  },error=>{
    this.mostrarToast("Error",error.error);
  });

}


  mostrarToast(titulo:string,cuerpo:string){
    this.titulo=titulo;
    this.cuerpo=cuerpo;
    this.mostrar=true;
  }
  ocultarToast($event){
    this.mostrar=$event;
  }


}
