import { Usuario } from './Usuario';
import { Carrera } from './Carrera';

export class Coordinador{
    constructor(usuario:Usuario= new Usuario(), carrera:Carrera= new Carrera ){
        this.usuario=usuario;
        this.carrera= carrera;
    }
    usuario:Usuario;
    carrera:Carrera;
}