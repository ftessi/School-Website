import express from "express";
import cors from "cors";
import pool from "../Config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const app = express();

app.use(cors);

//Iniciar sesión



//New Login

//TESTING USER: username:"2nd User", password:"pass2test"

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT userid, username, password, email, privileges FROM users WHERE email = $1", [email]);
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (!match) return res.status(400).json({ msg: "Email/Password combination not found" })
        const userID = user.rows[0].userid;
        const name = user.rows[0].username;
        // a partir de aca no anda
        const accessToken = jwt.sign({ userID, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userID, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        //Hay que poner INSERT query para guardar el refresh token en la db
        await pool.query("UPDATE users SET refreshtoken = $1 WHERE userid = $2 ", [refreshToken, userID]);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken })
    } catch (error) {
        res.status(404).json({ msg: "Email/Password combination not found" });
    }
}

//Cerrar sesión

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)
    if(!refreshToken) return res.sendStatus(204);
    const user = await pool.query("SELECT userid FROM users WHERE refreshtoken = $1", [refreshToken]);
    if(!user.rows[0]) return res.sendStatus(204);
    const userId = user.rows[0].userid;
    await pool.query("UPDATE users SET refreshtoken = $1 WHERE userid = $2", [null, userId]);
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

//Crear usuario

export const Register = async (req, res) => {
    const { username, password, confpassword, privileges, email } = req.body;
    if (password !== confpassword) return res.status(400).json({ msg: "Password and Confirm Password don't match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await pool.query("INSERT INTO users (username, password, privileges, email) VALUES($1, $2, $3, $4) RETURNING *", [username, hashPassword, privileges, email]);
        res.json({ msg: "Registration successful!" });
    } catch (error) {
        res.json({ msg: "username or email already registered, please user other or delete the corresponding former user" });
    }
}


//Eliminar usuario


//Editar usuario


//Restablecer contraseña
