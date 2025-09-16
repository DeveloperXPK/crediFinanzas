import { DatosCredito, ResultadoRegla, InterfazCreditoRegla } from "./InterfazCredito";

export class BalanzaRegla implements InterfazCreditoRegla {

    evaluar(data: DatosCredito): ResultadoRegla {
        // Hallamos la diferencia entre ingresos y egresos
        const balanza = data.ingresos - data.egresos;
        if (balanza >= 1) {
            return { aprobado: true, datos: { balanza } };
        }

        return { aprobado: false, motivo: "La diferencia entre ingresos y egresos debe ser al menos 1." };
    }

}