import { supabase } from "../../../../config/supabaseCliente";
import { DatosCredito } from "../../domain/rules/InterfazCredito";
import { InterfazAplicacion } from "./InterfazAplicacion";

export class SupabaseRiesgoRepositorio {
    async obtenerPuntajePorDocumento(usuarioId: string) {
        console.log("Obteniendo puntaje por documento:", usuarioId);

        const { data, error } = await supabase
        .from('central_de_riesgo')
        .select('puntaje')
        .eq('cliente__id', usuarioId)
        .single();

        if (error) {
            console.error("Error al obtener puntaje:", error);
            throw new Error("Error al obtener puntaje");
        }

        return data ? data.puntaje : null;
    }
}

// Logica de la aplicacion 
// Se realiza el guardado de la solicitud sin importar el resultado
export class SupabaseAplicacion implements InterfazAplicacion {
    async guardar(solicitud: DatosCredito, resultado: string, motivo: string): Promise<void> {
        const { error } = await supabase
        .from('solicitudes_creditos')
        .insert({
            usuario__id: solicitud.usuario,
            monto_solicitado: solicitud.montoSolicitado,
            plazo_solicitado: solicitud.plazoSolicitado,
            ingresos: solicitud.ingresos,
            egresos: solicitud.egresos,
            resultado: resultado,
            motivo: motivo
        });

        if (error) {
            throw new Error("Error al guardar la solicitud: " + error.message);
        }
    }
}