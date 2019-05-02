import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  mostrar:boolean;
  titulo:string;
  cuerpo:string;
  usuario:Usuario= new Usuario();
  usuarios:Usuario[]=[];
  tipoUsuario:string="";
  constructor(public usuarioService:UsuarioService) {
    this.getUsuarios();
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
    console.log(this.usuario);
   }

  ngOnInit() {
  }
  guardar(form:NgForm){
    console.log(form.value);
    if(form.valid){
      if(form.control.get('_id').value=='' || form.control.get('_id').value==undefined){
        this.usuarioService.createUsuario(form.value).subscribe((res)=>{
          let response= JSON.parse(JSON.stringify(res));
        this.mostrarToast("Exito",response.message);
        this.getUsuarios();
        form.resetForm();
        },(error)=>{
          this.mostrarToast("Error",error.message);
        });
      }else{
          this.usuarioService.updateUsuario(form.value).subscribe((res)=>{
            let response= JSON.parse(JSON.stringify(res));
            this.mostrarToast("Exito",response.message);
            this.getUsuarios();
            form.resetForm();
          },  error=>{
            this.mostrarToast("Error",error.message);
          })
      }
    }
    this.usuario= new Usuario();
  }
  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe((res)=>{
      this.usuarios= res as Usuario[];
    },(error)=>console.error(error));
  }
  editarUsuario(usuario:Usuario){
   this.usuario=usuario;
   
  }

  mostrarToast(titulo,cuerpo){
    this.titulo=titulo;
    this.cuerpo=cuerpo;
    this.mostrar=true;
  }
  ocultarToast($event){
    this.mostrar=$event;
  }

}
