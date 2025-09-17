import { DatosCredito, ResultadoRegla, InterfazCreditoRegla } from "../interfaces/InterfazCredito";

export class BalanzaRegla implements InterfazCreditoRegla {

    evaluar(data: DatosCredito): ResultadoRegla {
        // Hallamos la diferencia entre ingresos y egresos
        const balanza = data.ingresos - data.egresos;
        if (balanza >= 1) {
            return { aprobado: true, datos: { balanza } };
        }

        return { aprobado: false, motivo: "Tus egresos son mayores a tus ingresos." };
    }

}