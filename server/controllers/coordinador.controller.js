const coordinadorCtrl={};
const Coordinador=require('../models/coordinador');

coordinadorCtrl.createCoordinador=async(req,res)=>{
    try {
        const coordinador= new Coordinador({
            usuario:req.body.usuario,
            carrera: req.body.carrera,
        });
        await coordinador.save();
        res.status(200).json({message:"Coordinador guardado"});
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear el coordinador', error:error})
    }
}

coordinadorCtrl.updateCoordinador= async(req, res)=>{
    try {

        await Coordinador.findOneAndUpdate({_id:req.params._id},{$set:req.body},{$new:true});
        res.status(200).json({message:"Coordinador actualizado correctamente"});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar el coordinador', error:error})
    }
}

coordinadorCtrl.getCoordinador= async(req,res)=>{
    try {
        const coordinador= await Coordinador.findById(req.params._id);
        if(coordinador && coordinador!=null){
            res.status(200).json(coordinador);
        }else{
            res.status(400).json({message:"No se ha encontrado al coordinador"});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener al coordinador', error:error})
    }
}


coordinadorCtrl.getCoordinadorByUser= async(req,res)=>{
    try {
        const coordinador=await Coordinador.findOne({usuario:req.params._id}).populate('usuario').populate('carrera');
        if(coordinador && coordinador!=null){
            res.status(200).json(coordinador);
        }else{
            res.status(400).json({message:"No se ha encontrado al coordinador"});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener al coordinador', error:error})
    }
}

coordinadorCtrl.getCoordinadors=async(req,res)=>{
    try {
        const coordinadors= await Coordinador.find();
        if(coordinadors.length>0){
            res.status(200).json(coordinadors);
        }else{
            res.status(400).json({message:"No se han encontrado coordinadors"});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener los coordinadors', error:error})
    }
}
module.exports=coordinadorCtrl;