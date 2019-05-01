const mongoose= require('mongoose');
const {Schema}= mongoose;

const CoordinadorSchema= new Schema({
    usuario:{type: Schema.Types.ObjectId, ref:'Usuario'},
    carrera:{type: Schema.Types.ObjectId,ref:'Carrera'},
 
});

module.exports= mongoose.model('Coordinador',CoordinadorSchema);