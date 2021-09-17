import express from 'express';
import "reflect-metadata";
import { router } from './routes';
import cors from "cors";


import "./database"


const app = express();

app.use(express.json());
app.use(cors());


app.use("/v1", router);

app.listen(3333, () => console.log("Server is running"));