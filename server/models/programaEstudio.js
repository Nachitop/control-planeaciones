const mongoose=require('mongoose');
const {Schema}=mongoose;

const ProgramaEstudio= new Schema({
    materia:{type:Schema.Types.ObjectId,ref:'Materia',required:true},
    areaAcademica:{type:Schema.Types.ObjectId,ref:'AreaAcademica', required:true},
    proposito:{type:String,required:true},
    saberes:{
        teoricos:{type:String,required:true},
        practicos:{type:String,required:true},
        actitudinales:{type:String,required:true}
    },


    competencia:[{type:Schema.Types.ObjectId,ref:'Competencia'}],
    unidadesRelacionadas:[{type:Schema.Types.ObjectId,ref:'Materia'}],
    
        elaboracion:{
            nombre:{type:String},
            fecha:{type:String}
        },
        actualizacion:{
            nombre:{type:String},
            fecha:{type:String}
        },

        actividadesDocente:[{type:Schema.Types.ObjectId,ref:'Actividad'}],
        actividadesEstudiante:[{type:Schema.Types.ObjectId,ref:'Actividad'}],

    contenidos:[{
        unidad:{type:String},
        temas:[{type:String}]
    }
        
    ],
    evidencias:[{
        evidencia:{type:String},
        criterios:[{
            criterio:{type:String},
            porcentaje:{type:Number}
        }]
    }
    ],


    bibliografias:[{
        autor:{type:String},
        titulo:{type:String},
        editorial:{type:String},
        ano:{type:String},
        url:{type:String},
    }],

    perfil:{type:String,required:true}


       

  
});

module.exports= mongoose.model('ProgramaEstudio',ProgramaEstudio);