const mongoose= require('mongoose');
const {Schema}= mongoose;

const SemanaSchema= new Schema({
    nombre:{type:String,required:true},
    semestre:{type:String,required:true},
    inicio:{type:String,required:true},
    fin:{type:String,required:true}

});

module.exports= mongoose.model('Semana',SemanaSchema);