import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/Alumno';

import { HorarioService } from 'src/app/services/horario.service';
import { Horario } from 'src/app/models/horario';
import { Avances } from 'src/app/models/Avances';
import { Programatico } from 'src/app/models/Programatico';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramaEstudio } from 'src/app/models/ProgramaEstudio';
import { ProgramaestudioService } from 'src/app/services/programaestudio.service';
import { AvancesService } from 'src/app/services/avances.service';


@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.css']
})
export class AvancesComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  fecha:Date= new Date();
  dia:number;
  usuario:Usuario= new Usuario();
  tipoUsuario:any;
  alumno:Alumno= new Alumno();
  horario:Horario= new Horario();
  avance:Avances= new Avances();
  pe:ProgramaEstudio= new ProgramaEstudio();
  temasUnidad:String[]=[];
  temasYaPuestos:String[]=[];
  query:string="";
  ultimoAvanceFecha:Date;
  habilitar:boolean=false;
  constructor(public alumnoService:AlumnoService,public avanceService:AvancesService, public horarioService:HorarioService, public modal:NgbModal, public peService:ProgramaestudioService) {
    this.dia= this.fecha.getDay();
    this.usuario= JSON.parse(localStorage.getItem("usuario"));
    this.tipoUsuario=JSON.parse(localStorage.getItem("tipoUsuario"));

    if(this.tipoUsuario.tipo=="Alumno"){

      this.alumnoService.getAlumno(this.usuario._id).subscribe((res)=>{
        this.alumno=res as Alumno;
        this.horarioService.getHorarioPorAlumnoGrupo(this.alumno.grupo._id).subscribe((res)=>{
         this.horario=res as Horario;
         this.llenarAvance();
          this.obtenerFechaAvance();
        })
      },error=>console.log(error));
    }


   
   }

   obtenerFechaAvance(){
     this.avanceService.getFechaAvance(this.avance.alumno.usuario._id,this.avance.grupo._id).subscribe((res)=>{
       if(res==null){
         this.habilitar=true;
       }else{
        let res2=JSON.parse(JSON.stringify(res));
        this.ultimoAvanceFecha= new Date(res2.fecha);
        var fechaHoy:Date= new Date();
        console.log(fechaHoy);
        console.log(this.ultimoAvanceFecha);
        if(this.ultimoAvanceFecha.getDate()<fechaHoy.getDate() && this.ultimoAvanceFecha.getDay()==5 ){
          console.log("ahsj");
          this.habilitar=true;
        }
        else{
          this.habilitar=false;
        }
       }
     
       

     });
   }

  ngOnInit() {
  }

  enviar(){
    this.avance.fecha=new Date();
    this.avanceService.createAvance(this.avance).subscribe((res)=>{
      let res2= JSON.parse(JSON.stringify(res));
 
      this.mostrarToast("Exito",res2.message);
      window.scrollTo(0,0);
      window.location.reload();
    },error=>{
      this.mostrarToast("Exito",error.message);
      window.scrollTo(0,0);
    });
  }


 
  
  llenarAvance(){
    this.avance.alumno=this.alumno;
    this.avance.grupo=this.horario.grupo;
    this.horario.horario.forEach((h)=>{
      var programatico:Programatico= new Programatico();
      programatico.materia=h.materia;
      programatico.profesor=h.profesor;
      programatico.dias=[];
      programatico.temas=[];
 
      this.avance.programatico.push(programatico);
     
    });
     
  }

  asistencia($event,_idMateria,_idProfesor){
  
    if($event.target.checked==true){
      this.asistencia2($event,_idMateria,_idProfesor,"agregar");
    }else{
      this.asistencia2($event,_idMateria,_idProfesor,"remover");
    }
  }

  asistencia2($event,_idMateria,_idProfesor,accion){
    this.avance.programatico.forEach((p)=>{
      if(p.materia._id===_idMateria && p.profesor._id===_idProfesor){
        if(accion=="agregar"){
          p.dias.push($event.target.value);
        }else{
          let index=p.dias.findIndex((dia)=>dia===$event.target.value);
          p.dias.splice(index,1);
        }
      
      }
    });
 
  }

  abrirModal(content:any,_idMateria:string){
    this.query="";
    this.temasUnidad=[];
    this.query=this.query+"?_idMateria="+_idMateria;
    this.obtenerTemasDeAvances(_idMateria,content);

  
    
   
 
  }

  obtenerTemasDeAvances(_idMateria:string,content:any){
    this.avanceService.getTemas(this.avance.alumno.usuario._id,this.avance.grupo._id,_idMateria).subscribe((res)=>{
     this.temasYaPuestos=res as String[];
     if(this.temasYaPuestos.length>0){
      this.temasYaPuestos.forEach((t)=>{
        this.query=this.query+"&"+"temas="+t;
      });
   
  }

  console.log(this.query);
  this.peService.getContenidos(this.query).subscribe((res)=>{
    console.log(res);
      if(res!=null){
        this.pe=res as ProgramaEstudio;
        this.modal.open(content,{
          centered:true
        });

      }else{
        this.modal.dismissAll();
      }
  
  },error=>{
    this.modal.dismissAll();
  },()=>{
  
  
  
  });


  
    });
  }

  temas(tema:string,accion:string){
    this.avance.programatico.forEach((p)=>{
      if(p.materia._id===this.pe.materia._id){
        if(accion=="agregar"){
          let index=p.temas.findIndex((t)=>t===tema)
          if(index==-1){
            p.temas.push(tema);
          }
       
        }else{
          let index= p.temas.findIndex((t)=>t===tema);
          p.temas.splice(index,1);
        }
      }
    });

    console.log(this.avance);
  }
  obtenerTemas(unidad:string){
    this.pe.contenidos.forEach((c)=>{
      if(c.unidad===unidad){
        this.temasUnidad=c.temas;
      }
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
