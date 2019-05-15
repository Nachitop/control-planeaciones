const express= require("express");
const router= express.Router();
const avances= require("../controllers/avances.controller");

router.post('/',avances.create);
router.get('/obtener/temas/:_idAlumno/:_idGrupo/:_idMateria',avances.getTemas);
router.get('/fecha/:_idAlumno/:_idGrupo',avances.getUltimoAvanceFecha);
router.get('/semanas/:_idGrupo/:_idAlumno',avances.getSemanasHechasPorSemestre);
router.get('/:_idSemana/:_idGrupo?',avances.get);


module.exports=router;