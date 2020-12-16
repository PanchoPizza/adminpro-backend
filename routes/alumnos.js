const { Router } = require('express');
const { check } = require('express-validator');
const { getAlumnos, getAlumno, addAlumno, updateAlumno, deleteAlumno } = require('../bml/controllers/alumnos');

const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');



const router = Router();

router.get('/', validarJWT, getAlumnos);
router.get('/:id', validarJWT, getAlumno);
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('sexo', 'sexo es requerido').not().isEmpty(),
        check('carrera', 'carrera es requerido').not().isEmpty(),
        validarCampos,
    ],
    addAlumno);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'edad es requerido').not().isEmpty(),
        check('sexo', 'sexo es requerido').not().isEmpty(),
        check('carrera', 'carrera es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateAlumno);
router.delete('/:id', validarJWT, deleteAlumno);

module.exports = router;