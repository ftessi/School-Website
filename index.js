import router from "./Routes/Routes.js";
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import 'dotenv/config';



const app = express();



//middleware
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3001","http://192.168.56.1:3001"]
}));
app.use(express.json()); 
app.use(cookieParser());
app.use(router);






app.listen(5000, () => {
    console.log("server has started on port 5000")
}); 