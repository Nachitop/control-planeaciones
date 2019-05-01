import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  conexion:Conexion= new Conexion();
  url_api="/api/carrera";
  constructor(public http:HttpClient) { }
  getCarreras(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }
}
