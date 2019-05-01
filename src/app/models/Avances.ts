import { Alumno } from './Alumno';
import { Grupo } from './Grupo';
import { Programatico } from './Programatico';

export class Avances{
    constructor(alumno:Alumno=new Alumno(),grupo:Grupo= new Grupo(),programatico:Programatico[]=[],fecha:Date=new Date() ){
        this.alumno=alumno;
        this.grupo=grupo;
        this.programatico=programatico;
        this.fecha=fecha;
    }

    alumno:Alumno;
    grupo:Grupo;
    programatico:Programatico[];
    fecha:Date;
}
