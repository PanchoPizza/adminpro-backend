const { Router } = require('express');
const { check } = require('express-validator');
const { getMaterias, getMateria, addMateria, updateMateria, deleteMateria } = require('../bml/controllers/materias');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getMaterias);
router.get('/:id', validarJWT, getMateria);
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'horas es requerido').not().isEmpty(),
        check('horasP', 'horasP es requerido').not().isEmpty(),
        check('horasT', 'horasT es requerido').not().isEmpty(),
        check('creditos', 'creditos es requerido').not().isEmpty(),
        validarCampos,
    ],
    addMateria);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'horas es requerido').not().isEmpty(),
        check('horasP', 'horasP es requerido').not().isEmpty(),
        check('horasT', 'horasT es requerido').not().isEmpty(),
        check('creditos', 'creditos es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateMateria);
router.delete('/:id', validarJWT, deleteMateria);

module.exports = router;