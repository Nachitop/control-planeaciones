const horarioCtrl={};
const Horario= require("../models/horario");

horarioCtrl.create= async(req,res)=>{
   try {
    const horario = new Horario({
        grupo: req.body.grupo._id,
        plan: req.body.plan._id,
        horario: req.body.horario,
        fecha: new Date(),
    });

 
    await horario.save();
    res.status(200).json({message:"Horario creado con exito!"});
       
   } catch (error) {
       res.status(400).json({message:'Hubo un error en el servidor al crear el horario', error:error});
   }
 
}

horarioCtrl.update= async(req,res)=>{
    try {
        
        await Horario.findByIdAndUpdate(req.params._id,{$set:req.body},{$new:true});
        res.status(200).json({message:"Horario Actualizado con exito!"});

    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar el horario', error:error})
    }
}

horarioCtrl.getHorario= async(req,res)=>{
    try {

        const horario= await Horario.findById(req.params._id).populate('grupo').populate('plan').populate({
            path:'horario.materia',
            model:'Materia'
        })
        .populate({
            path:'horario.profesor',
            model:'Profesor',
            populate:{
                path:'usuario',
                model:'Usuario'
            }
        });
    
        if(horario || horario!=undefined || horario!=null){
            res.status(200).json(horario);
        }else{
            res.status(400).json({message:"No se ha encontrado el horario"});
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el horario', error:error})
    }
}

horarioCtrl.getHorarios= async(req,res)=>{
    try {

        const horarios= await Horario.find({}, {horario:0}).populate({
            path:'grupo',
            model:'Grupo',
            populate:{
                path:'carrera',
                model:'Carrera',
                select:{'status':0},
            },
               
            
        }).populate('plan');
        if(horarios.length>0){
            res.status(200).json(horarios);
        }else{
            res.status(400).json({message:"No se ha encontrado los horarios"});
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el horario', error:error})
    }
}

horarioCtrl.deleteHorario=async(req,res)=>{
    try {

        await Horario.findByIdAndDelete(req.params._id);
        res.status(200).json({message:"Horario eliminado!"});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al eliminar el horario', error:error})
    }
}

horarioCtrl.getHorarioPorAlumnoGrupo=async(req,res)=>{
    try {
        const horario=await Horario.findOne({grupo:req.params._idGrupo},{plan:1}).sort({_id:-1}).populate({
            path:'grupo',
            model:'Grupo',
            populate:{
                path:'carrera',
                model:'Carrera'
            }
        }).populate({
            path:'horario.profesor',
            model:'Profesor',
            populate:{
                path:'usuario',
                model:'Usuario',
                select:{'_id':1,'nombre':1,'apellido':1}
            }
        }).populate({
            path:'horario.materia',
            model:'Materia',
            select:{'horas':0,'clave':0}
        }).populate(
        'plan');
      
        if(horario!=undefined && horario!=null){
            res.status(200).json(horario);
        }else{
            res.status(400).json({message:'No se puedo obtener el horario'})
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el horario por alumno', error:error})
    }
}


module.exports=horarioCtrl;