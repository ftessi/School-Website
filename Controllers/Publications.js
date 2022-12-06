import express from "express";
import cors from "cors";
import { filteredQuery, selectAllFrom } from "../Config/db queries.js";
import pool from "../Config/db.js";
const app = express();

//middleware
app.use(cors({
    origin: ["http://localhost:3000"]
}));



//Llamar las publicaciones

export const GetAllPublications =  async(req, res) => {
    try {
        const query = await selectAllFrom('publicacion');
        res.json(query);
    }
    catch (err) {
        console.error(err.message);
    }
};

//Llamar una publicacion específica

export const GetPublicationById =  async(req, res) => {
    try {
        const { id } = req.params;
        const query = await filteredQuery(['titulo','descripcion'], 'publicacion', 'publicacion_id', id);
        res.json(query);

    } catch (error) {
        console.error(error);
    }
};

//A PARTIR DE ACÁ HAY QUE EDITAR Y ARMAR LAS NUEVAS QUERIES

//Create a Publication

export const AddPublication =  async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        if (!titulo) return res.json('Falta titulo')
        const nuevaPublicacion = await pool.query("INSERT INTO publicacion (titulo, descripcion) VALUES($1, $2) RETURNING *", [titulo, descripcion]);
        res.json(nuevaPublicacion.rows[0]);
    }

    catch (err) {
        console.error(err.message);
    }
};

//Actualizar publicacion

export const EditPublication =  async(req, res) => {
    try {
        const {id} =req.body;
        const {descripcion} = req.body;
        const updatePublicacion = await pool.query("UPDATE publicacion SET descripcion = $1 WHERE publicacion_id = $2", [descripcion, id]);

        res.json("La descripcion fue actualizada!")   
    } catch (error) {
        console.error(err.message);
    }
};

//Eliminar publicacion

export const DelPublication = app.delete("/publicacion/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deletePubli = await pool.query("DELETE FROM publicacion WHERE publicacion_id = $1", [id]);
        res.json("Publicacion eliminada");
    } catch (error) {
        console.log(err.message);        
    }
});

//Llamar primeras 4 Noticias

export const GetLastPublications = async(req, res) => {
    try {
        const allPublicacion = await pool.query("SELECT * FROM publicacion LIMIT 4");
        res.json(allPublicacion.rows);
    }
    catch (err) {
        console.error(err.message);
    }
};