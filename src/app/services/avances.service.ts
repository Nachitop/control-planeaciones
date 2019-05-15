import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class AvancesService {
  conexion:Conexion= new Conexion();
  url_api="/api/avances";
  constructor(public http:HttpClient) { }

  createAvance(avance:any){
    return this.http.post(this.conexion.servidor+this.url_api,avance);
  }

  getTemas(_idAlumno:string,_idGrupo:string,_idMateria:string){
      return this.http.get(this.conexion.servidor+this.url_api+"/obtener/temas/"+_idAlumno+"/"+_idGrupo+"/"+_idMateria)
  }

  getFechaAvance(_idAlumno:string,_idGrupo:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/fecha/"+_idAlumno+"/"+_idGrupo);
  }


  obtenerSemanaHechaPorSemestre(_idGrupo:string, _idAlumno:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/semanas/"+_idGrupo+"/"+_idAlumno);
  }

  obtenerAvances(_idSemana:string,_idGrupo:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_idSemana+"/"+_idGrupo);
  }
}
