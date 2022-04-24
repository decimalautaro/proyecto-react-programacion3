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

router.post('/',(req: Request, res: Response)=>{
    const nuevaTarea = req.body as Tarea;
    if (!nuevaTarea?. nombre){
        res.status(400).send({
            message: 'el archivo no existe';

        })
    }

    //creacion de id
    nuevaTarea.id = tareas[tareas.length-1].id+1;

    //agregar al array tareas
    tareas.push(nuevaTarea);

    //devolvemos el generado
    res.status(201).send(nuevaTarea);

})


//PUT

//GET by ID

//DELETE



export default router;