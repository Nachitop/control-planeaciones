import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Conexion } from '../models/Conexion';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpClient) { }
  conexion:Conexion=new Conexion();
  url_api="/api/usuario"
  validarMatricula(matricula:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/validar/"+matricula)
  }

  login(usuario:any){
    return this.http.post(this.conexion.servidor+this.url_api+"/login",usuario);
  }
  tipoUsuario(_id:string){
    return this.http.get(this.conexion.servidor+this.url_api+"/tipo/"+_id);
  }

  getUsuarios(){
    return this.http.get(this.conexion.servidor+this.url_api)
  }

  createUsuario(usuario:any){
    return this.http.post(this.conexion.servidor+this.url_api,usuario);
  }

  updateUsuario(usuario:any){
    return this.http.put(this.conexion.servidor+this.url_api+"/"+usuario._id,usuario)
  }
}
