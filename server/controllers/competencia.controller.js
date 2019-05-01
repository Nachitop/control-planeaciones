const competenciaCtrl={};
const Competencia= require('../models/competencia');

competenciaCtrl.create=async(req,res)=>{
    try {
        const competencia= new Competencia({
            competencia: req.body.competencia
        });

        await competencia.save();
        res.status(200).json({message:'Competencia creada'});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear la competencia', error:error})
    }
}

competenciaCtrl.update=async(req,res)=>{
    try {
        const competencia= req.body;
        await Competencia.findByIdAndUpdate(competencia._id,{$set:competencia},{$new:true});
        res.status(200).json({message:'Competencia actualizada'});
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar la competencia', error:error})
    }
}

competenciaCtrl.get=async(req,res)=>{
    try {
        const competencia= await Competencia.findById(req.params._id);
        res.status(200).json(competencia);
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener la competencia', error:error})
    }
}

competenciaCtrl.getS=async(req,res)=>{
    try {
        const competencias= await Competencia.find();
        if(competencias.length>0){
            res.status(200).json(competencias);
        }else{
            res.status(400).json({message:'No se encontraron competencias'})
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener las competencias', error:error})
    }
}
module.exports=competenciaCtrl;