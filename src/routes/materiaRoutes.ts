import { IMateria, Materia } from './../models/Materia';
import express, {Request, Response} from 'express';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    if(req.query.search) {
        const criterioRegEx = new RegExp(req.query.search as string, 'i');
        const criterioDeBusqueda = [
            {nombre: { $regex: criterioRegEx }}, 
            {descripcion: { $regex: criterioRegEx }}
        ];

        const materias = await Materia.find({ '$or': criterioDeBusqueda });
        return res.send(materias);
    }

    const materias = await Materia.find();
    res.send(materias);
});

router.get("/:id", async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id de la materia"})
    }
    const materia = await Materia.findById(req.params.id);
    if(!materia) {
        return res.send(404).send({message: `No se la materia con id=${req.params.id}`})
    }
    res.send(materia);
});

router.post("/", async (req: Request, res: Response) => {

    const nuevaMateria = req.body as IMateria;
    
    if(!nuevaMateria?.nombreMateria) {
        return res.status(400).send({
            message: "El nombre no existe"
        })
    }

    const materia = new Materia(nuevaMateria);
    await materia.save();

    res.status(201).send(materia);
})

router.put('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id de la materia"})
    }
    const materia = await Materia.findById(req.params.id);
    if(!materia) {
        return res.send(404).send({message: `No se la materia con id=${req.params.id}`});
    }

    const materiaActualizar = req.body as IMateria;
    if(!materiaActualizar?.nombreMateria) {
        return res.status(400).send({
            message: "El nombre o id no existe"
        })
    }
    if(materiaActualizar?._id !== materia.id) {
        return res.status(400).send({
            message: "El id no coincide"
        });
    }
    
    await Materia.updateOne({_id: materia.id }, materiaActualizar);
    res.send(materiaActualizar);
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id de la materia"})
    }
    const materia = await Materia.findById(req.params.id);
    if(!materia) {
        return res.send(404).send({message: `No se la materia con id=${req.params.id}`})
    }

    await Materia.deleteOne({_id: materia._id})
    res.send(materia);
});

export default router;