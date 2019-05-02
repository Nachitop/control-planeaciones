import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  multiple:boolean=false;
  alumno:Alumno= new Alumno();
  alumnos:Alumno[]=[];
  tipoUsuario:string="";
  constructor(public alumnoService:AlumnoService) { this.getAlumnos(); 
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
  }

  ngOnInit() {
    
  }

  guardar(){
    console.log(this.alumno)
    if(!this.alumno.usuario._id){
      console.log("entré");
        this.alumnoService.createAlumno(this.alumno).subscribe((res)=>{
            let response= JSON.parse(JSON.stringify(res));
            this.mostrarToast("Exito",response.message);
            this.getAlumnos();
            this.alumno= new Alumno();
        },error=>{
          this.mostrarToast("Error",error.message);
        });
    }else{
   
      this.alumnoService.updateAlumno(this.alumno).subscribe((res)=>{
        let response= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",response.message);
        this.getAlumnos();
        this.alumno= new Alumno();
      },error=>{
        this.mostrarToast("Error",error.message);
      })
    }

  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe((res)=>{
      this.alumnos=res as Alumno[];
      console.log(this.alumnos);
    },(error)=>{
      this.mostrarToast("Error",error.error.message);
    });
  }

  editarAlumno(alumno:Alumno){
    alumno.grupo._id=this.alumno.grupo._id;
    this.alumno=alumno;
    console.log(this.alumno)
  }

  obtenerGrupo($event){
    this.alumno.grupo._id=$event;
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
