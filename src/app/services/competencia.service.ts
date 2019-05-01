import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {
  conexion:Conexion= new Conexion();
  url_api="/api/competencia";
  constructor(public http:HttpClient) { }

  crear(competencia:any){
    return this.http.post(this.conexion.servidor+this.url_api,competencia);
  }
  actualizar(competencia:any){
    return this.http.put(this.conexion.servidor+this.url_api,competencia);
  }
  get(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }
  getS(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }
}
