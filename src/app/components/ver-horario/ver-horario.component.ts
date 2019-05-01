import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { Horario } from 'src/app/models/horario';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-ver-horario',
  templateUrl: './ver-horario.component.html',
  styleUrls: ['./ver-horario.component.css']
})
export class VerHorarioComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  horarios:Horario[]=[];
  horario:Horario= new Horario();
  constructor(public horarioService:HorarioService) { 
    this.obtenerHorarios();
  }

  ngOnInit() {
  }

  obtenerHorarios(){
    this.horarioService.getHorarios().subscribe((res:Horario[])=>{
      this.horarios=res;
      console.log(this.horarios);
    });
  }

  obtenerHorario(){
    this.horarioService.getHorario(this.horario._id).subscribe((res:Horario)=>{
      this.horario=res;
      console.log(res);
    })
  }

  eliminarHorario(){
    this.horarioService.deleteHorario(this.horario._id).subscribe((res)=>{
      let res2= JSON.parse(JSON.stringify(res));
      this.mostrarToast("Exito",res2.message);
      window.scrollTo(0,0);
      this.horarios=[];
      this.obtenerHorarios();
      this.horario= new Horario();
    },(error)=>{
      this.mostrarToast("Error",error.message);
      window.scrollTo(0,0);
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
