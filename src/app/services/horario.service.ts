import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  conexion:Conexion= new Conexion();
  url_api="/api/horario";
  constructor(public http:HttpClient) { }

  crearHorario(horario:any){
    return this.http.post(this.conexion.servidor+this.url_api,horario);
  }

  getHorario(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  getHorarios(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }

  deleteHorario(_id:string){
    return this.http.delete(this.conexion.servidor+this.url_api+"/"+_id);
  }

  updateHorario(horario:any){
    return this.http.delete(this.conexion.servidor+this.url_api+"/"+horario._id,horario);
  }

  getHorarioPorAlumnoGrupo(_idGrupo:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/grupo/"+_idGrupo);
  }
}
