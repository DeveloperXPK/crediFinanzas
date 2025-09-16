import { supabase } from "../../../../config/supabaseCliente";

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