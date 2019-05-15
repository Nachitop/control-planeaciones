import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class SemanaService {
  conexion:Conexion= new Conexion();
  url_api:string= "/api/semana";
  constructor(public http: HttpClient) { }

  crear(semana:any){
    return this.http.post(this.conexion.servidor+this.url_api,semana);
  }
  actualizar(semana:any){
    return this.http.put(this.conexion.servidor+this.url_api+"/"+semana._id,semana)
  }
  eliminar(_id:any){
    return this.http.delete(this.conexion.servidor+this.url_api+"/"+_id);
  }

  obtener(semestre:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+semestre);
  }
}
