const express= require('express');
const router=express.Router();
const competencia=require('../controllers/competencia.controller');

router.post('/',competencia.create);
router.put('/', competencia.update);
router.get('/:_id',competencia.get);
router.get('/',competencia.getS)

module.exports=router;