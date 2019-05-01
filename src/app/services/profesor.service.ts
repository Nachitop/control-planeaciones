import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  conexion:Conexion= new Conexion();
  url_api="/api/profesor";
  constructor(public http:HttpClient) { }
  createProfesor(profesor:any){
    return this.http.post(this.conexion.servidor+this.url_api, profesor);
  }
  updateProfesor(profesor:any){
    return this.http.put(this.conexion.servidor+this.url_api+"/"+profesor._id,profesor)
  }
  deleteProfesor(_id:string){
    return this.http.delete(this.conexion.servidor+this.url_api+"/"+_id)
  }
  getProfesor(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id)
  }
  getProfesores(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }
}
