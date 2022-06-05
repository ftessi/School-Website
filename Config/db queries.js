import pool from "./db.js";
import format from "pg-format";

export const selectAllFrom = function(database) {
    const sql = format("SELECT * FROM %I", database);

    return new Promise(function(resolve, reject) {
        pool.query(sql, [], function(err, data) {
            if (err) reject(err);
            resolve(data.rows);
        });
    })
}

export const filteredQuery = function(columns, database, filter, setFilter) {
    const sql = format("SELECT %I FROM %I WHERE %I = %L", columns, database, filter, setFilter);

    return new Promise(function(resolve, reject) {
        pool.query(sql, [], function(err, data) {
            if (err) reject(err);
            resolve(data.rows[0]);
        });
    })
}



//FIJARSE DE VERIFICAR QUE PASA CUANDO NO DEVUELVE NADA LA BASE DE DATOS,
// Ej: Cuando buscas la publicacion_id = 32

//Muy lindo todo pero mepa me voy a quedar haciendolo todo a manopla porque hacerlas dinamicas termina siendo mas paja que todo lo demas
