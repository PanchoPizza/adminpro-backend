//Ruta api/docentes
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
            .execute('stp_docentes_getall');
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
            .input('idDocente', sql.Int, req.params.id)
            .execute('stp_docentes_getbyid');
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
            .input('edad', req.body.edad)
            .input('titulo', req.body.titulo)
            .input('tipo', req.body.tipo)
            .execute('stp_docente_add');
    }).then(result => {
        res.status(201).json({
            status: "OK",
            msg: "Docente agregado correctamente"
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
            .input('idDocente', sql.Int, req.params.id)
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('titulo', req.body.titulo)
            .input('tipo', req.body.tipo)
            .execute('stp_docentes_update');
    }).then(result => {
        res.status(200).json({
            status: "OK",
            msg: "Docente actualizado correctamente"
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
            .input('idDocente', sql.Int, req.params.id)
            .execute('stp_docente_delete');
    }).then(result => {
        res.status(200).json({
            status: "OK",
            msg: "Docente eliminado correctamente"
        });
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;