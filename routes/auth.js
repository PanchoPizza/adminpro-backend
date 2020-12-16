//Ruta: api/login   
const { Router } = require('express');
const { login, googleSignIn, loginToken, resetPassword } = require('../bml/controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWTlogin } = require('../bml/middlewares/validar-jwt');
const router = Router();
router.post('/', [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    login);
router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);
router.post("/renew", [
    check("token", "El token es obligatorio").not().isEmpty(),
    validarCampos, validarJWTlogin
], loginToken);

router.post("/resetpassword", [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos
], resetPassword);


module.exports = router;