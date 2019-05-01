const mongoose= require('mongoose');
const {Schema}= mongoose;

const AreaAcademicaSchema= new Schema({
    nombre:{type:String,required:true},
    // carrera:{type:Schema.Types.ObjectId,ref:'Carrera'}
});

module.exports=mongoose.model('AreaAcademica',AreaAcademicaSchema)