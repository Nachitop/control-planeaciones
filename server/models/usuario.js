const mongoose=require('mongoose');
const {Schema}=mongoose;

const UsuarioSchema=new Schema({
    matricula:{type:String,required:true},
    nombre:{type:String,required:true},
    apellido:{type:String,required:true}, 
    fecha_registro:{type:Date,required:true},
    password:{type:String,required:true},
    status:{type:String,required:true}
});

module.exports= mongoose.model('Usuario',UsuarioSchema);