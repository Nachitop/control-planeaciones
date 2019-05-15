import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {
  conexion: Conexion= new Conexion();
  url_api:string="/api/coordinador";
  constructor(public http:HttpClient) { }

  getCoordinadorByUser(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/byuser/"+_id);
  }
}
