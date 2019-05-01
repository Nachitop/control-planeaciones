const mongoose=require('mongoose');
const {Schema}=mongoose;

const PlanSchema= new Schema({

    carrera:{type:Schema.Types.ObjectId, ref:'Carrera'},
    periodo:{type:String,required:true},
    forma:{type:String,required:true},
    materias:[{

        forma:{type:String},
        materias:[{
            index:{type:Number},
            materia:{type:Schema.Types.ObjectId,ref:'Materia'}
        }]

    }],

});

module.exports=mongoose.model('Plan',PlanSchema);