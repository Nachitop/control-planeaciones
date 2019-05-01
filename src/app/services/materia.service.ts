import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  conexion:Conexion = new Conexion();
  url_api="/api/materia";
  constructor(public http:HttpClient) { }

  getMateria(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/"+_id);
  }

  getMaterias(){
    return this.http.get(this.conexion.servidor+this.url_api);
  }

  createMateria(materia:any){
    return this.http.post(this.conexion.servidor+this.url_api,materia);
  }

  updateMateria(materia:any){
    return this.http.put(this.conexion.servidor+this.url_api+"/"+materia._id,materia);
  }

}
