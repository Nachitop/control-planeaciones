const avancesCtrl={};
const Avances=require("../models/avances");

avancesCtrl.create=async(req,res)=>{
    try {
        const avance = new Avances({
            alumno: req.body.alumno.usuario._id,
            grupo:req.body.grupo._id,
            programatico: req.body.programatico,
            fecha:req.body.fecha
        });
        await avance.save();
        res.status(200).json({message:"Avance programático creado"});
    } catch (error) {
        res.status(400).json({message:"Hubo error al crear el avance programático", error:error})
    }
}

avancesCtrl.getTemas=async(req,res)=>{
    try {
        
        const avances= await Avances.find({alumno:req.params._idAlumno,grupo:req.params._idGrupo},{'programatico':1});
        var temas=[];
        if(avances.length>0){
           
            avances.forEach((avance)=>{
        
                avance.programatico.forEach((p)=>{
                 
                    if(p.materia==req.params._idMateria){
                  
                        p.temas.forEach((t)=>{
                            temas.push(t);
                           
                        });
                    }
                });
            });
        }
       // const temas= await Avances.find({alumno:req.params._idAlumno,grupo:req.params._idGrupo,'programatico.materia':req.params._idMateria},{'programatico.temas':1});
  

        res.status(200).json(temas);
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al obtener los temas del avance programático",error:error});
    }
}

avancesCtrl.getUltimoAvanceFecha=async(req,res)=>{
    try {
        const fecha= await Avances.findOne({alumno:req.params._idAlumno, grupo: req.params._idGrupo},{fecha:1}).sort({_id:-1});
        if(fecha!=undefined && fecha!=null){
            res.status(200).json(fecha);
        }
        else{
            res.status(200).json(null);
        }
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al obtener el avance programático",error:error});
    }
}

module.exports=avancesCtrl;