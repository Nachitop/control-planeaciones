const mongoose=require('mongoose');
const {Schema}=mongoose;

const ActividadSchema=  new Schema({
    nombre:{type:String,required:true},
    de:{type:String,required:true}
});
module.exports=mongoose.model('Actividad',ActividadSchema);