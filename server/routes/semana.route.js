const express= require('express');
const router=express.Router();
const semana= require('../controllers/semana.controller');

router.post('/',semana.create);
router.get('/:semestre?', semana.getS);
router.put('/:_id',semana.update);
router.delete('/:_id',semana.delete);

module.exports=router;