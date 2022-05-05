import { Schema, model } from 'mongoose';

export interface IMateria {
    _id?: string;
    nombreMateria: string;
    descripcion :  ["anual", "semestral"];
    anio: number;
}

const tareaSchema = new Schema<IMateria>({
    nombreMateria: { type: String, required: true },
    descripcion: {type: [], required: true},
    anio: {type: Number, required: true}
});

export const Materia = model<IMateria>('materias', tareaSchema);