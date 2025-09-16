import { supabase } from "../../../../config/supabaseCliente";
import { InterfazRiesgo } from "../../domain/interfaces/InterfazRiesgo";

export class SupabaseRiesgoRepositorio implements InterfazRiesgo{
    async obtenerPuntajeDeUsuario(usuario: string): Promise<number | null> {
        const { data, error } = await supabase
        .from('central_de_riesgo')
        .select('puntaje')
        .eq('usuario', usuario)
        .single();

        if (error) {
            throw new Error("Error al obtener puntaje");
        }

        return data ? data.puntajeRiesgo : null;
    }
}