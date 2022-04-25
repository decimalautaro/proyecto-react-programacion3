import express from 'express';
import tareasRoutes from './routes/tareasRoutes';

const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.json());


server.use('/api/tareas',tareasRoutes);


server.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})