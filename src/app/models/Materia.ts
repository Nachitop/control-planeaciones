import { Horas } from './Horas';
import { AreaAcademica } from './AreaAcademica';
import { Competencia } from './Competencia';
import { Responsable } from './Responsable';

export class Materia{
    constructor(_id:string="",nombre:string="",clave:string="",
        horas:Horas= new Horas(),
      

    ){
        this._id=_id;
        this.nombre=nombre;
        this.clave=clave;
        this.horas=horas;
  
    }

    _id:string;
    nombre:string;
    clave:string;
    horas: Horas;
  
   
}