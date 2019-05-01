const express= require("express");
const router= express.Router();
const horario= require("../controllers/horario.controller");

router.post('/',horario.create);
router.put('/:_id',horario.update);
router.get('/:_id',horario.getHorario);
router.get('/',horario.getHorarios);
router.delete('/:_id',horario.deleteHorario);
router.get('/grupo/:_idGrupo',horario.getHorarioPorAlumnoGrupo);

module.exports=router;