const express=require('express');
const router= express.Router();
const materia= require('../controllers/materia.controller')

router.post('/', materia.createMateria);
router.put('/:_id',materia.updateMateria);
router.get('/:_id',materia.getMateria);
router.get('/',materia.getMaterias);


module.exports=router;