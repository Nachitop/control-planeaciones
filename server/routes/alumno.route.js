const express=require('express');
const router= express.Router();
const alumno= require('../controllers/alumno.controller')

router.post('/', alumno.createAlumno);
router.put('/:_id',alumno.updateAlumno);
router.get('/:_id',alumno.getAlumno);
router.get('/',alumno.getAlumnos);


module.exports=router;