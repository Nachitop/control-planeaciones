const express=require('express');
const router= express.Router();
const plan= require('../controllers/plan.controller')

router.post('/', plan.createPlan);
 router.delete('/:_id',plan.deletePlan);
 router.get('/:_id',plan.getPlan);
 router.get('/',plan.getPlanes);


module.exports=router;