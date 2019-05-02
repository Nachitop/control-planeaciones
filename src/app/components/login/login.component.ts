import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:Usuario=new Usuario();
  existeMatricula:number;
  tipoUsuario:string="";
  constructor(public usuarioService:UsuarioService, public router:Router) {
    this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
    console.log(this.tipoUsuario);
   }

  ngOnInit() {
  }

  validarMatricula(){ 
    this.usuarioService.validarMatricula(this.usuario.matricula).subscribe((res:number)=>{
      console.log(res);
      this.existeMatricula=res;
    })
  };
 
  login(){
    this.usuarioService.login(this.usuario).subscribe((res:Usuario)=>{
      this.usuario=res;
  
      this.usuarioService.tipoUsuario(this.usuario._id).subscribe((res:string)=>{
        window.localStorage.setItem('usuario',JSON.stringify(this.usuario));
        console.log(res);
        window.localStorage.setItem('tipoUsuario',JSON.stringify(res));
        this.router.navigateByUrl('/');
        window.location.reload();
      
      },error=>console.log(error));
    },(error)=>{console.log(error)});
};
}
