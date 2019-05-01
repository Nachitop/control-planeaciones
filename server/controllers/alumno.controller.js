const alumnoCtrl={};
const Alumno=require('../models/alumno');
const Usuario=require('../models/usuario');

alumnoCtrl.createAlumno=async(req,res)=>{
    try {
        const usuario= await Usuario.findOne({matricula:req.body.usuario.matricula});
        
        if(usuario){
        const alumno= new Alumno({
            usuario:usuario._id,
            grupo: req.body.grupo._id
        });
        await alumno.save();
        res.status(200).json({message:"Alumno guardado"});
    }else{
        res.status(400).json({message:"Matrícula proporcionada no se encuentra en la bd"});
    }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear el alumno', error:error})
    }
}

alumnoCtrl.updateAlumno= async(req, res)=>{
    try {

        await Alumno.findOneAndUpdate({_id:req.params._id},{$set:req.body},{$new:true});
        res.status(200).json({message:"Alumno actualizado correctamente"});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar el alumno', error:error})
    }
}

alumnoCtrl.getAlumno= async(req,res)=>{
    try {
        const alumno= await Alumno.findOne({usuario:req.params._id}).populate('usuario').populate('grupo');
        if(alumno && alumno!=null){
            res.status(200).json(alumno);
        }else{
            res.status(400).json({message:"No se ha encontrado al alumno"});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener al alumno', error:error})
    }
}
alumnoCtrl.getAlumnos=async(req,res)=>{
    try {
        const alumnos= await Alumno.find().populate('usuario').populate({path: 'grupo',
            populate:{
                path:'carrera',
                model: 'Carrera'
            }
    });
        if(alumnos.length>0){
            res.status(200).json(alumnos);
        }else{
            res.status(400).json({message:"No se han encontrado alumnos"});
        }
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener los alumnos', error:error})
    }
}
module.exports=alumnoCtrl;