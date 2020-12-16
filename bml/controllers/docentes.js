const { response } = require('express');

const bcrypt = require('bcryptjs');
const { querySingle, query, queryNoParams, execute } = require('../../dal/data-access');

///// obtener alumnos
const getDocentes = async(req, res = response) => {
        let usuarios = null;

        try {

            usuarios = await queryNoParams('stp_docentes_getall');

            res.status(201).json({
                status: true,
                message: 'Consulta Exitosa',
                data: usuarios

            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Error al consultar docentes',
                data: null

            });

        }
    }
    ///obtener alumno id
const getDocente = async(req, res = response) => {
        const { id } = req.params;
        let usuario = null;
        let sqlParams = null
        try {
            sqlParams = [{
                    'name': 'idDocente',
                    'value': id
                }

            ];
            usuario = await querySingle('stp_docentes_getbyid', sqlParams);

            res.status(201).json({
                status: true,
                message: 'Consulta Exitosa',
                data: usuario


            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Error al consultar doncente',
                data: null

            });

        }
    }
    //agregar alumno
const addDocente = async(req, res = response) => {
    const { nombre, edad, titulo, tipo } = req.body;
    let usuario = null;
    let sqlParams = null
    try {
        //comprobar si existe el correo


        //agregar el usuario

        sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },

            {
                'name': 'tipo',
                'value': tipo
            }
        ];
        usuario = await execute('stp_docente_add', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Docente Creado',

        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Docente No agregado',

        });

    }
}
const updateDocente = async(req, res = response) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;
    let fila = null;
    let sqlParams = null


    try {
        //comprobar si existe el correo


        //agregar el usuario

        sqlParams = [{
                'name': 'idDocente',
                'value': idDocente
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },

            {
                'name': 'tipo',
                'value': tipo
            }
        ];
        fila = await execute('stp_docentes_update', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos Actualizados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al actualizar Docente',
            data: null

        });

    }
}
const deleteDocente = async(req, res = response) => {
    const idDocente = req.params.id;
    let fila = null;
    let sqlParams = null

    try {
        sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];
        fila = await execute('stp_docente_delete', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos Actualizados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al consultar usuarios',
            data: null

        });

    }

}


module.exports = {
    getDocentes,
    addDocente,
    updateDocente,
    deleteDocente,
    getDocente
}