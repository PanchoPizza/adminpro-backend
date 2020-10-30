//Ruta api/materias
const Router = require('express');
const conString = require('../database/config');
const sql = require('mssql');

const router = Router();
router.get('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .execute('stp_materias_getall');
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        res.json(err);
    });
});
//get by id
router.get('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.Int, req.params.id)
            .execute('stp_materias_getbyid');
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => {
        res.json(err);
    });
});

//add
router.post('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', req.body.nombre)
            .input('horas', req.body.horas)
            .input('horasP', req.body.horasP)
            .input('horasT', req.body.horasT)
            .input('creditos', req.body.creditos)
            .execute('stp_materias_add');
    }).then(result => {
        res.status(201).json({
            status: "OK",
            msg: "Materia agregada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

//put
router.put('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.Int, req.params.id)
            .input('nombre', req.body.nombre)
            .input('horas', req.body.horas)
            .input('horasP', req.body.horasP)
            .input('horasT', req.body.horasT)
            .input('creditos', req.body.creditos)
            .execute('stp_materias_update');
    }).then(result => {
        res.status(200).json({
            status: "OK",
            msg: "Materia actualizada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});
//delete
router.delete('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idMateria', sql.Int, req.params.id)
            .execute('stp_materias_delete');
    }).then(result => {
        res.status(200).json({
            status: "OK",
            msg: "Materia eliminada correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;