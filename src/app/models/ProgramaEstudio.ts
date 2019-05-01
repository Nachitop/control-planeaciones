import { Materia } from './Materia';
import { AreaAcademica } from './AreaAcademica';
import { Competencia } from './Competencia';
import { Responsable } from './Responsable';
import { Saberes } from './Saberes';
import { Actividad } from './Actividad';
import { Criterio } from './Criterio';
import { Bibliografia } from './Bibliografia';
import { Contenido } from './Contenido';
import { Evidencia } from './Evidencia';

export class ProgramaEstudio{
    constructor(
        _id:string="",
        materia:Materia= new Materia(),
        areaAcademica:AreaAcademica= new AreaAcademica(),
        proposito:String="",
        saberes:Saberes= new Saberes(),
        competencia:Competencia[]=[],
        unidadesRelacionadas:Materia[]=[],
        actualizacion:Responsable= new Responsable(),
        elaboracion:Responsable= new Responsable(),
        actividadesDocente:Actividad[]=[],
        actividadesEstudiante:Actividad[]=[],
        //contenidos:String[]=[],
        contenidos:Contenido[]=[],
        evidencias:Evidencia[]=[],
        //criterios:Criterio[]=[],
        bibliografias:Bibliografia[]=[],
        perfil:String=""
    ){
        this._id=_id;
        this.materia=materia;
        this.areaAcademica=areaAcademica;
        this.proposito=proposito;
        this.saberes=saberes;
        this.competencia=competencia;
        this.unidadesRelacionadas=unidadesRelacionadas;
        this.actualizacion=actualizacion;
        this.elaboracion=elaboracion;
        this.actividadesDocente=actividadesDocente;
        this.actividadesEstudiante=actividadesEstudiante;
        this.contenidos=contenidos;
        this.evidencias=evidencias;
       // this.criterios=criterios
        this.bibliografias=bibliografias;
        this.perfil=perfil;


    }
    _id:string;
    materia:Materia;
    areaAcademica:AreaAcademica;
    proposito:String;
    saberes:Saberes;
    competencia:Competencia[];
    unidadesRelacionadas:Materia[];
    elaboracion:Responsable;
    actualizacion:Responsable;
    contenidos:Contenido[];
    //contenidos:String[];
    actividadesDocente:Actividad[];
    actividadesEstudiante:Actividad[];
    evidencias:Evidencia[];
    //criterios:Criterio[];
    bibliografias:Bibliografia[];
    perfil:String;
}