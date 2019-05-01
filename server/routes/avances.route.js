const express= require("express");
const router= express.Router();
const avances= require("../controllers/avances.controller");

router.post('/',avances.create);
router.get('/obtener/temas/:_idAlumno/:_idGrupo/:_idMateria',avances.getTemas);
router.get('/fecha/:_idAlumno/:_idGrupo',avances.getUltimoAvanceFecha);


module.exports=router;