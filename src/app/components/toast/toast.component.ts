import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() titulo:string;
  @Input() cuerpo:string;
  @Input() mostrar:boolean=false;
  @Output() ocultarToast= new EventEmitter<boolean>();
  constructor() {
    setInterval(()=>{
      if(this.mostrar==true){
        setTimeout(()=>{
          this.esconder();
        },3000)
      }
    },1000)
    

   }

  ngOnInit() {
  }

  esconder(){
    this.mostrar=false;
    this.ocultarToast.emit(this.mostrar);
  }
  
 
}
