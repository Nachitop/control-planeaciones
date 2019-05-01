import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  conexion:Conexion=new Conexion();
  url_api="/api/alumno";
  constructor(public http:HttpClient) { }

  getAlumnos(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }
  createAlumno(alumno:any){
    return this.http.post(this.conexion.servidor+this.url_api,alumno);
  }
  updateAlumno(alumno:any){
    return this.http.put(this.conexion.servidor+this.url_api+"/"+alumno._id,alumno);
  }

  getAlumno(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

}
