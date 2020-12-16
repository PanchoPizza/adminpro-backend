const { Router } = require('express');
const { check } = require('express-validator');
const { addDocente, getDocente, getDocentes, updateDocente, deleteDocente } = require('../bml/controllers/docentes');

const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');



const router = Router();

router.get('/', validarJWT, getDocentes);
router.get('/:id', validarJWT, getDocente);
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('titulo', 'titulo es requerido').not().isEmpty(),
        check('tipo', 'tipo es requerido').not().isEmpty(),
        validarCampos,
    ],
    addDocente);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('titulo', 'titulo es requerido').not().isEmpty(),
        check('tipo', 'tipo es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateDocente);
router.delete('/:id', validarJWT, deleteDocente);

module.exports = router;