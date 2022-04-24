import express, {Request, Response} from 'express';
import { request } from 'http';
import {Tarea} from '../models/Tareas';
const router = express.Router();


const tareas: Tarea[] = [
    {nombre: 'nombre1', id:1},
    {nombre: 'nombre2', id:2},
    {nombre: 'nombre3', id:3},
];

router.get('/',(req: Request, res: Response )=>{
    res.send(tareas);
})





export default router;