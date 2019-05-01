import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  conexion:Conexion= new Conexion();
  url_api="/api/grupo"
  constructor(public http:HttpClient) { }

  createGrupo(grupo:any){
    return this.http.post(this.conexion.servidor+this.url_api,grupo);
  }
  getGrupos(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }
  getGrupo(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id)
  }
}
