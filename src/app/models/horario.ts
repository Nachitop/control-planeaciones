import { Grupo } from './Grupo';
import { Plan } from './Plan';

export class Horario{

    constructor(_id:string="",grupo:Grupo=new Grupo(),plan:Plan=new Plan(),fecha:Date= new Date(),horario:any[]=[]){

        this._id=_id;
        this.grupo=grupo;
        this.plan=plan;
        this.fecha=fecha;
        this.horario=horario;
    }

    _id:string;
    grupo:Grupo;
    plan:Plan;
    horario:any[]=[];
    fecha:Date;
}