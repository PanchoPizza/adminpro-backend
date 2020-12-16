const { response } = require('express');

const bcrypt = require('bcryptjs');
const { querySingle, query, queryNoParams, execute } = require('../../dal/data-access');

///// obtener alumnos
const getAlumnos = async(req, res = response) => {
        let usuarios = null;

        try {

            usuarios = await queryNoParams('stp_alumnos_getall');

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
const getAlumno = async(req, res = response) => {
        const { id } = req.params;
        let usuario = null;
        let sqlParams = null
        try {
            sqlParams = [{
                    'name': 'idAlumno',
                    'value': id
                }

            ];
            usuario = await querySingle('stp_alumnos_getbyid', sqlParams);

            res.status(201).json({
                status: true,
                message: 'Consulta Exitosa',
                data: usuario


            });
        } catch (error) {
            res.status(401).json({
                status: false,
                message: 'Error al consultar Alumnos',
                data: null

            });

        }
    }
    //agregar alumno
const addAlumno = async(req, res = response) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
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
                'name': 'sexo',
                'value': sexo
            },

            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];
        usuario = await execute('stp_alumnos_add', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Alumno Creado',

        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Alumno No agregado',

        });

    }
}
const updateAlumno = async(req, res = response) => {
    const idAlumno = req.params.id;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    let fila = null;
    let sqlParams = null


    try {
        //comprobar si existe el correo


        //agregar el usuario

        sqlParams = [{
                'name': 'idAlumno',
                'value': idAlumno
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
                'name': 'sexo',
                'value': sexo
            },

            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];
        fila = await execute('stp_alumnos_update', sqlParams);
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
const deleteAlumno = async(req, res = response) => {
    const idAlumno = req.params.id;
    let fila = null;
    let sqlParams = null

    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];
        fila = await execute('stp_alumnos_delete', sqlParams);
        res.status(201).json({
            status: true,
            message: 'Datos borrados',
            data: fila


        });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Error al borrar alumnos',
            data: null

        });

    }

}


module.exports = {
    getAlumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumno
}