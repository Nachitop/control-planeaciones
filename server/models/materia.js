const mongoose=require('mongoose');
const {Schema}=mongoose;

const MateriaSchema= new Schema({
    clave:{type:String,required:true, unique:true,index:true},
    nombre:{type:String,required:true},
    horas:{
        teoria:{type:Number,required:true},
        practica:{type:Number,required:true},
        autoestudio:{type:Number,required:true},
        creditos:{type:Number,required:true}
    }

    


    
  
});

module.exports= mongoose.model('Materia',MateriaSchema);