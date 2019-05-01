import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/Materia';
import { MateriaService } from 'src/app/services/materia.service';
import { Carrera } from 'src/app/models/Carrera';
import { AreaAcademica } from 'src/app/models/AreaAcademica';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  materia:Materia= new Materia();
  materias:Materia[]=[];
  aas:AreaAcademica[]=[];
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  multiple:boolean=true;
  constructor(public materiaService:MateriaService) { 

    this.obtenerMaterias();
  
  }

  ngOnInit() {
    
  }


  obtenerMaterias(){
    this.materiaService.getMaterias().subscribe((res)=>{
      this.materias=res as Materia[];
     
    },error=>console.log(error));
  }

  guardarMateria(){
    if(this.materia._id){
      this.materiaService.updateMateria(this.materia).subscribe((res)=>{
        let response=JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",response.message);
        this.obtenerMaterias();
        this.materia= new Materia();
      },(error)=>{
        this.mostrarToast("Error",error.message);
      } );

    }else{
      this.materiaService.createMateria(this.materia).subscribe((res)=>{
        let response=JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",response.message);
        this.obtenerMaterias();
        this.materia= new Materia();
      },(error)=>{
        this.mostrarToast("Error",error.message);
       
      });
    }
  }

  editMateria(materia:Materia){
    this.materia=materia;
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
