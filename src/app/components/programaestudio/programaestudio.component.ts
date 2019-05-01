import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from 'src/app/models/Materia';
import { ProgramaEstudio } from 'src/app/models/ProgramaEstudio';
import { AreaacademicaService } from 'src/app/services/areaacademica.service';
import { AreaAcademica } from 'src/app/models/AreaAcademica';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { Actividad } from 'src/app/models/Actividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { Criterio } from 'src/app/models/Criterio';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { ProgramaestudioService } from 'src/app/services/programaestudio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contenido } from 'src/app/models/Contenido';
import { Evidencia } from 'src/app/models/Evidencia';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-programaestudio',
  templateUrl: './programaestudio.component.html',
  styleUrls: ['./programaestudio.component.css']
})
export class ProgramaestudioComponent implements OnInit {
  titulo:string;
  cuerpo:string;
  mostrar:boolean;
  multiple:boolean=false;
  materias:Materia[]=[];
  pe:ProgramaEstudio= new ProgramaEstudio();
  aas:AreaAcademica[]=[];
  competencias:Competencia[]=[];
  //cont:string="";
  //evi:string="";
  actividadesDocente:Actividad[]=[];
  actividadesEstudiante:Actividad[]=[];
  objCriterio:Criterio= new Criterio();
  bibliografia:Bibliografia= new Bibliografia();
  materia2:Materia= new Materia();
  pes:ProgramaEstudio[]=[];
  cont:Contenido= new Contenido();
  evidencia2:Evidencia= new Evidencia();




  contenido={
    unidad:'',
    tema:''
  }
  evi={
    evidencia:'',
    criterio:'',
    porcentaje:0
  }
  
  constructor(public router:Router, public materiaService:MateriaService, public aaService:AreaacademicaService, public competenciaService:CompetenciaService, public actividadService:ActividadService, public programaEstudioService:ProgramaestudioService, public modal:NgbModal) {
    this.obtenerMaterias();
    this.obtenerAAS();
    this.obtenerCompetencias();
    this.obtenerActividades();
    this.obtenerPES();


   }

  ngOnInit() {

  }


  obtenerActividades(){
    this.actividadService.getS("Docente").subscribe((res:Actividad[])=>{
      this.actividadesDocente=res;
    });

    this.actividadService.getS("Estudiante").subscribe((res:Actividad[])=>{
      this.actividadesEstudiante=res;
    });
  }
  obtenerCompetencias(){
    this.competenciaService.getS().subscribe((res:Competencia[])=>{
      this.competencias=res;
    })
  }

  obtenerAAS(){
    this.aaService.getS().subscribe((res:AreaAcademica[])=>{
      this.aas=res;
    })
  }
  obtenerMaterias(){
    this.materiaService.getMaterias().subscribe((res:Materia[])=>{
      this.materias=res;
    });
  }

  mActividadDocente(actividadDocente:Actividad,accion:string){
    if(accion=='agregar'){
      this.pe.actividadesDocente.push(actividadDocente);
    }else{
      let index= this.pe.actividadesDocente.findIndex((ad)=>ad===actividadDocente);
      this.pe.actividadesDocente.splice(index,1);
    }
  }
  mActividadEstudiante(actividadEstudiante:Actividad,accion:string){
    if(accion=='agregar'){
      this.pe.actividadesEstudiante.push(actividadEstudiante);
    }else{
      let index= this.pe.actividadesDocente.findIndex((ad)=>ad===actividadEstudiante);
      this.pe.actividadesEstudiante.splice(index,1);
    }
  }

mContenido( accion:string,contenidoUnidad?:string){

  var c={
    unidad:'',
    temas:[]
  }
  if(accion=="agregar"){

    if(this.pe.contenidos.length>0){
      let index=this.pe.contenidos.findIndex((c)=>c.unidad===this.contenido.unidad);

      if(index!=-1){
        this.pe.contenidos[index].temas.push(this.contenido.tema);
      }
      else{
        c.unidad=this.contenido.unidad;
        c.temas.push(this.contenido.tema);
        this.pe.contenidos.push(c);
      }
 
    }else{
     
      c.unidad=this.contenido.unidad;
      c.temas.push(this.contenido.tema);

      this.pe.contenidos.push(c);
    }
   
    this.contenido.tema="";
  
  }else{
    if(accion=="eliminar"){
      let index= this.pe.contenidos.findIndex((c)=>c.unidad===contenidoUnidad);
      this.pe.contenidos.splice(index,1);
      this.cont= new Contenido();
    }
  }

}

verTemasContenido(contenido:Contenido){
  this.cont=contenido;
}
eliminarTema(tema:string){
  let index= this.cont.temas.findIndex((t)=>t===tema);
  this.cont.temas.splice(index,1);
  let index2= this.pe.contenidos.findIndex((c)=>c.unidad===this.cont.unidad);
  this.pe.contenidos[index2].temas=this.cont.temas;
}

mCompetencia(competencia:Competencia, accion:string){
  if(accion=='agregar'){
    this.pe.competencia.push(competencia);
  }else{
   var index= this.pe.competencia.findIndex((com)=>com===competencia);
  this.pe.competencia.splice(index,1);
  }

}

mEvidencia(accion:string,evidencia?:Evidencia){
   var c:Criterio= new Criterio();
  var ee:Evidencia= new Evidencia();
 
  if(accion=="agregar"){
    if(this.pe.evidencias.length>0){
      let index= this.pe.evidencias.findIndex((ev)=>ev.evidencia===this.evi.evidencia);
      if(index!=-1){
        c.criterio=this.evi.criterio;
        c.porcentaje=this.evi.porcentaje
        this.pe.evidencias[index].criterios.push(c)
      }else{
        ee.evidencia=this.evi.evidencia;
        c.criterio=this.evi.criterio;
        c.porcentaje=this.evi.porcentaje;
        ee.criterios.push(c);
  
        this.pe.evidencias.push(ee);

      }
   

    }else{
      ee.evidencia=this.evi.evidencia;
      c.criterio=this.evi.criterio;
      c.porcentaje=this.evi.porcentaje;
      ee.criterios.push(c);

      this.pe.evidencias.push(ee);
    }
    this.evi.criterio="";
    this.evi.porcentaje=0;
  }else{
    let index= this.pe.evidencias.findIndex((evi)=>evi.evidencia===evidencia.evidencia);
    this.pe.evidencias.splice(index,1);
    this.evidencia2=new Evidencia();

  }

}





verEvidencias(evidencia:Evidencia){
  this.evidencia2=evidencia;
}

eliminarCriterio(criterio:Criterio){
  let index=this.evidencia2.criterios.findIndex((c)=>c===criterio);
  this.evidencia2.criterios.splice(index,1);
  let index2=this.pe.evidencias.findIndex((e)=>e.evidencia===this.evidencia2.evidencia);
  this.pe.evidencias[index2]=this.evidencia2;
}
mBibliografia(accion:string,bibliografia?:Bibliografia){
  if(accion=='agregar'){
    this.pe.bibliografias.push(this.bibliografia);
    this.bibliografia= new Bibliografia();
  }
  else{
    console.log(bibliografia);
    let index= this.pe.bibliografias.findIndex(bib=>bib===bibliografia);
    this.pe.bibliografias.splice(index,1);
  }
}

mMateria(unidad:Materia,accion:string){
  console.log(unidad);
  console.log(this.pe.unidadesRelacionadas);
  if(accion=='agregar'){
    this.pe.unidadesRelacionadas.push(unidad);
  
  }
  else{

    let index= this.pe.unidadesRelacionadas.findIndex(uni=>uni===unidad);
    this.pe.unidadesRelacionadas.splice(index,1);
  }
}

obtenerPES(){
  this.programaEstudioService.getS().subscribe((res:ProgramaEstudio[])=>{
    this.pes=res;
  })
}

editarPE(pe1:ProgramaEstudio){
  this.programaEstudioService.get(pe1._id).subscribe((res)=>{
    this.pe=res as ProgramaEstudio;
 
    this.modal.dismissAll();
  });
}

guardar(){
  console.log(this.pe);
  if(this.pe._id==""){
    this.programaEstudioService.crear(this.pe).subscribe((res)=>{
      let res2=JSON.parse(JSON.stringify(res));
      this.mostrarToast("Exito",res2.message);
      this.pe= new ProgramaEstudio();
  
      this.obtenerPES();
    },error=>{
      this.mostrarToast("",error.message);
    });
  }
  else{
    this.programaEstudioService.actualizar(this.pe).subscribe((res)=>{
      let res2=JSON.parse(JSON.stringify(res));
      this.mostrarToast("Exito",res2.message);
      this.pe= new ProgramaEstudio();

      this.obtenerPES();
    },erro=>{
      this.mostrarToast("",erro.message);
    });
  }
  window.scrollTo(0,0);
}


verPrograma(pe1:ProgramaEstudio){
  this.modal.dismissAll();
    this.router.navigate(["programa-estudio-pdf", {
      _id:pe1._id
     }]);
}


abrirModal(content){
  this.modal.open(content, { centered: true });
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
