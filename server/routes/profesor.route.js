const express=require('express');
const router= express.Router();
const profesor= require('../controllers/profesor.controller')

router.post('/', profesor.createProfesor);
router.put('/:_id',profesor.updateProfesor);
router.get('/:_id',profesor.getProfesor);
router.get('/',profesor.getProfesores);
router.delete('/:_id',profesor.deleteProfesor);


module.exports=router;