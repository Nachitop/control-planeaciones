import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  tipoUsuario:string="";
  
  constructor(public router:Router) { 
    if(localStorage.getItem("tipoUsuario")!=null){
      this.tipoUsuario=JSON.parse(localStorage.getItem('tipoUsuario')).tipo;
    }else{
      localStorage.setItem("tipoUsuario",JSON.stringify({tipo:""}));
      // this.tipoUsuario=JSON.parse(localStorage.getItem("tipoUsuario"));
      // console.log(this.tipoUsuario);
    }
   
   
  }

  ngOnInit() {
  }

  salir(){
    localStorage.removeItem("usuario");
    localStorage.setItem("tipoUsuario",JSON.stringify({tipo:""}));
    window.location.reload();
    this.router.navigateByUrl('/');
   
    
  }

}
