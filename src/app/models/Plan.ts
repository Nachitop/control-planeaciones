import { Carrera } from './Carrera';

export class Plan{
    constructor(_id:string="",carrera:Carrera=new Carrera(),periodo:string="",forma:string="",materias:any[]=[]){

        this._id=_id;
        this.carrera=carrera;
        this.periodo=periodo;
        this.forma=forma;
        this.materias=materias;
    }

_id:string;
carrera:Carrera;
periodo:string;
forma:string;
materias:any[];

}