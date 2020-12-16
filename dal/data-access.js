const { response } = require('express');
const { param } = require('express-validator');
const sql = require('mssql');
const conString = require('./config');

//query Selects
const query = async(stpName, sqlParams) => {
        sql.on('error', err => {
            console.log(err);
            res.status(401).json({
                status: false,
                message: 'Error en la configuracion de sql',
                error: err
            });
        });
        const pool = await sql.connect(conString);
        const req = await pool.request();

        if (typeof sqlParams !== 'undefined') {
            sqlParams.forEach((param) => {
                req.input(param.name, param.value);
            });
        }
        const resp = await req.execute(stpName);
        return resp.recordset;
    }
    //Single
const querySingle = async(stpName, sqlParams) => {
        sql.on('error', err => {
            console.log(err);
            res.status(401).json({
                status: false,
                message: 'Error en la configuracion de sql',
                error: err
            });
        });
        const pool = await sql.connect(conString);
        const req = await pool.request();
        if (typeof sqlParams !== 'undefined') {
            sqlParams.forEach((param) => {
                req.input(param.name, param.value);
            });
        }
        const resp = await req.execute(stpName);
        return resp.recordset[0];
    }
    //execute para los otros 3

const execute = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: 'Error en la configuracion de sql',
            error: err
        });
    });
    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}

const queryNoParams = async(stpName) => {
    sql.on('error', err => {
        console.log(err);
        res.status(401).json({
            status: false,
            message: 'Error en la configuracion de sql',
            error: err
        });
    });
    const pool = await sql.connect(conString);
    const req = await pool.request();

    const resp = await req.execute(stpName);
    return resp.recordset;
}

module.exports = {
    query,
    querySingle,
    execute,
    queryNoParams
}