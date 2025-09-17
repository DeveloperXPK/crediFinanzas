import { Router, Request, Response } from "express";
import { SupabaseAplicacionRepositorio } from "../infrastructure/repositories/supabaseAplicacionRepositorio";
import { SupabaseRiesgoRepositorio } from "../infrastructure/repositories/supabaseRiesgoRepositorio";
import { AprobacionCredito } from "../application/AprobacionCredito";

const router = Router();

const aplicacionRepo = new SupabaseAplicacionRepositorio();
const riesgoRepo = new SupabaseRiesgoRepositorio();

const aprobacionCredito = new AprobacionCredito(aplicacionRepo, riesgoRepo);

router.post('/solicitud/evaluacion', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const resultadoSolicitud = await aprobacionCredito.ejecutarEvaluacion(req.body);
        res.json(resultadoSolicitud);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})

export default router;