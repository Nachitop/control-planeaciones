import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/Plan';
import { PlanService } from 'src/app/services/plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verplaneaciones',
  templateUrl: './verplaneaciones.component.html',
  styleUrls: ['./verplaneaciones.component.css']
})
export class VerplaneacionesComponent implements OnInit {
  multiple:boolean=false;
  plan:Plan= new Plan();
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  constructor(public planService:PlanService, public router:Router) { }

  ngOnInit() {
  }

  obtenerPlan($event){
    this.plan._id=$event;
    this.planService.obtenerPlan(this.plan._id).subscribe(res=>{
      this.plan=res as Plan;
      console.log(this.plan);
    });
    
  }

  eliminarPlan(){
    this.planService.eliminarPlan(this.plan._id).subscribe(res=>{
      let res2= JSON.parse(JSON.stringify(res));
      this.mostrarToast("Exito",res2.message);
      setInterval(()=>{
        location.reload();
      },3000)
        
    
     
      
    },error=>{
      this.mostrarToast("Exito",error.message);
  
        
      
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
