const mongoose= require('mongoose');
const {Schema}=mongoose;

const CompetenciaSchema= new Schema({
    competencia:{type:String,required:true}
});

module.exports=mongoose.model('Competencia',CompetenciaSchema);