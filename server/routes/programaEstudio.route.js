const express= require('express');
const router=express.Router();
const ProgramaEstudio=require('../controllers/programaEstudio.controller.js');

router.post('/',ProgramaEstudio.create);
router.put('/', ProgramaEstudio.actulizar);
router.get('/',ProgramaEstudio.getS);
router.get('/contenidos',ProgramaEstudio.getContenidos);
router.get('/:_id',ProgramaEstudio.get);



module.exports=router;