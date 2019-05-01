export class Carrera{
    constructor(_id:string="",nombre:string="",facultad:string="",status:string=""){
        this._id=_id;
        this.nombre=nombre;
        this.facultad=facultad;
        this.status=status;
    }
    _id:string;
    nombre:string;
    facultad:string;
    status:string;
}