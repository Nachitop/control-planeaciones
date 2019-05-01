const mongoose=require('mongoose');
const {Schema}= mongoose;

const GrupoSchema= new Schema({
    grupo:{type:Number,required:true},
    carrera:{type:Schema.Types.ObjectId,ref:'Carrera'}
});

module.exports=mongoose.model('Grupo', GrupoSchema);