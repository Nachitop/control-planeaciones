export class Actividad{
    constructor(
        _id:string="",
        nombre:string="",
        de:string=""
    ){
        this._id=_id;
        this.nombre=nombre;
        this.de=de;
    }
    _id:string;
    nombre:string;
    de:string;
}