const peCtrl={};
const ProgramaEstudio=require('../models/programaEstudio');

peCtrl.create=async(req,res)=>{
    try {
        const pe= new ProgramaEstudio({
            materia: req.body.materia._id,
            areaAcademica: req.body.areaAcademica._id,
            proposito: req.body.proposito,
            saberes: req.body.saberes,
            competencia: req.body.competencia,
            unidadesRelacionadas:req.body.unidadesRelacionadas,
            actualizacion: req.body.actualizacion,
            elaboracion: req.body.elaboracion,
            actividadesDocente: req.body.actividadesDocente,
            actividadesEstudiante: req.body.actividadesEstudiante,
            contenidos: req.body.contenidos,
            evidencias:req.body.evidencias,
           
            bibliografias: req.body.bibliografias,
            perfil:req.body.perfil


        });

        await pe.save();
        res.status(200).json({message:'Programa de estudio creado'});

    } catch (error) {
        res.status(400).json({message:'Hubo pproblemas al crear el programa de estudio',error:error});
    }
}

peCtrl.actulizar= async(req,res)=>{
    try {

        await ProgramaEstudio.findByIdAndUpdate(req.body._id,{$set:req.body},{$new:true});
        res.status(200).json({message:'Programa de estudio actualizado'});
        
    } catch (error) {
        res.status(400).json({message:'Hubo pproblemas al actualizar el programa de estudio',error:error});
    }
}

peCtrl.get=async(req,res)=>{
    try {
            const {_id}=req.params;
        
          
       
           const  pe=await ProgramaEstudio.findById(_id).populate('materia').populate('areaAcademica')
            .populate('competencia').populate('unidadesRelacionadas').populate('actividadesDocente').populate('actividadesEstudiante');
          
       
      
        if(pe!=undefined && pe!=null){
            res.status(200).json(pe);
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el programa de estudio',error:error});
    }
}

peCtrl.getContenidos=async(req,res)=>{
    try {
        const _idMateria=req.query._idMateria;
 
        var temas=req.query.temas;
        if(temas===undefined){
         
            temas=[];
        }

  
     
        const pe=await ProgramaEstudio.findOne({materia:_idMateria},{contenidos:1,materia:1}).populate('materia').sort({_id:-1});
            temas.forEach((t)=>{

                if(pe){
                    pe.contenidos.forEach(c => {
                    
                        c.temas.forEach((t2,index,self)=>{
                       if(t2==t){
                           self.splice(index,1);
                       }
                            
                            
                        
                     
                        });
                    });
                }

            });
      
     
      
        //const contenidos=await ProgramaEstudio.findOne({materia:_idMateria,'contenidos.temas':{$nin:temas}},{contenidos:1,materia:1}).populate('materia').sort({_id:-1});
        
        
       res.status(200).json(pe);
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener los contenidos',error:error});
    }
}

peCtrl.getS= async(req, res)=>{
    try {

   const pes= await ProgramaEstudio.find({},{_id:1,materia:1,elaboracion:1,actualizacion:1}).populate('materia');
   if(pes.length>0){
       res.status(200).json(pes);
   }
   else{
       res.status(400).json({message:'No se encontraron programas de estudio'});
   }

        
    } catch (error) {
        res.status(400).json({message:'Hubo pproblemas al obtener los programas de estudio',error:error});
    }
}

module.exports=peCtrl;