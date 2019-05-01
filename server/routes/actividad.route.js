const express= require('express');
const router=express.Router();
const actividad=require('../controllers/actividad.controller');

router.post('/',actividad.create);
router.put('/', actividad.actualizar);
router.get('/all/:de?',actividad.getS);
router.get('/:_id',actividad.get);


module.exports=router;