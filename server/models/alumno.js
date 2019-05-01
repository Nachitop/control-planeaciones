const mongoose= require('mongoose');
const {Schema}= mongoose;

const AlumnoSchema= new Schema({
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'},
    grupo:{type: Schema.Types.ObjectId,ref:'Grupo'},

});

module.exports= mongoose.model('Alumno',AlumnoSchema);