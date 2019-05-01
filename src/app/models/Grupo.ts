import { Carrera } from './Carrera';

export class Grupo{
    constructor(_id:string="",grupo:number=0,carrera:Carrera=new Carrera()){
        this._id=_id;
        this.grupo=grupo;
        this.carrera=carrera;
    }
    _id:string;
    grupo:number;
    carrera:Carrera=new Carrera();
}