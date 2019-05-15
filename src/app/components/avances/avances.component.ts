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
import { Semana } from 'src/app/models/semana';
import { SemanaService } from 'src/app/services/semana.service';


@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.css']
})
export class AvancesComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
 

  usuario:Usuario= new Usuario();
  tipoUsuario:string;
  alumno:Alumno= new Alumno();
  horario:Horario= new Horario();
  avance:Avances= new Avances();
  pe:ProgramaEstudio= new ProgramaEstudio();
  temasUnidad:String[]=[];
  temasYaPuestos:String[]=[];
  query:string="";
  ultimoAvanceFecha:Date;
  habilitar:boolean=false;
  materiasActuales:any[]=[];
  materiasPlan:any[]=[]
  semestres:string[]=[];
  semanas:Semana[]=[];
  //semanaObj:Semana= new Semana();
  _idSemana:string="";
  constructor(public semanaService:SemanaService, public alumnoService:AlumnoService,public avanceService:AvancesService, public horarioService:HorarioService, public modal:NgbModal, public peService:ProgramaestudioService) {

    this.usuario= JSON.parse(localStorage.getItem("usuario"));
    this.tipoUsuario=JSON.parse(localStorage.getItem("tipoUsuario")).tipo;

    if(this.tipoUsuario==="Alumno"){

      this.alumnoService.getAlumno(this.usuario._id).subscribe((res)=>{
        this.alumno=res as Alumno;
      
        this.horarioService.getHorarioPorAlumnoGrupo(this.alumno.grupo._id).subscribe((res)=>{
         this.horario=res as Horario;
      
      this.obtenerSemestresActuales();
         this.llenarAvance();
         // this.obtenerFechaAvance();
        })
      },error=>console.log(error));
    }


   
   }
   obtenerSemestresActuales(){
     this.horario.horario.forEach((horario)=>{
        this.materiasActuales.push(horario.materia._id);
     });
  
     this.horario.plan.materias.forEach((plan)=>{
       plan.materias.forEach(materia => {
      
         let index= this.materiasActuales.findIndex((_id)=>_id===materia.materia);
          if(index!=-1){
         
            this.semestres.push(plan.forma);
            
          }
       });
     });

  this.eliminarDuplicadoSemestre();
 

   }
   eliminarDuplicadoSemestre(){
    this.semestres.sort();
     for(var i = 1; i < this.semestres.length; i++){
         if(this.semestres[i] === this.semestres[i-1]){
             this.semestres.splice(i,1);
             i--;
          }
     }
     this.obtenerSemanas();
   }

  mostrarSemana(){
    
    let index= this.semanas.findIndex((semana)=>semana._id===this._idSemana);
    if(index!=-1){
      this.avance.semana=this.semanas[index];
    }
  }

   obtenerSemanas(){
    var semanasHechas=[];
    this.semanaService.obtener(this.semestres[0]).subscribe((res)=>{
      this.semanas= res as Semana[];
    
      this.avanceService.obtenerSemanaHechaPorSemestre(this.alumno.grupo._id,this.alumno.usuario._id).subscribe((res)=>{
        semanasHechas= res as Semana[];
        console.log(semanasHechas);
        console.log(this.semanas);
      },error=>{

      },()=>{
        semanasHechas.forEach((s)=>{
            let index= this.semanas.findIndex(semana=>semana._id===s.semana);
            console.log(index);
            if(index!=-1){
              
              this.semanas.splice(index,1);
            }
        });
     
        console.log(this.semanas);
      }); 
    });
   }

  //  obtenerFechaAvance(){
  //    this.avanceService.getFechaAvance(this.avance.alumno.usuario._id,this.avance.grupo._id).subscribe((res)=>{
  //      if(res==null){
  //        this.habilitar=true;
  //      }else{
  //       let res2=JSON.parse(JSON.stringify(res));
  //       this.ultimoAvanceFecha= new Date(res2.fecha);
  //       var fechaHoy:Date= new Date();

  //       if(this.ultimoAvanceFecha.getDate()<fechaHoy.getDate() && this.ultimoAvanceFecha.getDay()==5 ){
  //         console.log("ahsj");
  //         this.habilitar=true;
  //       }
  //       else{
  //         this.habilitar=false;
  //       }
  //      }
     
       

  //    });
  //  }

  ngOnInit() {
  }

  enviar(){
    this.avance.fecha=new Date().toISOString().split('T')[0];
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
          p.dias.push(this.regresarFecha($event.target.value));
        }else{
          let index=p.dias.findIndex((dia)=>dia===this.regresarFecha($event.target.value));
          p.dias.splice(index,1);
        }
      
      }
    
    });

  }

  regresarFecha(diaLetra:string): string{
    let sumarDia;
    switch(diaLetra){
      case "L": 
        sumarDia=0;
        break;
      case "M":
        sumarDia=1;
        break;
      case "MI":
        sumarDia=2;
        break;
      case "J":
        sumarDia=3;
        break;
      case "V":
        sumarDia=4;
        break;
    }
    let parts=this.avance.semana.inicio.split('-');

    var mydate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])); 

    var nuevaFecha= new Date();
    nuevaFecha.setDate(mydate.getDate()+sumarDia);

    return nuevaFecha.toISOString().split('T')[0];
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


  this.peService.getContenidos(this.query).subscribe((res)=>{
 
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
