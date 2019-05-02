import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Plan } from 'src/app/models/Plan';
import * as $ from 'jquery';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan-de-estudio',
  templateUrl: './plan-de-estudio.component.html',
  styleUrls: ['./plan-de-estudio.component.css']
})
export class PlanDeEstudioComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  multiple:boolean=false;
  plan:Plan= new Plan();
  desde:string;
  hasta:string;
  cantidad:number;
 estructura:any[]=[];

 tipoUsuario:string="";
  constructor(public planService:PlanService) { 
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
  }

  ngOnInit() {
  }


  recibirCarrera($event){
    this.plan.carrera._id=$event;
  }

  recibirMaterias($event){
     let materiaObj=$event;
  
     var estructura2= this.estructura.filter((materia,index,self)=>{
       if(materia){
        console.log(materia);
          if(materia.forma===materiaObj.forma){
            this.estructura.splice(index,1);
          }
       }else{

       }
     });
 
     
     this.estructura.push(materiaObj)








    
  }
  guardar(){
    window.scrollTo(0,0);
    this.plan.periodo=this.desde+"-"+this.hasta;
      this.plan.materias=this.estructura;
      this.planService.crearPlan(this.plan).subscribe((res)=>{
        let response=JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",response.message);
        this.plan= new Plan();
        this.estructura=[];
        this.cantidad=0;
        this.desde="";
        this.hasta="";
      },(error)=>{
        this.mostrarToast("Error",error.message);
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
