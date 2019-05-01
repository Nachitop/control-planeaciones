import { Component, OnInit } from '@angular/core';
import { AreaAcademica } from 'src/app/models/AreaAcademica';
import { AreaacademicaService } from 'src/app/services/areaacademica.service';

@Component({
  selector: 'app-areaacademica',
  templateUrl: './areaacademica.component.html',
  styleUrls: ['./areaacademica.component.css']
})
export class AreaacademicaComponent implements OnInit {
  areaAcademica:AreaAcademica= new AreaAcademica();
  aas:AreaAcademica[]=[];
  titulo:string;
  cuerpo:string;
  mostrar:boolean;


 
  constructor(public aasService:AreaacademicaService) { }

  ngOnInit() {
    this.obtenerAAS();
 
  }

  guardar(){
    console.log(this.areaAcademica.nombre)
    if(this.areaAcademica._id==""){
      this.aasService.crear(this.areaAcademica).subscribe(res=>{
        let res2=JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.areaAcademica=new AreaAcademica();
        this.obtenerAAS();
      },error=>{
        this.mostrarToast("Error",error.message);
      });
    }else{
     
      this.aasService.actualizar(this.areaAcademica).subscribe(res=>{
        let res2=JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",res2.message);
        this.areaAcademica=new AreaAcademica();
        this.obtenerAAS();
      })
    }
  }

  editar(areaAcademica:AreaAcademica){
    this.areaAcademica=areaAcademica;
  }

  obtenerAAS(){
    this.aasService.getS().subscribe((res)=>{
      this.aas= res as AreaAcademica[];
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
