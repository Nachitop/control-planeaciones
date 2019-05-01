const express=require('express');
const router= express.Router();
const usuario= require('../controllers/usuario.controller')

router.post('/', usuario.create);
router.put('/:_id',usuario.update);
router.get('/',usuario.getUsuarios);
router.get('/:_id',usuario.getUsuario);

router.get('/validar/:matricula',usuario.validarMatricula)
router.post('/login',usuario.login);
router.get('/tipo/:_id',usuario.tipoUsuario)

module.exports=router;