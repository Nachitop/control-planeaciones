import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
conexion:Conexion=new Conexion();
url_api="/api/plan";
  constructor(public http:HttpClient) { }
  crearPlan(plan:any){
    return this.http.post(this.conexion.servidor+this.url_api,plan);
  }

  obtenerPlan(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  obtenerPlanes(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }

  eliminarPlan(_id:string){
    return this.http.delete(this.conexion.servidor+this.url_api+"/"+_id);
  }


}
