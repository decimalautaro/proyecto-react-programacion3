import { IAlumno, Alumno } from './../models/Alumno';
import express, {Request, Response} from 'express';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    if(req.query.search) {
        const criterioRegEx = new RegExp(req.query.search as string, 'i');
        const criterioDeBusqueda = [
            {nombre: { $regex: criterioRegEx }}, 
            {descripcion: { $regex: criterioRegEx }}
        ];

        const alumnos = await Alumno.find({ '$or': criterioDeBusqueda });
        return res.send(alumnos);
    }

    const alumnos = await Alumno.find();
    res.send(alumnos);
});

router.get("/:id", async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del alumno"})
    }
    const alumno = await Alumno.findById(req.params.id);
    if(!alumno) {
        return res.send(404).send({message: `No se el alumno con id=${req.params.id}`})
    }
    res.send(alumno);
});

router.post("/", async (req: Request, res: Response) => {

    const nuevoAlumno = req.body as IAlumno;
    
    if(!nuevoAlumno?.nombre) {
        return res.status(400).send({
            message: "El nombre no existe"
        })
    }

    const alumno = new Alumno(nuevoAlumno);
    await alumno.save();

    res.status(201).send(alumno);
})

router.put('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del alumno"})
    }
    const alumno = await Alumno.findById(req.params.id);
    if(!alumno) {
        return res.send(404).send({message: `No se el alumno con id=${req.params.id}`});
    }

    const alumnoActualizar = req.body as IAlumno;
    if(!alumnoActualizar?.nombre) {
        return res.status(400).send({
            message: "El nombre o id no existe"
        })
    }
    if(alumnoActualizar?._id !== alumno.id) {
        return res.status(400).send({
            message: "El id no coincide"
        });
    }
    
    await Alumno.updateOne({_id: alumno.id }, alumnoActualizar);
    res.send(alumnoActualizar);
});

router.delete('/:id', async (req: Request, res: Response) => {
    if(!req.params?.id) {
        return res.send(400).send({message: "Se deber ingresar el id del alumno"})
    }
    const alumno = await Alumno.findById(req.params.id);
    if(!alumno) {
        return res.send(404).send({message: `No se el alumno con id=${req.params.id}`})
    }

    await Alumno.deleteOne({_id: alumno._id})
    res.send(alumno);
});

export default router;