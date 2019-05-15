const avancesCtrl={};
const Avances=require("../models/avances");
const Semana= require("../models/semana");

avancesCtrl.create=async(req,res)=>{
    try {
        const avance = new Avances({
            alumno: req.body.alumno.usuario._id,
            grupo:req.body.grupo._id,
            programatico: req.body.programatico,
            fecha:req.body.fecha,
            semana:req.body.semana._id
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

avancesCtrl.getSemanasHechasPorSemestre=async(req,res)=>{
    try {
        //const {semestre}= req.params;
        const {_idGrupo}=req.params;
        const {_idAlumno}=req.params;
        //var semanasArray=[];
        const semanas= await Avances.find({grupo:_idGrupo,alumno:_idAlumno},{semana:1,_id:0});
       // const semanas= await Avances.find({"semana.semestre":semestre, alumno:_idAlumno},{"semana.nombre":1,_id:0});
   
        // semanas.forEach((semana)=>{
        //  semanasArray.push(semana.semana.nombre);
            
        // });

        res.status(200).json(semanas);
    } catch (error) {
        res.status(400).json({message:"Hubo problemas al obtener las semanas realizadas por el alumno",error:error});
    }
}

avancesCtrl.get=async(req,res)=>{
    try {

        const {_idSemana}=req.params;
        const {_idGrupo}=req.params;
        var avances=[];
        var population={};
        population['population1']={
            path:'alumno',
            model:'Usuario'
        };
        population['population2']={
            path:'grupo',
            model:'Grupo',
            populate:{
                path:'carrera',
                model:'Carrera'
            }
        };
        population['population3']={
            path:'programatico.materia',
            model:'Materia'
        };
        population['population4']={
            path:'programatico.profesor',
            model:'Profesor',
            populate:{
                path:'usuario',
                model:'Usuario'
            }
        };

        population['population5']={
            path:'semana',
            model:'Semana'
        };




        if(_idSemana!=undefined && _idGrupo){
             avances= await Avances.find({grupo:_idGrupo,semana:_idSemana}).populate(population['population1']).populate(population['population2']).populate(population['population3']).populate(population['population4']).populate(population['population5'])
        }else if(_idSemana!=undefined){
                avances= await Avances.find({semana:_idSemana}).populate(population['population1']).populate(population['population2']).populate(population['population3']).populate(population['population4']).populate(population['population5']);
        }
       
        res.status(200).json(avances);

    } catch (error) {
        res.status(400).json({message:"Hubo problemas al recuperar los avances programáticos"});
    }
}

module.exports=avancesCtrl;