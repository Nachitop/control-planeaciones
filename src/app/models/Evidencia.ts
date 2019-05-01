import { Criterio } from './Criterio';

export class Evidencia{
    constructor(evidencia:string="",criterios:Criterio[]=[]){
        this.evidencia=evidencia;
        this.criterios=criterios;
    }

    evidencia:string;
    criterios:Criterio[];
}