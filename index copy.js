const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const session = require('express-session');


//middleware
app.use(cors({
    origin: ["http://localhost:3000"]
}));
app.use(express.json());


// Cookies

app.use(session({
    key: 'SessionId',
    secret: 'secret123121zg3', cookie: { expires: 60 * 60 * 2000, }
}));



//Routes//

//Create a Publication

app.post("/publicacion", async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const nuevaPublicacion = await pool.query("INSERT INTO publicacion (titulo, descripcion) VALUES($1, $2) RETURNING *", [titulo, descripcion]);
        res.json(nuevaPublicacion.rows[0]);
    }

    catch (err) {
        console.error(err.message);
    }
});

//Llamar las publicaciones

app.get("/publicacion", async(req, res) => {
    try {
        const allPublicacion = await pool.query("SELECT * FROM publicacion");
        res.json(allPublicacion.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

//Llamar una publicacion específica

app.get("/publicacion/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const publicacion = await pool.query("SELECT * FROM publicacion WHERE publicacion_id = $1", [id]);

        res.json(publicacion.rows[0]);

    } catch (error) {
        console.error(err.message);
    }
});

//Actualizar publicacion

app.put("/publicacion/:id", async(req, res) => {
    try {
        const {id} =req.params;
        const {descripcion} = req.body;
        const updatePublicacion = await pool.query("UPDATE publicacion SET descripcion = $1 WHERE publicacion_id = $2", [descripcion, id]);

        res.json("La descripcion fue actualizada!")   
    } catch (error) {
        console.error(err.message);
    }
});

//Eliminar publicacion

app.delete("/publicacion/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deletePubli = await pool.query("DELETE FROM publicacion WHERE publicacion_id = $1", [id]);
        res.json("Publicacion eliminada");
    } catch (error) {
        console.log(err.message);        
    }
});

//Llamar primeras 4 Noticias

app.get("/novedades", async(req, res) => {
    try {
        const allPublicacion = await pool.query("SELECT * FROM publicacion LIMIT 5");
        res.json(allPublicacion.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

//Iniciar sesión
app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;
        const userquery = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);

        if (userquery.rows > [] ) {
            res.json("Login success!")
            res.send(session.cookie)
        }
        else {
            res.json("Username/Password combination incorrect")
        }


    }
    catch (err) {
        res.json("There was an error while processing your credentials, please try again.")
    }
});


//Cerrar sesión


//Crear usuario


//Eliminar usuario


//Editar usuario


//Restablecer contraseña




app.listen(5000, () => {
    console.log("server has started on port 5000")
}); 