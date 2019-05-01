const express=require('express');
const router= express.Router();
const coordinador= require('../controllers/coordinador.controller')

router.post('/', coordinador.createCoordinador);
router.put('/:_id',coordinador.updateCoordinador);
router.get('/:_id',coordinador.getCoordinador);
router.get('/',coordinador.getCoordinadors);


module.exports=router;