const mongoose=require('mongoose');
const {Schema}=mongoose;

const CarreraSchema= new Schema({
    nombre:{type:String,required:true},
    facultad:{type:String,required:true},
    status:{type:String,required:true}
});
module.exports=mongoose.model('Carrera',CarreraSchema);