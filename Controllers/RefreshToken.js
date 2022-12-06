import jwt from 'jsonwebtoken';
import pool from '../Config/db.js';

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await pool.query("SELECT userid, username, email FROM users WHERE refreshtoken = $1", [refreshToken]);
        if (!user.rows[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userID = user.rows[0].userid;
            const name = user.rows[0].username;
            const email = user.rows[0].email;
            const accessToken = jwt.sign({ userID, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}
