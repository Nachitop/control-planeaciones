const express= require('express');
const router=express.Router();
const aa=require('../controllers/areaAcademica.controller');

router.post('/',aa.create);
router.put('/', aa.update);
router.get('/:_id',aa.get);
router.get('/',aa.getS)

module.exports=router;