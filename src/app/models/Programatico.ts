import { Materia } from './Materia';
import { Profesor } from './Profesor';

export class Programatico{
    constructor(materia:Materia=new Materia(),profesor:Profesor=new Profesor(),dias:string[]=[],temas:string[]=[]){
        this.materia=materia;
        this.profesor=profesor;
        this.dias=dias;
        this.temas=temas;
    }
    materia:Materia;
    profesor:Profesor;
    dias:string[];
    temas:string[];
}