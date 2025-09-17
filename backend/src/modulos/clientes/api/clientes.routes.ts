import { Router, Request, Response } from "express";
import { SupabaseCliente } from "../infraestructura/SupabaseCliente";
import { CrearClienteServicio } from "../application/CrearClienteServicio";

const router = Router();

const clienteRepositorio = new SupabaseCliente();
const crearClienteServicio = new CrearClienteServicio(clienteRepositorio); // Embebemos el repositorio en el servicio

router.post('/usuarios/registro', async (req: Request, res: Response) => {
    try {
        const { nombre, tipoDocumento, numeroDocumento } = req.body;

        const nuevoCliente = await crearClienteServicio.ejecutarCreacion({
            nombre,
            tipoDocumento,
            numeroDocumento
        }); 

        // Si se crea con exito enviamos el Id y nombre del cliente creado
        res.status(201).json({
            id: nuevoCliente.id,
            nombre: nuevoCliente.nombre
        });


    } catch (error: any) {
        if (error.message.includes("El usuario ya existe")) {
            res.status(409).json({ error: error.message });
        }
    }
})

export default router;