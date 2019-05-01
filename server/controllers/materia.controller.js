const materiaCtrl={};
const Materia=require('../models/materia');

materiaCtrl.createMateria=async(req,res)=>{
    try {
        const materia= new Materia({
            clave: req.body.clave,
            nombre:req.body.nombre,
            horas:req.body.horas,
           
        });
        await materia.save();
        res.status(200).json({message:"Materia guardada"});
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear la materia', error:error})
    }
}

materiaCtrl.updateMateria=async(req,res)=>{
    try {

       
        await Materia.findOneAndUpdate({_id:req.params._id},{$set:req.body},{$new:true});
        res.status(200).json({message:"Materia actualizada correctamente"});
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar la materia', error:error})
    }
}

materiaCtrl.getMateria=async(req,res)=>{
    try {
        const materia= await Materia.findById(req.params._id);
        if(materia && materia!=null){
            res.status(200).json(materia);
        }else{
            res.status(400).json({message:"No se encontró la materia"})
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener la materia', error:error})
    }
}

materiaCtrl.getMaterias=async(req,res)=>{
    try {
        const materias= await Materia.find();
        if(materias.length>0){
            res.status(200).json(materias);
        }
        else{
            res.status(400).json({message:"No se han encontrado materias"});
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener las materias', error:error})
    }
}
module.exports=materiaCtrl;