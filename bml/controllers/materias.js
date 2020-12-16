const { response } = require('express');

const bcrypt = require('bcryptjs');
const { querySingle, query, queryNoParams, execute } = require('../../dal/data-access');

///// obtener alumnos
const getMaterias = async(req, res = response) => {
        let usuarios = null;

        try {

            usuarios = await queryNoParams('stp_materias_getall');

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
    ///obtener alumno id
const getMateria = async(req, res = response) => {
        const { id } = req.params;
        let usuario = null;
        let sqlParams = null
        try {
            sqlParams = [{
                    'name': 'idMateria',
                    'value': id
                }

            ];
            usuario = await querySingle('stp_materias_getbyid', sqlParams);

            res.status(201).json({
                status: true,
                message: 'Consulta Exitosa',
                data: usuario


            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Error al consultar Materias',
                data: null

            });

        }
    }
    //agregar alumno
const addMateria = async(req, res = response) => {
    const { nombre, horas, horasP, horasT, creditos } = req.body;
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
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasP',
                'value': horasP
            },

            {
                'name': 'horasT',
                'value': horasT
            },
            {
                'name': 'creditos',
                'value': creditos
            }
        ];
        usuario = await execute('stp_materias_add', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Materia Creado',

        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Materia No agregado',

        });

    }
}
const updateMateria = async(req, res = response) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasP, horasT, creditos } = req.body;
    let fila = null;
    let sqlParams = null


    try {
        //comprobar si existe el correo


        //agregar el usuario

        sqlParams = [{
                'name': 'idMateria',
                'value': idMateria
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasP',
                'value': horasP
            },

            {
                'name': 'horasT',
                'value': horasT
            },
            {
                'name': 'creditos',
                'value': creditos
            }
        ];
        fila = await execute('stp_materias_update', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos Actualizados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al consultar Materias',
            data: null

        });

    }
}
const deleteMateria = async(req, res = response) => {
    const idMateria = req.params.id;
    let fila = null;
    let sqlParams = null

    try {
        sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];
        fila = await execute('stp_materias_delete', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos borrados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al borrar Materia',
            data: null

        });

    }

}


module.exports = {
    getMaterias,
    addMateria,
    updateMateria,
    deleteMateria,
    getMateria
}