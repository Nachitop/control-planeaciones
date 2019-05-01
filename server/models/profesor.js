const mongoose= require('mongoose');
const {Schema}= mongoose;

const ProfesorSchema= new Schema({
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    // plan:[{
    //     type: Schema.Types.ObjectId,ref:'Plan'
    // }],
    // grupo:[{type:Schema.Types.ObjectId,ref:'Grupo'}]
});

module.exports=mongoose.model('Profesor', ProfesorSchema);