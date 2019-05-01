const planCtrl={};
const Plan=require('../models/plan');

planCtrl.createPlan=async(req,res)=>{
    try {
        const plan= new Plan({
            carrera:req.body.carrera._id,
            periodo:req.body.periodo,
            forma:req.body.forma,
            materias:req.body.materias
        });
        await plan.save();
        res.status(200).json({message:"Plan de estudios guardado"});
    } catch (error) {
        res.status(400).json({message:"Problemas al guardar plan de estudios",error:error})
    }
}

planCtrl.getPlan= async(req,res)=>{
    try {

        const plan= await Plan.findById(req.params._id).populate('carrera').populate('materias.materias.materia');
        console.log(plan);
        if(plan && plan!=null){
            res.status(200).json(plan)
        }else{
            res.status(400).json({message:"No se ha encontrado el plan de estudios"});
        }
        
    } catch (error) {
        res.status(400).json({message:"Problemas al obtener plan de estudios", error:error})
    }
}

planCtrl.getPlanes= async(req,res)=>{
    try {

        const planes= await Plan.find({},{materias:0}).populate('carrera');
    
        if(planes.length>0){
            res.status(200).json(planes);

        }else{
            res.status(400).json({message:"No se encontraron planes de estudio"})
        }
        
    } catch (error) {
        res.status(400).json({message:"Problemas al obtener los planes de estudio", error:error})
    }
}
planCtrl.deletePlan=async(req,res)=>{
    try {

        const planEliminado=await Plan.findByIdAndDelete(req.params._id);
        console.log(planEliminado);
        res.status(200).json({message:"Plan de estudio eliminado"});
        
    } catch (error) {
        res.status(400).json({message:"Problemas al eliminar el plan de estudio", error:error});
    }
}


module.exports=planCtrl;