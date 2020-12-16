const { response } = require('express');
const bcrypt = require('bcryptjs');


const { generateJWT, idToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
        const { email, password } = req.body;
        let usuario = null;

        const sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);

        if (!usuario) {
            res.status(400).json({
                status: false,
                message: "email no encontradado"
            });
        }

        const validaPasword = bcrypt.compareSync(password, usuario.password);

        if (!validaPasword) {
            return res.status(400).json({
                status: false,
                message: 'Contraseña incorrecta'
            });
        }

        const token = await generateJWT(usuario.idUsuario);
        res.status(201).json({
            status: true,
            message: 'acceso correcto',
            data: token
        });
    }
    /* try {

         sql.on('error', err => {
             console.log(err);
             res.json({
                 ok: false,
                 error: err
             });
         });
         //AGREGAR EL USUARIO
         await sql.connect(conString).then(pool => {
             return pool.request()
                 .input('email', email)


             .execute('stp_usuarios_login');
         }).then(result => {
             usuario = result.recordset[0];


         }).catch(err => {
             usuario = null;
         });
         if (!usuario) {
             return res.status(400).json({
                 ok: false,
                 msg: "email no encontradado"
             });
         }
         const validaPasword = bcrypt.compareSync(password, usuario.password);

         if (!validaPasword) {
             return res.status(400).json({
                 ok: false,
                 msg: "Contraseña incorrecta"
             });
         }
         const token = await generateJWT(usuario.idUsuario);
         res.json({
             ok: true,
             token: token
         });

     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok: false,
             msg: "Que paso ahi, estamos agarrando señal"
         });

     }*/

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken)
        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);


        //Verificar si existe en BD
        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': null
                },

                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },

                {
                    'name': 'imagen',
                    'value': picture
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);




        } else {


            //crear usuario
            sqlParams = [{
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                },
                {
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },

                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 1
                },

                {
                    'name': 'imagen',
                    'value': picture
                }
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);


        }
        const token = await generateJWT(usuario.idUsuario);
        res.status(201).json({
            status: true,
            message: 'Acesso correcto',
            data: token
        });


    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Token de google no es correcto',
            data: null
        });
    }
}

const loginToken = async(req, res = response) => {
    const token = req.body.token;


    const id = await idToken(token);
    const tokenNew = await generateJWT(id);
    res.status(201).json({
        status: true,
        message: 'Acesso Correcto',
        data: tokenNew
    });
}

const resetPassword = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    let sqlParams = null;

    sqlParams = [{
        'name': 'email',
        'value': email
    }];
    try {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);

        usuario = await querySingle('stp_usuarios_login', sqlParams);



        sqlParams = [{
                'name': 'idUsuario',
                'value': usuario.idUsuario
            },
            {
                'name': 'nombre',
                'value': usuario.nombre
            },
            {
                'name': 'email',
                'value': usuario.email
            },
            {
                'name': 'password',
                'value': newPassword
            },

            {
                'name': 'google',
                'value': usuario.google
            },
            {
                'name': 'facebook',
                'value': usuario.facebook
            },
            {
                'name': 'nativo',
                'value': usuario.nativo
            },

            {
                'name': 'imagen',
                'value': usuario.imagen
            }
        ];
        usuario = await querySingle('stp_usuarios_update', sqlParams);

        res.status(201).json({
            status: true,
            message: 'Password Actulizada',
            data: usuario


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al actualizar usuario',
            data: null

        });

    }

}

module.exports = {
    login,
    googleSignIn,
    loginToken,
    resetPassword
}