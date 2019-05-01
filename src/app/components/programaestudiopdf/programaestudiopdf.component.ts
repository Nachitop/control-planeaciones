import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProgramaEstudio } from 'src/app/models/ProgramaEstudio';
import { ProgramaestudioService } from 'src/app/services/programaestudio.service';
import * as jsPDF from 'jspdf'; 
 
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-programaestudiopdf',
  templateUrl: './programaestudiopdf.component.html',
  styleUrls: ['./programaestudiopdf.component.css']
})
export class ProgramaestudiopdfComponent implements OnInit {
  programa:ProgramaEstudio= new ProgramaEstudio;
  constructor(public activatedRoute:ActivatedRoute, public programaService:ProgramaestudioService ) {
    this.activatedRoute.params.subscribe((param)=>{
      this.programa._id= param['_id'];
      this.programaService.get(this.programa._id).subscribe((res:ProgramaEstudio)=>{
        this.programa=res;
      },error=>{

      },
      ()=>{console.log(this.programa);});
    });
   
   }

  ngOnInit() {
  
  }

public convertirPDF()
{
  
var h1 = document.getElementById('h1');
var h2= document.getElementById('h2');
var h3=document.getElementById('h3');


let pdf=new jsPDF('p', 'mm', 'a4');
//pdf.internal.scaleFactor = 6;
var options={
  background: 'white',
  format:'PNG'


}
pdf.addHTML(h1,options, ()=>{
  pdf.addPage();
  pdf.addHTML(h2,options, ()=>{
    pdf.addPage();
    pdf.addHTML(h3,options,()=>{
      pdf.save('Programa_Estudio_'+this.programa.materia.nombre);
    })
  });
});


}

}
