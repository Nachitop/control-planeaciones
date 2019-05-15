export class Semana{
    constructor(_id:string="",nombre:string="",semestre:string="",inicio:string="", fin:string=""){
        this.nombre=nombre;
        this.semestre=semestre;
        this.inicio=inicio;
        this.fin=fin;
        this._id=_id;
    }
    _id:string;
    nombre:string;
    semestre:string;
    inicio:string;
    fin:string;
}