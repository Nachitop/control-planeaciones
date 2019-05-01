const express=require('express');
const router= express.Router();
const grupo= require('../controllers/grupo.controller')

router.post('/', grupo.createGrupo);
router.get('/:_id',grupo.getGrupo);
router.get('/',grupo.getGrupos);


module.exports=router;