import { Schema, model } from 'mongoose';

export interface IAlumno {
    _id?: string;
    nombre: string;
    apellido: string;
    domicilio: string;
    dni: number;
    carrera: string;
}

const alumnoSchema = new Schema<IAlumno>({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    domicilio: { type: String, required: true },
    dni: { type: Number, required: true },
    carrera: { type: String , required: true },
});

export const Alumno = model<IAlumno>('alumnos', alumnoSchema);