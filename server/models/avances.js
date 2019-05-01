const mongoose=require('mongoose');
const {Schema}=mongoose;

const AvancesSchema= new Schema({
    alumno:{type:Schema.Types.ObjectId, ref:'Usuario'},
    grupo:{type:Schema.Types.ObjectId,ref:'Grupo'},
    programatico:[{
        materia:{type:Schema.Types.ObjectId,ref:'Materia'},
        profesor:{type:Schema.Types.ObjectId,ref:'Profesor'},
        dias:[],
        temas:[]
    }],
    fecha:{type:Date,required:true}
});

module.exports=mongoose.model('Avances', AvancesSchema)