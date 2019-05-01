import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/Profesor';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  profesor:Profesor= new Profesor();
  profesores:Profesor[]= [];
  multiple:boolean=true;
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  constructor(public profesorService:ProfesorService) {
    this.obtenerProfesores();
   }

  ngOnInit() {
  }

  obtenerProfesores(){
    this.profesorService.getProfesores().subscribe((res)=>{
      this.profesores= res as Profesor[];
     console.log(this.profesores);
    });
  }

  // obtenerPlan($event){
  //   this.profesor.plan=$event;
  // }
  // obtenerGrupo($event){
  //   this.profesor.grupo=$event;
  //   console.log($event);
  // }

  guardar(){
  
    // if(!this.profesor.usuario._id){
    //   console.log("entre crear");
      this.profesorService.createProfesor(this.profesor).subscribe(res=>{
        let res2= JSON.parse(JSON.stringify(res));
          this.mostrarToast("Exito",res2.message);
          this.obtenerProfesores();
          this.profesor= new Profesor();
      },error=>{
        this.mostrarToast("Error",error.message);
      });
    // }else{
    //   console.log("entre update");
    //   this.profesorService.updateProfesor(this.profesor).subscribe((res)=>
    //   {
    //     let res2= JSON.parse(JSON.stringify(res));
    //       this.mostrarToast("Exito",res2.message);
    //       this.obtenerProfesores();
    //       this.profesor= new Profesor();
    //   },error=>{
    //     this.mostrarToast("Error",error.message);
    //   })
    // }
   
  }

    eliminar(profesor:Profesor){
  //    this.profesor=profesor;

      this.profesorService.deleteProfesor(profesor._id).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.obtenerProfesores();
 
      },(error)=>{
        this.mostrarToast("Error",error.message);
       
      });
      location.reload();
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
