const aaCtrl={};
const AreaAcademica=require('../models/areaAcademica');

aaCtrl.create=async(req,res)=>{
    try {

        const aa= new AreaAcademica({
            nombre: req.body.nombre
           
        })

        await aa.save();
        res.status(200).json({message:'Área académica creada correctamente'});
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al crear el Área Académica', error:error});
    }
}

aaCtrl.update=async(req,res)=>{
    try {

        const aa= req.body;
        await AreaAcademica.findByIdAndUpdate(aa._id,{$set:aa},{$new:true});
        res.status(200).json({message:'Área académica actualizada correctamente'});
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al actualizar el área académica', error:error});
    }
}

aaCtrl.get=async(req,res)=>{
    try {
        const aa = await AreaAcademica.findById(req.params._id);
        if(aa!=undefined && aa!=null){
            res.status(200).json(aa);
        }else{
            res.status(400).json({message:'No se pudo encontrar el área académica'});
        }
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener el área académica', error:error});
    }
}

aaCtrl.getS=async(req,res)=>{
    try {
        //const {_idCarrera}= req.params;
        //var aas=[];
        //if(_idCarrera){
          //  aas= await AreaAcademica.find({carrera:_idCarrera});
        //}else{
          const  aas=await AreaAcademica.find();
        //}

        if(aas.length>0){
            res.status(200).json(aas);
        }else{
            res.status(400).json({message:'No se pudieron obtener las áreas académicas'})
        }
        
      
        
    } catch (error) {
        res.status(400).json({message:'Hubo problemas al obtener las áreas académicas', error:error});
    }
}
module.exports=aaCtrl;