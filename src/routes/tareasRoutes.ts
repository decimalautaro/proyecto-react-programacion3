import express, {Request, Response} from 'express';

import {Tarea} from '../models/Tareas';
const router = express.Router();


let tareas: Tarea[] = [
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
            message: 'el archivo no existe'

        })
    }

    //creacion de id
    nuevaTarea.id = tareas[tareas.length-1].id+1;

    //agregar al array tareas
    tareas.push(nuevaTarea);

    //devolvemos el generado
    res.status(201).send(nuevaTarea);

});


//PUT
router.put('/:id',(req: Request, res: Response)=>{
    if(!req.params?.id){
        res.send(400).send({message: 'se debe ingresar el id de la tarea'})
    }


    const tarea= tareas.find (t => t.id === parseInt(req.params.id));
    if (!tarea){
        res.send(404).send({message: `no se encontro la tarea con id= ${req.params.id}`})
    }
    const tareaActualizar = req.body as Tarea;

    if (!tareaActualizar?. nombre || !tarea){
        res.status(400).send({
            message: 'El nombre o id no existe'
        })
    }
    tareas = tareas.map(t => t.id === parseInt(req.params.id)? tareaActualizar : t);
    res.send(tareaActualizar);  
});



//GET by ID
router.get('/:id',(req: Request, res: Response)=>{
    if(!req.params?.id){
        res.send(400).send({message: 'se debe ingresar el id de la tarea'})
    }

    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea){
        res.send(404).send({message: `no se encontro la tarea con id= ${req.params.id}`})
    }
    res.send(tarea);
})



//DELETE
router.delete('/:id', (req:Request , res: Response)=>{
    if(!req.params?.id){
        res.send(400).send({message: 'se debe ingresar el id de la tarea'})
    }
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) {
        res.send(404).send({message: `no se la tarea con id= ${req.params.id}`})
    }
    tareas = tareas.filter (t => t.id !== parseInt(req.params.id));
    res.send(tarea);
})


export default router;