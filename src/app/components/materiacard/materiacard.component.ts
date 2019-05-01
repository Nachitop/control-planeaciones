import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-materiacard',
  templateUrl: './materiacard.component.html',
  styleUrls: ['./materiacard.component.css']
})
export class MateriacardComponent implements OnInit {
  cantidad:number;
  @Input() titulo:string;
  multiple:boolean=false;
   materias:any[]=[];
  @Output() obtenerMateriasEvent= new EventEmitter<any>();
  constructor() { 
    
  }

  ngOnInit() {
  }

  recibirMateria($event){
    var objMateria=$event;
  
    var materias2= this.materias.filter((materia,index,self)=>{
     if(materia){
        if(materia.index===objMateria.index){
          this.materias.splice(index,1);
        }
     }else{

     }
    });
    this.materias.push(objMateria);
 
   
    
    var materiaObj={
      forma:this.titulo,
      materias:this.materias
    }
    
   
    this.obtenerMateriasEvent.emit(materiaObj);
  }

}
