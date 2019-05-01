const grupoCtrl={};
const Grupo= require('../models/grupo');

grupoCtrl.createGrupo=async(req,res)=>{
    try {
        const grupo = new Grupo({
            grupo: req.body.grupo,
            carrera: req.body.carrera._id
        });

        await grupo.save();
        res.status(200).json({message:'Grupo guardado'})
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear el grupo', error:error})
    }
}

grupoCtrl.getGrupo=async(req,res)=>{
    try {
        const grupo= await Grupo.findById(req.params._id);
        if(grupo && grupo!=null){
            res.status(200).json(grupo);
        }else{
            res.status(400).json({message:'No se encontró el grupo', error:error})
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el grupo', error:error})
    }
}
grupoCtrl.getGrupos=async(req,res)=>{
    try {
        const grupos= await Grupo.find().populate('carrera');
        if(grupos.length>0){
            res.status(200).json(grupos);
        }else{
            res.status(400).json({message:"No se encontraron grupos"})
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener los grupos', error:error})
    }
}

module.exports=grupoCtrl;