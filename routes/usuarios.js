const { Router } = require('express');
const { check } = require('express-validator');
const { addUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios);
router.get('/:id', validarJWT, getUsuario);
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    addUsuario);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        check('google', 'Google es requerido').not().isEmpty(),
        check('facebook', 'fabook es requerido').not().isEmpty(),
        check('nativo', 'nativo es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateUsuario);
router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;