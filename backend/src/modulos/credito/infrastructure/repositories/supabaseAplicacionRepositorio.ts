import { supabase } from "../../../../config/supabaseCliente";
import { DatosCredito } from "../../domain/interfaces/InterfazCredito";
import { InterfazAplicacion } from "../../domain/interfaces/InterfazAplicacion";

// Logica de la aplicacion 
// Se realiza el guardado de la solicitud sin importar el resultado
export class SupabaseAplicacionRepositorio implements InterfazAplicacion {
    async guardar(solicitud: DatosCredito, resultado: string, motivo: string): Promise<void> {
        const { error } = await supabase
        .from('solicitudes_credito')
        .insert({
            tipo_documento: solicitud.tipoDocumento,
            numero_documento: solicitud.numeroDocumento,
            monto_solicitado: solicitud.montoSolicitado,
            plazo_solicitado: solicitud.plazoSolicitado,
            ingresos: solicitud.ingresos,
            egresos: solicitud.egresos,
            resultado: resultado,
            motivo: motivo
        });

        console.log("Solicitud guardada en la base de datos");

        if (error) {
            throw new Error("Error al guardar la solicitud: " + error.message);
        }
    }
}