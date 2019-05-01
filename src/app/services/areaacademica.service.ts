import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class AreaacademicaService {
  conexion:Conexion= new Conexion();
  url_api="/api/aa";
  constructor(public http:HttpClient) { }

  crear(area_academica:any){
    return this.http.post(this.conexion.servidor+this.url_api,area_academica);
  }

  actualizar(area_academica:any){
    return this.http.put(this.conexion.servidor+this.url_api,area_academica);
  }

  get(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  getS(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }

}
