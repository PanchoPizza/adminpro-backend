const { response } = require('express');

const bcrypt = require('bcryptjs');
const { querySingle, query, queryNoParams, execute } = require('../../dal/data-access');




///consultar usuarios 
const getUsuarios = async(req, res = response) => {
    let usuarios = null;

    try {

        usuarios = await queryNoParams('stp_usuarios_getall');

        res.status(201).json({
            status: true,
            message: 'Consulta Exitosa',
            data: usuarios

        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al consultar usuarios',
            data: null

        });

    }
}

///////getUsuario
const getUsuario = async(req, res = response) => {
        const { id } = req.params;
        let usuario = null;
        let sqlParams = null
        try {
            sqlParams = [{
                    'name': 'idUsuario',
                    'value': id
                }

            ];
            usuario = await querySingle('stp_usuarios_getbyid', sqlParams);

            res.status(201).json({
                status: true,
                message: 'Consulta Exitosa',
                data: usuario


            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Error al consultar usuarios',
                data: null

            });

        }
    }
    ////agregar usuario 
const addUsuario = async(req, res = response) => {
        const { nombre, email, password } = req.body;
        let usuario = null;
        let sqlParams = null
        try {
            //comprobar si existe el correo

            const salt = bcrypt.genSaltSync();
            const newPassword = bcrypt.hashSync(password, salt);

            //agregar el usuario

            sqlParams = [{
                    'name': 'nombre',
                    'value': nombre
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': newPassword
                },

                {
                    'name': 'google',
                    'value': 0
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
                    'value': null
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);
            res.status(201).json({
                status: true,
                message: 'Usuario Creado',

            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Usuario No agregado',

            });

        }
    }
    //actualizarUsuario
const updateUsuario = async(req, res = response) => {
    let fila = null;
    let sqlParams = null
    try {
        const idUsuario = req.params.id;
        const { nombre, email, password, google, facebook, nativo, picture } = req.body;

        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        sqlParams = [{
                'name': 'idUsuario',
                'value': idUsuario
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            },

            {
                'name': 'google',
                'value': google
            },
            {
                'name': 'facebook',
                'value': facebook
            },
            {
                'name': 'nativo',
                'value': nativo
            },

            {
                'name': 'imagen',
                'value': picture
            }
        ];
        fila = await execute('stp_usuarios_update', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos Actualizados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al actualizar usuarios',
            data: null

        });

    }



}
const deleteUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;
    let fila = null;
    let sqlParams = null

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUsuario
        }];
        fila = await execute('stp_usuarios_delete', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos Borrados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al Borrar',
            data: null

        });

    }

}

module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
}