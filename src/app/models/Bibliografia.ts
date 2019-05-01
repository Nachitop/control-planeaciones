export class Bibliografia{
    constructor(
        autor:string="",
        titulo:string="",
        editorial:string="",
        ano:string="",
        url:string="",

    ){
        this.autor=autor;
        this.titulo=titulo;
        this.editorial=editorial;
        this.ano=ano;
        this.url=url;
    }

    autor:string;
    titulo:string;
    editorial:string;
    ano:string;
    url:string;
}