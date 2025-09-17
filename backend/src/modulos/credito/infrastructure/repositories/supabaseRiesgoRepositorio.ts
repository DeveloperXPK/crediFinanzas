import { supabase } from "../../../../config/supabaseCliente";
import { InterfazRiesgo } from "../../domain/interfaces/InterfazRiesgo";

export class SupabaseRiesgoRepositorio implements InterfazRiesgo{
    async obtenerPuntajeDeUsuario(tipo_documento: string, numero_documento: string): Promise<number | null> {
        // console.log("Obteniendo puntaje de usuario...");
        // console.log("Tipo de documento:", tipo_documento);
        // console.log("Número de documento:", numero_documento);
        const { data, error } = await supabase
          .from("central_riesgo")
          .select("puntaje")
          .match({ tipo_documento, numero_documento })
          .single();

          // console.log("Puntaje obtenido de la base de datos");

        if (error) {
            throw new Error("Error al obtener puntaje");
        }

        return data ? data.puntaje : null;
    }
}