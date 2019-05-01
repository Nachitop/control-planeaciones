import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  conexion:Conexion= new Conexion();
  url_api="/api/actividad";
  constructor(public http:HttpClient) { }
  crear(actividad:any){
    return this.http.post(this.conexion.servidor+this.url_api,actividad);
  }

  actualizar(actividad:any){
    return this.http.put(this.conexion.servidor+this.url_api,actividad);
  }

  get(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  getS(de?:string){
    if(de==undefined){
      de="";
    }
    return this.http.get(this.conexion.servidor+this.url_api+"/all/"+de);
  }
}
