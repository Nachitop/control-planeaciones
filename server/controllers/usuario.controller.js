const usuarioCtrl={};
const Usuario= require('../models/usuario');
const Coordinador=require('../models/coordinador');
const Alumno=require('../models/alumno');
const Profesor=require('../models/profesor');
const bcrypt= require('bcrypt');

usuarioCtrl.create=async(req,res)=>{
    try {
        console.log(req.body)
        const usuario= new Usuario({
            matricula: req.body.matricula,
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            fecha_registro:  Date.now(),
            password: bcrypt.hashSync('1234',4),
            status:req.body.status,
        });
       
        await usuario.save();
        res.status(200).json({message:"Usuario creado con exito!"});
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al crear el usuario", error:error})
    }
}

usuarioCtrl.update=async(req,res)=>{
    try {
        const {_id}=req.params;
        const usuario=req.body;
        await Usuario.findOneAndUpdate({_id:_id},{$set:usuario},{$new:true});
        res.status(200).json({message:"Usuario actualizado correctamente!"}) 
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al actualizar al usuario", error:error})
    }
}

usuarioCtrl.getUsuarios=async(req,res)=>{
    try {
        const usuarios= await Usuario.find({},{password:0}).sort('-fecha_registro');
        if(usuarios.length>0){
            res.status(200).json(usuarios);
        }else{
            res.status(400).json({message:"No se encontró ningún usuario"})
        }
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al recuperar los usuarios", error:error})
    }
}

usuarioCtrl.getUsuario=async(req,res)=>{
    try {
        const usuario= await Usuario.findById(req.params._id);
        if(usuario && usuario!=null){
        res.status(200).json(usuario);
        }else{
            res.status(400).json({message:"No se ha encontrado el usuario"})
        }
        
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al recuperar el usuario", error:error})
    }
}

usuarioCtrl.validarMatricula=async(req,res)=>{
    try {
        var existe=0;
        const usuario= await Usuario.findOne({matricula:req.params.matricula});
        if(usuario && usuario!=null){
            existe=1;
        }else{
            existe=0;
        }
        res.status(200).json(existe);
        
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al validar la matrícula"})
    }
}

usuarioCtrl.login=async(req,res)=>{
    try {
      
        const usuario=await Usuario.findOne({matricula:req.body.matricula});
       
        if(usuario && usuario!=null){
            if(usuario.status=="Activo"){
           
                bcrypt.compare(req.body.password,usuario.password,async function comparar(err,result){
                    if(err){
                        res.status(400).json({message:"Hubo problemas al decifrar la contraseña",error:error})
                    }
                    else{

                    
          
                        if(result==true){
                           
                          
                            res.status(200).json(usuario);
                            
                        }else{
                            res.status(400).json({message:"Contraseña incorrecta"});
                        }
                }
                 
                });

            }else{
                res.status(400).json({message:"Usuario inactivo"}) 
            }

        }else{
            res.status(400).json({message:"No se ha encontrado el usuario"}) 
        }
        
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al iniciar sesión"})
    }
}

usuarioCtrl.tipoUsuario=async(req,res)=>{
    try {
        var tipo;
        const coordinador = await Coordinador.findOne({usuario:req.params._id});
        if (coordinador == null || !coordinador) {
            const profesor = await Profesor.findOne({usuario:req.params._id});
            if (!profesor || profesor == null) {
                const alumno = await Alumno.findOne({usuario:req.params._id});
                if (!alumno || alumno == null) {
                    res.status(400).json({ message: "No se hizo match de usuario" })
                } else {
                    tipo = "Alumno"
                }
            } else {
                tipo = "Profesor";
            }
        } else {
            tipo = "Coordinador";
        }

        res.status(200).json({tipo: tipo })
        
    } catch (error) {
        res.status(400).json({ message: "Hubo problemas al identificar el tipo de usuario" })
    }
}

module.exports= usuarioCtrl;