import { Alumno } from './Alumno';
import { Grupo } from './Grupo';
import { Programatico } from './Programatico';
import { Semana } from './semana';

export class Avances{
    constructor(alumno:Alumno=new Alumno(),grupo:Grupo= new Grupo(),programatico:Programatico[]=[],fecha:string="",semana:Semana= new Semana() ){
        this.alumno=alumno;
        this.grupo=grupo;
        this.programatico=programatico;
        this.fecha=fecha;
        this.semana= new Semana();
    }

    alumno:Alumno;
    grupo:Grupo;
    programatico:Programatico[];
    fecha:string;
    semana:Semana;
}
