import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class ProgramaestudioService {
  conexion:Conexion= new Conexion();
  url_api="/api/pe";
  constructor(public http:HttpClient) { }
  crear(pe:any){
    return this.http.post(this.conexion.servidor+this.url_api,pe);
  }

  actualizar(pe:any){
    return this.http.put(this.conexion.servidor+this.url_api,pe);
  }

  get(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  getS(){
   
    return this.http.get(this.conexion.servidor+this.url_api+"/");
  }

  getContenidos(query:any){
    return this.http.get(this.conexion.servidor+this.url_api+"/contenidos"+query);
  }
}
