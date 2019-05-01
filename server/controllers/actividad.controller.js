const actividadCtrl={};
const Actividad= require("../models/actividad.js");

actividadCtrl.create=async(req,res)=>{
    try {
        const actividad= new Actividad({
            nombre:req.body.nombre,
            de:req.body.de
        });
      await  actividad.save();
    res.status(200).json({message:'Actividad guardada'});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear la actividad'});
    }
}

actividadCtrl.actualizar=async(req,res)=>{
    try {
        await Actividad.findByIdAndUpdate(req.body._id,{$set:req.body},{$new:true});
        res.status(200).json({message:'Actividad actualizada'});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar la actividad'});
    }
}
actividadCtrl.get=async(req,res)=>{
    try {
        const actividad = await Actividad.findById(req.params._id);
        if(actividad!=undefined && actividad!=null){
            res.status(200).json(actividad);
        }else{
            res.status(400).json({message:'No se encontró la facultad'});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener la actividad'});
    }
}

actividadCtrl.getS= async(req, res)=>{
    try {
       
        var actividades=[];
        const {de}=req.params;
     
        if(de){
            actividades= await Actividad.find({de:de});
        }else{
            actividades= await Actividad.find();
        }
     
        if(actividades.length>0){
            res.status(200).json(actividades);
        }
        else{
            res.status(400).json({message:'No se encontraron actividades'});
        }
         
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener las actividades'});
    }
}

module.exports=actividadCtrl;