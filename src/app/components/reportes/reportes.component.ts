import { Component, OnInit } from '@angular/core';
import { SemanaService } from 'src/app/services/semana.service';
import { Semana } from 'src/app/models/semana';
import { GrupoService } from 'src/app/services/grupo.service';
import { Grupo } from 'src/app/models/Grupo';
import { Usuario } from 'src/app/models/Usuario';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import { Coordinador } from 'src/app/models/Coordinador';
import { AvancesService } from 'src/app/services/avances.service';
import { Avances } from 'src/app/models/Avances';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  semanas:Semana[]=[];
  sem:Semana= new Semana();
  grupos:Grupo[]= [];
  grupos2:Grupo[]= [];
  gr:Grupo= new Grupo();
  usuario:Usuario= new Usuario();
  tipoUsuario:string;
  coordinador:Coordinador= new Coordinador;
  avances:Avances[]= [];
  constructor(public semanaService:SemanaService, public grupoService:GrupoService, public coordinadorService: CoordinadorService, public avanceService:AvancesService) {

    this.usuario= JSON.parse(localStorage.getItem("usuario"));
    this.tipoUsuario=JSON.parse(localStorage.getItem("tipoUsuario")).tipo;

      this.obtenerCoordinador();
      this.obtenerSemanas();
      this.obtenerGrupos();
   }

  ngOnInit() {
  }

  obtenerCoordinador(){
    this.coordinadorService.getCoordinadorByUser(this.usuario._id).subscribe((res)=>{
      this.coordinador= res as Coordinador;
    }); 
  }

  obtenerSemanas(){
    this.semanaService.obtener('').subscribe((res)=>{
      this.semanas= res as Semana[];
      //console.log(this.semanas);
    });
  }


  obtenerGrupos(){
    this.grupoService.getGrupos().subscribe((res)=>{
      this.grupos= res as Grupo[];
      //console.log(this.grupos);
    },(error)=>{

    },()=>{
      this.grupos.forEach((grupo,index,self)=>{
        
     
        if(grupo.carrera.nombre===this.coordinador.carrera.nombre){
       
          this.grupos2.push(grupo);
        }
      });
    });
  }

  obtenerAvances(){
      this.avanceService.obtenerAvances(this.sem._id,this.gr._id).subscribe((res)=>{
        this.avances=res as Avances[];
        console.log(this.avances);
      });
  }

}
