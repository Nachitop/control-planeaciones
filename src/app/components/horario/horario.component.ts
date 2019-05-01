import { Component, OnInit, ElementRef, ɵConsole } from '@angular/core';
import { Horario } from 'src/app/models/horario';
import { Plan } from 'src/app/models/Plan';
import { PlanService } from 'src/app/services/plan.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/app/models/Profesor';
import { HorarioService } from 'src/app/services/horario.service';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  multiple:boolean=false;
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  horario:Horario= new Horario();
  plan:Plan= new Plan();
  forma:string="";
  materias:any[]=[];
  profesores:Profesor[]=[];
  constructor(public planService:PlanService, public profesorService:ProfesorService, public horarioService: HorarioService) {
    this.profesorService.getProfesores().subscribe((res:Profesor[])=>{
      this.profesores=res;
      console.log(this.profesores)
    });
   }

  ngOnInit() {
    
  }


  obtenerPlan($event){
    this.horario.plan._id=$event;
    this.planService.obtenerPlan(this.horario.plan._id).subscribe((res)=>{
      this.plan= res as Plan;
      console.log(this.plan.materias);
    });

  }

  mostrarMaterias(){
    this.plan.materias.forEach((materia)=>{
   if(materia.forma===this.forma){
     this.materias=materia.materias;
     console.log(this.materias);
   }
   
    });
  }

  guardar(){
  
    this.horario.horario=[];
 
   var cards= document.getElementsByClassName("card");
 
 
      for(let i=0;i<=cards.length-1;i++){
       var cardBody= cards[i].getElementsByClassName("card-body");
       for(let x=0;x<=cardBody.length-1;x++){
        var horario={
          profesor:'',
          materia:'',
          esquema:[]
        }
        var cardBodyChildren= cardBody[x].children;
        var materia=cardBodyChildren[0].getAttribute("value");
        horario.materia=materia;
      
        var p=<HTMLInputElement> document.getElementById(cardBodyChildren[1].getAttribute("id"));
        var profesor= p.value;
        horario.profesor=profesor;
        
  
        console.log(cardBodyChildren[3]);
        
        
      
        
         for(let z=0;z<=cardBodyChildren[3].children.length-1;z++){
           var tbodyHoras=cardBodyChildren[3].children[z].children[1].children;
           for(let j=0;j<=tbodyHoras.length-1;j++){

            var esquema={
              dia:'',
              inicio:'',
              fin:''
            }
            var d= <HTMLInputElement>tbodyHoras[j].children[0];
            var dia= d.textContent;
            esquema.dia=dia;
            
            var ini=<HTMLInputElement>tbodyHoras[j].children[1].children[0];
            var fi=<HTMLInputElement>tbodyHoras[j].children[2].children[0];

            var inicio= ini.value;
            var fin=fi.value
            esquema.inicio=inicio;
            esquema.fin=fin;
            if(esquema.inicio==="" && esquema.fin===""){

            }else{
              horario.esquema.push(esquema);
            }
           
         
           }
         }
       
       }
       this.horario.horario.push(horario);
      
      }

      this.horarioService.crearHorario(this.horario).subscribe((res)=>{
        let res2= JSON.parse(JSON.stringify(res));
        window.scrollTo(0,0);
        this.mostrarToast("Exito",res2.message);
        location.reload();
        
      },(error)=>{
        this.mostrarToast("Error",error.message);
        window.scrollTo(0,0);
        location.reload();
      });

  }

  mostrarToast(titulo,cuerpo){
    this.titulo=titulo;
    this.cuerpo=cuerpo;
    this.mostrar=true;
  }
 
  obtenerGrupo($event){
    this.horario.grupo._id=$event;
  }

  ocultarToast($event){
    this.mostrar=$event;
  }

}
