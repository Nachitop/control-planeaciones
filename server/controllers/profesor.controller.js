const profesorCtrl={};
const Profesor=require('../models/profesor');
const Usuario=require('../models/usuario');

profesorCtrl.createProfesor=async(req,res)=>{
    try {
        console.log(req.body);
        const usuario= await Usuario.findOne({matricula:req.body.usuario.matricula});
        if(usuario){
            const profesor= new Profesor({
                usuario:usuario._id,
                plan: req.body.plan,
                grupo: req.body.grupo
            });
            await profesor.save();
        res.status(200).json({message:"Profesor guardado"});
        }
        else{
            res.status(400).json({message:'El usuario no se encuentra en nuestra bd'})  
        }
   
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crea al profesor', error:error})
    }
}

profesorCtrl.updateProfesor=async(req,res)=>{
    try {
        await Profesor.findOneAndUpdate({_id:req.params._id},{$set:req.body}, {$new:true});
        res.status(200).json({message:"Profesor actualizado"});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar el profesor', error:error})
    }
}

profesorCtrl.deleteProfesor=async(req,res)=>{
    try {
        await Profesor.findOneAndDelete(req.params._id);
        res.status(200).json({message:"Profesor eliminado"});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al eliminar al profesor', error:error})
    }
}

profesorCtrl.getProfesor=async(req,res)=>{
    try {
        
        const profesor= await Profesor.findById(req.params._id).populate('usuario');
        if(profesor && profesor!=null){
            res.status(200).json(profesor)
        }else{
            res.status(400).json({message:'No se encontró el profesor'})
        }

    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener al profesor', error:error})
    }
}

profesorCtrl.getProfesores=async(req,res)=>{
    try {
        const profesores= await Profesor.find().populate('usuario');
        
        // const profesores= await Profesor.find().populate('usuario').populate({
        //     path:'grupo',
        //     model:'Grupo',
        //     populate:{
        //         path: 'carrera',
        //         model:'Carrera',
        //         select:{'_id':1,'nombre':1},
        //     },
         
        // }).populate({
        //     path:'plan',
        //     model:'Plan',
        //     select:{'_id':1,'carrera':1,'periodo':1,'forma':1},
        //     populate:{
        //         path:'carrera',
        //         model:'Carrera',
        //         select:{'_id':1,'nombre':1},
        //     }
        // });
        if(profesores.length>0){
            res.status(200).json(profesores)
        }else{
            res.status(400).json({message:'No se encontraron profesores'})
        }

    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener los profesores', error:error})
    }
}


module.exports=profesorCtrl;