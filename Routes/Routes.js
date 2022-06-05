import express from 'express';
import { AddPublication, GetAllPublications, EditPublication, GetLastPublications, GetPublicationById } from "../Controllers/Publications.js";
import {Login, Logout, Register} from '../Controllers/Authentication.js';
import { verifyToken } from '../Controllers/VerifyToken.js';
import { refreshToken } from '../Controllers/RefreshToken.js';


const router = express.Router();

router.get('/publicacion', GetAllPublications);
router.get('/PublicationById/:id', verifyToken, GetPublicationById);
router.post('/AddPublicacion', AddPublication);
router.post('/EditPublicacion', verifyToken, EditPublication)
router.get('/novedades', GetLastPublications);
router.get('/token', refreshToken)
router.post('/login', Login)
router.post('/register', Register)
router.delete('/logout', Logout)

export default router;