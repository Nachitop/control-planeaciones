export class Horas{
    constructor(practica:number=0,teoria:number=0,autoestudio:number=0,creditos:number=0){
        this.practica=practica;
        this.teoria=teoria;
        this.autoestudio=autoestudio;
        this.creditos=creditos
    }
    practica:number;
    teoria:number;
    autoestudio:number;
    creditos:number;


    totalHoras():number{
        return this.practica+this.teoria+this.autoestudio;
    }
}