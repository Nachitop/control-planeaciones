const express=require('express');
const router= express.Router();
const carrera= require('../controllers/carrera.controller')

router.post('/', carrera.createCarrera);
router.put('/:_id',carrera.updateCarrera);
router.get('/:_id',carrera.getCarrera);
router.get('/',carrera.getCarreras);
router.delete('/:_id',carrera.deleteCarrera)

module.exports=router;