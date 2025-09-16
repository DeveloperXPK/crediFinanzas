import { DatosCredito, ResultadoRegla, InterfazCreditoRegla } from "../interfaces/InterfazCredito";

// Exportamos la clase PlazoRegla que implementa la interfaz InterfazCreditoRegla
// para validar el plazo de un crédito
export class PlazoRegla implements InterfazCreditoRegla {

    evaluar(data: DatosCredito): ResultadoRegla {
        // Sentencia de plazo en meses (1 - 72)
        if (data.plazoSolicitado >= 1 && data.plazoSolicitado <= 72) {
            return { aprobado: true };
        }

        return { aprobado: false, motivo: "El plazo solicitado debe estar entre 1 y 72 meses." };
    }

}