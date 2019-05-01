const mongoose= require("mongoose");
const {Schema}= mongoose;


const HorarioSchema= new Schema({
    grupo:{type: Schema.Types.ObjectId,ref:'Grupo'},
    plan:{type:Schema.Types.ObjectId,ref:'Plan'},
    horario:[{
        profesor:{type:Schema.Types.ObjectId,ref:'Profesor'},
        materia:{type:Schema.Types.ObjectId,ref:'Materia'},
        esquema:[{
            dia:{type:String},
            inicio:{type:String},
            fin:{type:String}
        }],
       
    }],
    fecha:{type:Date,required:true}
});

module.exports= mongoose.model("Horario",HorarioSchema);