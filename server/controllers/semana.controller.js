const semanaCtrl={};
const Semana= require('../models/semana');


semanaCtrl.create= async(req,res)=>{
    try {
        const semana= new Semana({
            nombre: req.body.nombre,
            semestre: req.body.semestre,
            inicio: req.body.inicio,
            fin: req.body.fin
        });

        await semana.save();
        res.status(200).json({message:"Semana guardada"});
    } catch (error) {
        res.status(400).json({message:"Problemas al crear la semana", error:error});
    }
}

semanaCtrl.update=async(req,res)=>{
    try {

        await Semana.findByIdAndUpdate(req.body._id,{$set:req.body},{$new:true});
        res.status(200).json({message:"Semana actualizada"});
    } catch (error) {
        res.status(400).json({message:"Problemas al actualizar la semana", error:error});
    }
}

semanaCtrl.delete=async(req,res)=>{
    try {

        await Semana.findByIdAndDelete(req.params._id);
        res.status(200).json({message:"Semana eliminada"});
    } catch (error) {
        res.status(400).json({message:"Problemas al eliminar la semana", error:error});
    }
}


semanaCtrl.getS=async (req,res)=>{
    try{
        const {semestre2}=req.params;
        var semanas=[];
        if(semestre2){
            semanas= await Semana.find({semestre:semestre2});
        }else{
            semanas= await Semana.find();
        }
        console.log(semanas);
        res.status(200).json(semanas);
    }
    catch(error){
        res.status(400).json({message:"Problemas al obtener las semanas", error:error});
    }
}






module.exports=semanaCtrl;